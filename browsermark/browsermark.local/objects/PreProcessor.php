<?php

/**
 * Preprocessor
 *
 * When ever custom handler is not found, preprocessor will decide what is shown
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * Preprocessor class
 * @package Browsermark
 */
class PreProcessor
{
    /**
     * @public array Array of javascript files
     */
    public $jsFiles = array();
    /**
     * @public array Array of css files
     */
    public $cssFiles = array();
    /**
     * @public array Array of content files
     */
    public $contentFiles = array();
    /**
     * @public array Array of files
     */
    public $files = array();

    /**
     * Fetch files from path and from parent paths and place files under correct, local variables
     */
    public function __construct()
    {
        // Get javascript files
        $this->jsFiles = $this->_getFiles('{*.js,*.js.gz}');
        // Get CSS files
        $this->cssFiles = $this->_getFiles('*.css');
        // Get content files
        $this->contentFiles = $this->_getFiles('*.php');
        // Merge all files in one large array for checks
        $this->files = array_merge($this->contentFiles, $this->cssFiles, $this->jsFiles);
    }

    /**
     * Generate content. For custom handlers this method accept replacements array which can be used to force
     * this method to use another file that was found from the path, example:
     *
     * $aReplacements = array(
     *      "content.php" => '/path/to/another/content-file.php
     * );
     *
     * @param array $aReplacements Replacements array
     */
    public function generate($aReplacements = array())
    {
        $bFound = false;

        // Loop through replacements and replace content if necessary
        foreach ($aReplacements as $sKey => $sPath)
        {
            if (array_key_exists($sKey, $this->contentFiles))
            {
                $this->contentFiles[$sKey] = $sPath;
                // When replacing content files it means there is handler and not necessary any of files come from absolute directory. Mark content as found
                $bFound = true;
            }
        }

        // Ensure that at least something comes from right directory
        foreach ($this->files as $sName)
        {
            if (mb_stristr($sName, $GLOBALS['PATH']['fullname']))
            {
                $bFound = true;
                break;
            }
        }
        if (!$bFound)
        {
            // 404
            $this->jsFiles = $this->_getFiles('{*.js,*.js.gz}', '/404');
            $this->cssFiles = $this->_getFiles('*.css', '/404');
            $this->contentFiles = $this->_getFiles('*.php', '/404');
            header('HTTP/1.1 404 Not Found');
        }
        // require content files
        if (isset($this->contentFiles['params.php']))
        {
            require_once($GLOBALS['ROOT'] . '/pages' . $this->contentFiles['params.php']);
        }

        // Test interface can call only content, otherwise full content is shown
        if (isset($_REQUEST['content_only']))
        {
            require_once($GLOBALS['ROOT'] . '/pages' . $this->contentFiles['content.php']);
        }
        else
        {
            require_once($GLOBALS['ROOT'] . '/pages' . $this->contentFiles['header.php']);
            require_once($GLOBALS['ROOT'] . '/pages' . $this->contentFiles['content.php']);
            require_once($GLOBALS['ROOT'] . '/pages' . $this->contentFiles['footer.php']);
        }

        // Save method for output buffer handle to proceed css & js files before content display
        $GLOBALS['OB'][__CLASS__] = 'obHandle';
    }

