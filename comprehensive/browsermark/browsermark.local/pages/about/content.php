<?php

print <<<CONTENT
                        <h1 class="about_h1_header">About Browsermark {$GLOBALS['VERSION']}</h1>

                        <p>Browsermark {$GLOBALS['VERSION']} is highly improved version of Browsermark, world-famous browser benchmark published in
                            2009. Rightware’s next generation version will focus on real life performance measurement.</p>

                        <p>When running our Browsermark {$GLOBALS['VERSION']}, you can find answers for instance:</p>

                        <ul class="about_ul_position">
                            <li>How well browser will resize screen?</li>
                            <li>How fast browser loads pages and send requests?</li>
                            <li>Does browser support modern web site development techniques?</li>
                            <li>This and many other things are measured in one run</li>
                            <li>And of course we haven’t forgotten our roots, Browsermark {$GLOBALS['VERSION']} still has heavy workloads which measure
                            sheer power of the browser</li>
                        </ul>

                        <h2 class="about_h2_header">What is tested?</h2>

CONTENT;

if ($_SESSION['VERSION'] == 2.0)
{
    print <<<CONTENT
                        <p>Currently we have five test groups:</p>

                        <p><b>CSS group:</b> measures your browsers 2D and 3D performance, and finally executes CSS Crunch test</p>

                        <p><b>DOM group:</b> measures variety of areas, like how well your browser traverse in Document Object Model Tree or how
                            fast your browser can create dynamic content</p>

                        <p><b>General group:</b> measures areas like resize and page load times</p>

                        <p><b>Graphics group:</b> tests browsers Graphics Processing Unit power by measuring WebGL and Canvas performance</p>

                        <p><b>Javascript group:</b> executes number crunching by doing selected Array and String operations</p>

                        <p>Additionally Browsermark will test your browsers conformance, too. Conformance results tells how well browser did on
                            CSS3 and in HTML5 support tests. Also browsers Flash and Silverlight support are tested here.</p>

CONTENT;

}
else
{
    print <<<CONTENT
                    <p>Browsermark 2.1 have six different test groups, which are:</p>

                        <p><b>CSS group:</b> measures your browsers 2D and 3D performance and resize, and finally executes CSS Crunch test</p>

                        <p><b>DOM group:</b> measures variety of areas, like how well your browser traverse in Document Object Model Tree or how
                            fast your browser can create dynamic content</p>

                        <p><b>Graphics group:</b> tests browsers Graphics Processing Unit power by measuring Canvas, SVG and WebGL performance</p>

                        <p><b>Javascript group:</b> executes number crunching by doing selected Array and String operations</p>

                        <p><b>Scalable Solutions group:</b> go through popular Javascript frameworks, like Angular and Backbone</p>

                        <p><b>Network group:</b> measures areas like resize and page load times</p>

                        <p>Additionally Browsermark will test your browsers conformance, too. Conformance results tells how well browser did on
                            CSS3 and in HTML5 support tests. Also browsers Flash and Silverlight support are tested here.</p>
CONTENT;

}

