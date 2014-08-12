<?php

// Enable Yes?
$aEnabled = FrontPageModel::enableStartButton();
$sYesEnabled = $aEnabled[0];
// Fill out more info if needed
$sMoreInfo = (empty($aEnabled[1])) ? '' : "<br clear=\"all\"><p class=\"inverse-color\">{$aEnabled[1]}</p>";

// Can test run be marked as valid?
$iDataValid = FrontPageModel::valid();
// Full mode & logged in; save validity before start
if ($GLOBALS['FULL'] == true || $GLOBALS['LoginModel']->hasLoggedIn())
{
    $_SESSION['validity'] = $iDataValid;
}

// Device name (if needed)
$sDeviceName = FrontPageModel::deviceName();
$sDeviceName = (empty($sDeviceName)) ? '' : "\n                            <p>Your device is</p><span class=\"shock-color\">{$sDeviceName}</span>\n";

// Continents output
$sContinents = FrontPageModel::continents();

// Versions & dropdown if needed
$sVersions = '';
$sTestSelection = '';
if (($GLOBALS['FULL'] || $GLOBALS['LoginModel']->hasLoggedIn()) && $GLOBALS['PATH']['basename'] == '')
{
    // Version select
    $sVersions = FrontPageModel::versions();

    // Test select
    $sTestSelection = FrontPageModel::testSelect(array('Responsiveness'));
}

// Launch button
$sLaunchButton = FrontPageModel::launchButton('Launch Browsermark',
        $sYesEnabled,
        $iDataValid,
        'To get most reliable score from benchmark, please close other browsers, tabs and make sure your screen stays awake the whole time during the test.');

print <<<CONTENT
                    {$sVersions}{$sTestSelection}{$sContinents}{$sLaunchButton}
                    <br clear="all">
                    <p class="contentBottomPara">collected information</p>
                    <div id="browserInfoWrap" class="group">
                        <p>Your operating system is</p><span class="">{$GLOBALS['BrowserDetect']->os}</span>
                        <p>Your browser is</p><span class="">{$GLOBALS['BrowserDetect']->browser} {$GLOBALS['BrowserDetect']->browserMajor}</span>
                        <p>Layout engine used in your browser is</p><span class="">{$GLOBALS['BrowserDetect']->layoutEngine} {$GLOBALS['BrowserDetect']->layoutMajor}</span>{$sDeviceName}
                    </div>

                    <br clear="all">

CONTENT;

?>