    /**
     * Output buffer handle which allows PHP to modify content before printing it out
     *
     * @param $sContent All HTML content
     * @return mixed|string Modified HTML content
     */
    public function obHandle($sContent)
    {
        global $bNoPreprocessing;

        if ((isset($bNoPreprocessing)) && ($bNoPreprocessing == true))
        {
            return $sContent;
        }

        // Add before </head> required css files
        foreach ($this->cssFiles as $sHref)
        {
            // Debug?
            if ($GLOBALS['DEBUG'])
            {
                $sContent = str_replace('</head>', "\t<!-- " . __METHOD__ . ": File location {$GLOBALS['ROOT']}/pages{$sHref}\" -->\n\t</head>", $sContent);
            }
            $sContent = str_replace('</head>', "\t<link rel=\"stylesheet\" href=\"{$sHref}\" type=\"text/css\">\n\t</head>", $sContent);
        }
        // Add before </head> required js files
        //$sContent .= '<pre>' . var_export($this->jsFiles, true) . '</pre>';
        uasort($this->jsFiles, "uacmp");
        foreach ($this->jsFiles as $sKey => $sSrc)
        {
            // If test is started with "webgl=false", prevent webglmark.libs.js* loading, IE9 will crash because 32 bit process addresses runs out
            // so this way we can give this test for IE9 users too (and it do not affect scoring anyways because IE9 cannot do WebGL at all)
            if (isset($_REQUEST['webgl']) && $_REQUEST['webgl'] == false && mb_stripos($sSrc, 'webglmark') != false)
            {
                // Do nothing
                continue;
            }

            // Debug?
            if ($GLOBALS['DEBUG'])
            {
                $sContent = str_replace('</head>', "\t<!-- " . __METHOD__ . ": File location {$GLOBALS['ROOT']}/pages{$sSrc}\" -->\n\t</head>", $sContent);
            }
            $sContent = str_replace('</head>', "\t<script src=\"{$sSrc}\" type=\"text/javascript\"></script>\n\t</head>", $sContent);
        }

        // Get next test location
        $sNextTest = '';
        // If debug or full is activated and next test is selected from frontpage
        if (($GLOBALS['DEBUG'] || $GLOBALS['FULL']) && isset($_SESSION['test_only']))
        {
            // Loop through tests to find tests that are matched to a selected test (group)
            foreach ($GLOBALS['TESTS'] as $iKey => $sTest)
            {
                // If test is same as current fullname, get next one
                if ($GLOBALS['PATH']['fullname'] == $sTest)
                {
                    $iNext = $iKey + 1;
                    // Ensure next test fits in selected test (group)
                    if (isset($GLOBALS['TESTS'][$iNext]) && mb_stristr($GLOBALS['TESTS'][$iNext], $_SESSION['test_only']))
                    {
                        $sNextTest = "var nextTest = \"{$GLOBALS['HOST']}{$GLOBALS['TESTS'][$iNext]}\";";
                        break;
                    }
                    // Next test belongs to a wrong group or not found, next one is results page
                    else
                    {
                        $sNextTest = "var nextTest = \"{$GLOBALS['HOST']}/results\";";
                        break;
                    }
                }
            }
            // If next test is still empty, it means that we are in front page or in results page so next test is selected one
            if ($sNextTest == '')
            {
                $sNextTest = "var nextTest = \"{$GLOBALS['HOST']}{$_SESSION['test_only']}\";";
            }
        }
        // Normal routine when no tests are preselected nor when debug and full is deactivated
        else
        {
            $iKey = array_search($GLOBALS['PATH']['fullname'], $GLOBALS['TESTS']);
            if ($iKey !== false)
            {
                $iKey++;
                if (isset($GLOBALS['TESTS'][$iKey]))
                {
                    $sNextTest = "var nextTest = \"{$GLOBALS['HOST']}{$GLOBALS['TESTS'][$iKey]}\";";
                }
                else
                {
                    // There are no more tests, results page is next one
                    $sNextTest = "var nextTest = \"{$GLOBALS['HOST']}/results\";";
                }
            }
            else
            {
                $sNextTest = "var nextTest = \"{$GLOBALS['HOST']}{$GLOBALS['TESTS'][0]}\";";
            }
        }

        // Define continent server, by default it is same server as what is used for Browsermark
        $sContinentServer = $GLOBALS['HOST'];
        if (isset($_SESSION['continent']))
        {
            $sContinentServer = $_SESSION['continent'];
        }

        // Finally add some guidance parameters for tests
        // If domain is same in lowercase and in uppercase, it means that domain is IP and must be used as is
        $sDomainHost = $GLOBALS['HOST'];
        if (mb_strtolower($GLOBALS['HOST']) != mb_strtoupper($GLOBALS['HOST']))
        {
            // We have non-ip domain
            $aDomainParts = explode('.', str_replace(array('http://', 'https://'), '', $GLOBALS['HOST']));
            $aDomainParts = array_reverse($aDomainParts);
            $sDomainHost = (isset($aDomainParts[1])) ? $aDomainParts[1] . '.' . $aDomainParts[0] : $aDomainParts[0];
        }
        $sCustomJavascript = "    <script type=\"text/javascript\">
            var debug = " . ($GLOBALS['DEBUG'] ? "true;" : "false;") . "
            var version = \"{$_SESSION['VERSION']}\";
            var domainHost = \"{$sDomainHost}\";
            var full = " . ($GLOBALS['FULL'] ? "true;" : "false;") . "
            {$sNextTest}
            var continentServer = '{$sContinentServer}';
        </script>
    </head>";

        $sContent = str_replace('</head>', $sCustomJavascript, $sContent);

        // Place next test information also in certain div so jquery can read it from there
        $sNextTestDiv = '<div id="next_test" data-next="' . str_replace(array('var nextTest = ', '"', ';'), '', $sNextTest) . '"></div>';
        if (isset($_REQUEST['content_only']))
        {

            $sContent = $sContent . $sNextTestDiv;
        }
        else
        {
            $sContent = str_replace('</body>', "{$sNextTestDiv}</body>", $sContent);
        }

        return $sContent;

    }

