<?php

class FrontPageModel
{
    /**
     * Method to check that certain requirements is met and test run can be marked as valid
     *
     * @return int Return 0 is test run must be marked invalid, otherwise return 1
     */
    static function valid()
    {
        $aInvalidOS = array('Unknown', 'iOS');
        $aInvalidBrowsers = array('Unknown');
        $aInvalidDeviceNames = array('Unknown', 'Client Platform Build');
        if (in_array($aInvalidOS, $GLOBALS['BrowserDetect']->os))
        {
            return 0;
        }
        else if ($GLOBALS['BrowserDetect']->categoryId < 3 && in_array($aInvalidBrowsers, $GLOBALS['BrowserDetect']->browser))
        {
            return 0;
        }
        else
        {
            foreach ($aInvalidDeviceNames as $sInvalidDeviceName)
            {
                if (mb_stristr($GLOBALS['BrowserDetect']->deviceName, $sInvalidDeviceName))
                {
                    return 0;
                }
            }
        }
        return 1;
    }

    /**
     * @return array Always return array where first element is extra class name for start button, and second parameter contains more info (if any)
     */
    static function enableStartButton()
    {
        if ($GLOBALS['BrowserDetect']->browser == 'Opera Mini')
        {
            return array(
                "",
                "Opera Mini users cannot run Browsermark {$GLOBALS['VERSION']} due to Opera Mini's server rendering functionality.",
            );
        }
        else if ($GLOBALS['BrowserDetect']->browser == 'Safari' && $GLOBALS['BrowserDetect']->os == 'iOS' && $GLOBALS['BrowserDetect']->osMajor < 5)
        {
            array(
                "",
                "iOS {$GLOBALS['BrowserDetect']->osVersion} not supported when using Safari. Please update your iOS or try another browser.",
            );
        }

        return array(" enabled", "");
    }

    /**
     * @return string Returns device name or empty string if device name is not available
     */
    static function deviceName()
    {
        if ($GLOBALS['BrowserDetect']->deviceName)
        {
            return "{$GLOBALS['BrowserDetect']->category} {$GLOBALS['BrowserDetect']->deviceName}";
        }
        return '';
    }

    static function continents()
    {
        // First: get continents or exit with empty string
        $aContinents = array();
        $sQuery = "SELECT continent_server_id, server_name, server_url FROM continent_servers ORDER BY continent_server_id ASC";
        if ($GLOBALS['DB'] && $oResult = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aResult = $oResult->fetch_assoc())
            {
                $aContinents[] = $aResult;
            }
        }
        else if (isset($GLOBALS['CONTINENTS']))
        {
            foreach ($GLOBALS['CONTINENTS'] as $sContinent => $sURL)
            {
                $aContinents[] = array(
                    'continent_server_id' => $sContinent,
                    'server_name' => $sContinent,
                    'server_url' => $sURL,
                );
            }
        }
        if (empty($aContinents))
        {
            return '';
        }

        // Start to generate dropdown
        $sContinents = "<h3><span>SELECT</span> your nearest server</h3>\n\t\t\t\t\t<h3 id=\"continent\">\n";

        // Resolve ISP country if needed
        if (isset($GLOBALS['CONTINENT_PRESELECT']) && !isset($_SESSION['continent']))
        {
            $iLongIP = Dot2LongIP($_SERVER['REMOTE_ADDR']);

            $sQuery = "SELECT isp_name, country_code FROM ip_country WHERE ip_from <= {$iLongIP} AND ip_to >= {$iLongIP} LIMIT 1";
            if ($oResult = $GLOBALS['DatabaseHandler']->query($sQuery))
            {
                $aResult = $oResult->fetch_assoc();
                // Save for future use
                $_SESSION['NETWORK_DETAILS'] = $aResult;
                foreach ($GLOBALS['CONTINENT_PRESELECT'] as $sURL => $aCountries)
                {
                    if (in_array($aResult['country_code'], $aCountries))
                    {
                        $_SESSION['continent'] = $sURL;
                        $sContinents .= "                        <p>We detected your country to '{$aResult['country_code']}', and based on that we selected your nearest server. If needed, you can change the selection from below.</p>\n";
                        break;
                    }
                }
            }
        }

        foreach ($aContinents as $aContinent)
        {
            $sActivated = '';
            if (isset($_SESSION['continent']) && ($_SESSION['continent'] == $aContinent['server_url']))
            {
                $sActivated = ' class="activated"';
            }
            $sContinents .= "                        <a href=\"#\" data-id=\"{$aContinent['continent_server_id']}\"{$sActivated}>{$aContinent['server_name']}</a>\n&nbsp;&nbsp;&nbsp;";
        }
        $sContinents .= "                    </h3>\n\t\t\t\t\t";

        return $sContinents;
    }

    public static function versions()
    {
        $sVersions = '';
        $aDirs = array_reverse(glob(dirname(__FILE__) . '/../pages/tests/*', GLOB_ONLYDIR));
        if (count($aDirs) > 1)
        {
            foreach ($aDirs as $sVer)
            {
                $sVer = str_replace(dirname(__FILE__) . '/../pages/tests/', '', $sVer);
                $sClass = ($sVer == $_SESSION['VERSION']) ? ' class="selected"' : '';
                $sVersions .= "<a href=\"#\"{$sClass}>{$sVer}</a>";
            }

            return "<div id=\"version\" class=\"group\"><h3><span>SELECT</span> version</h3>{$sVersions}</div>";
        }

        return '';

    }

    public static function testSelect($aDisabledTests = array())
    {
        $sReturn = "<h3><span>SELECT</span> test(s)</h3><div id=\"tests_dropdown\"><select name=\"tests\" class=\"selectTest\">";

        $aWordsFrom = array('_', 'Css', 'Dom', 'Webgl', 'Html', 'Svg');
        $aWordsTo = array(' ', 'CSS', 'DOM', 'WebGL', 'HTML', 'SVG');
        $sDropdown = '';
        foreach ($GLOBALS['TESTS'] as $sTest)
        {
            if (empty($sDropdown))
            {
                $sDropdown = '<option value="' . $sTest . '">All tests</option>';
            }
            else
            {
                $aParts = explode('/', $sTest);
                $iFillMultiplier = mb_strlen('—');
                $iFillLength = (count($aParts)-3) * $iFillMultiplier;
                $sFill = str_pad('', $iFillLength, '—', STR_PAD_LEFT);
                $sCaption = str_replace($aWordsFrom, $aWordsTo, mb_convert_case(array_pop($aParts), MB_CASE_TITLE));
                $sDisabled = (in_array($sCaption, $aDisabledTests)) ? ' disabled="disabled"' : '';
                $sSelected = (isset($_SESSION['test_only']) && $_SESSION['test_only'] == $sTest) ? ' selected="selected"' : '';
                $sDropdown .= "<option value=\"{$sTest}\"{$sSelected}{$sDisabled}>{$sFill} {$sCaption}</option>\n";
            }
        }

        $sReturn .= "{$sDropdown}</select></div>";

        return $sReturn;
    }

    public static function launchButton ($sLaunchText, $sYesEnabled, $iDataValid, $sExtraText = '')
    {
        $sExtra = (empty($sExtraText)) ? '' : "<span class=\"info\">{$sExtraText}</span>";
        return "<div data-valid=\"{$iDataValid}\" class=\"start_test{$sYesEnabled} launchBar\"><span>{$sLaunchText}<span class=\"launchIcon\"></span></span>{$sExtra}</div>";
    }
}