if ($GLOBALS['FULL'])
{
    echo "                        <h3 class=\"about_h3_header\">Test details</h3>\n\n";
    /*echo "                        <p>Currently all tests are balanced in way that none of the modern desktop browsers should score more than 6000 points from
                                            individual test (+/- 200 points).</p>\n\n";*/

    // Loop through each test
    foreach($GLOBALS['TESTS'] as $sTest)
    {
        if (file_exists(dirname(__FILE__) . '/..' . $sTest . '/test.js'))
        {
            // Read file content
            $aFileContent = file(dirname(__FILE__) . '/..' . $sTest . '/test.js');
            $sFileContent = implode("\n", $aFileContent);

            // Test must contain @version
            if (mb_stristr($sFileContent, '@version'))
            {
                // Title is always on line 2
                $sTitle = trim(str_replace(' * ', '', $aFileContent[1]));

                // Gather information, starting from line 4
                $sVersion = '';
                $sAuthor = '';
                $sCopyright = '';
                $sDescription = '';
                for ($iCnt = 3; $iCnt < count($aFileContent); $iCnt++)
                {
                    // Break out if **/
                    if (mb_stristr($aFileContent[$iCnt], ' **/'))
                    {
                        break;
                    }

                    // @version
                    else if (mb_stristr($aFileContent[$iCnt], '@version'))
                    {
                        $sVersion = trim(str_replace(' * @version ', '', $aFileContent[$iCnt]));
                    }

                    // @author
                    else if (mb_stristr($aFileContent[$iCnt], '@author'))
                    {
                        $aAuthor = explode(' <', trim(str_replace(array('>', ' * @author '), '', $aFileContent[$iCnt])));
                        $sAuthor = $aAuthor[0];
                        if (isset($aAuthor[1]))
                        {
                            // Create hyperlink
                            $sAuthor = "<a href=\"mailto:{$aAuthor[1]}\">{$aAuthor[0]}</a>";
                        }
                    }

                    // @copyright
                    else if (mb_stristr($aFileContent[$iCnt], '@copyright'))
                    {
                        $sCopyright = trim(str_replace(' * @copyright ', '', $aFileContent[$iCnt]));
                    }
                    // otherwise this belongs to description
                    else
                    {
                        $sRow = trim(str_replace(' *', '', $aFileContent[$iCnt]));
                        if ($sRow)
                        {
                            $sDescription .= $sRow . '<br>';
                        }
                        else if (!$sVersion && !$sAuthor && !$sCopyright)
                        {
                            $sDescription .= '<br>';
                        }
                    }
                }
                echo "                        <h4 class=\"no-bottom-margin\">{$sTitle}</h4>\n";
                echo "                        <p class=\"small-desc\">Version {$sVersion}<br>Author {$sAuthor}<br>Copyright {$sCopyright}</p>\n";
                echo "                        <p>{$sDescription}</p>\n\n";
            }
        }
    }
}

?>
                        <h2>Copyright</h2>

                        <p>Copyright &copy; 2009&ndash;<?php echo date('Y'); ?> <a href="http://www.rightware.com">Rightware Ltd</a>. All Rights reserved.</p>

                        <p>Property of their respective owners:
                            <br /><a href="http://jquery.com">jQuery</a> (MIT License)
                            <br /><a href="http://jqueryui.com">jQuery UI</a> (MIT License)
                            <br /><a href="http://modernizr.com/">Modernizr</a> (MIT License)
                            <br /><a href="https://github.com/louisremi/jquery.transform.js">jQuery Transform</a> (MIT License)
                            <br /><a href="http://ricostacruz.com/jquery.transit">jQuery Transit</a> (MIT License)
                            <br /><a href="http://sylvester.jcoglan.com/">Sylvester Vector and Matrix math</a> (MIT License)
                            <br /><a href="http://mediabeez.ws/box2djs-jquery/">Box2DJS</a> (The zlib/libpng License)
                            <br /><a href="http://scenejs.org/">SceneJS</a> (MIT License)
                            <br /><a href="http://code.google.com/p/swfobject/">SWFObject</a> (MIT License)
                            <br /><a href="http://www.pinlady.net/PluginDetect">PluginDetect</a> (MIT License)
                            <br /><a href="http://keith-wood.name/svg.html">jQuery SVG</a> (MIT License)
                            <br /><a href="http://keith-wood.name/svg.html">jQuery SVG attribute animations</a> (MIT License)
                            <br /><a href="http://underscorejs.org/">Underscore.js</a> (MIT License)
                            <br /><a href="http://backbonejs.org/">Backbone.js</a> (MIT License)
                            <br /><a href="http://angularjs.org">AngularJS</a> (MIT License)
                            <br /><a href="http://emberjs.com">Ember - JavaScript Application Framework</a> (MIT License)
                            <br /><a href="http://handlebarsjs.com/">Handlebars.js</a> (MIT License)
                            <br /><a href="http://knockoutjs.com/">Knockout JavaScript library</a> (MIT License)
                        </p>

                        <h2>Thank you</h2>
                        <p>
                            <a href="http://preloaders.net/">Preloaders.net</a>
                        </p>

<ul>
    <li><a href="/">Main page</a></li><li><a href="http://results.rightware.com/browsermark/">Leaderboard</a></li><li><a href="/about">About</a></li><li><a href="/disclaimer">Disclaimer</a></li></ul>