    /**
     * Method to fetch certain types of files from certain path and from parents paths
     *
     * @protected
     * @param $sFilter Filter string for function glob
     * @param null $sPath Path where this method should start searching files
     * @return array Array of files
     */
    protected function _getFiles($sFilter, $sPath = null)
    {
        // If path is null, create it with $GLOBALS['PATH']
        if ($sPath === null)
        {
            // Always include dirname
            $sPath = $GLOBALS['PATH']['dirname'];
            // If basename is not empty and do not contain dot or is numeric (in case it is version number), use it after dirname
            if (!empty($GLOBALS['PATH']['basename']) && (!mb_stristr($GLOBALS['PATH']['basename'], '.') || is_numeric($GLOBALS['PATH']['basename'])))
            {
                $sPath .= (mb_substr($GLOBALS['PATH']['basename'], 0, 1) != '/') ? "/{$GLOBALS['PATH']['basename']}" : $GLOBALS['PATH']['basename'];
            }
        }

        // Now when we have path, we can start to gather files. Files are gathered based on their names and file in same tree deeper
        // will be ruling. So if we check example js files from path /tests/benchmarks/css/3d_rendering, under that directory all
        // javascript files are included. Javascript files under /tests/benchmarks/css are included if their name differs from first
        // round, javascript files under /tests/benchmarks are included if their name differs from first and from second round etc.
        // until we have reached root of pages/.

        // Get files
        $sDir = $GLOBALS['ROOT'] . '/pages';
        $sDir .= ($sPath == '/') ? $sPath : $sPath . '/';
        $aFiles = glob($sDir . $sFilter, GLOB_BRACE);
        $aReturn = array();
        foreach ($aFiles as $sFile)
        {
            // Leave only filename
            $sFileName = str_replace($sDir, '', $sFile);
            // Save filename as key (since filenames are the ruling ones) and path + filename as it's value
            $aReturn[$sFileName] = ($sPath == '/') ? $sPath . $sFileName : $sPath . '/' . $sFileName;
            // Not sure why, but sometimes filepath might contain double slashes. Remove those
            // @todo: resolve why and fix the bug!
            $aReturn[$sFileName] = str_replace('//', '/', $aReturn[$sFileName]);
        }

        // Ensure path is not /
        if ($sPath != '/')
        {
            // Shorten path by one and recursive run this method again
            $sPath = implode('/', explode('/', $sPath, -1));
            // If path is empty, pass /
            $sPath = (empty($sPath)) ? '/' : $sPath;
            $aSubReturn = $this->_getFiles($sFilter, $sPath);
            $aReturn = array_merge($aSubReturn, $aReturn);
        }
        return $aReturn;
    }

    /**
     * Wakeup method
     */
    public function __wakeup()
    {
        self::__construct();
    }

}

?>