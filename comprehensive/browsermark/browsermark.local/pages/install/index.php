<?php

/**
 * Browsermark installer
 *
 * @version 2.0
 * @package Configuration
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

$bIsInstalling = true;
require_once(dirname(__FILE__) . '/../../configuration.php');
require_once(dirname(__FILE__) . '/Installer.php');

// Form values
$aValues = Installer::formValues();

// Define subtitle and booleans since same element is served for prerequisites and for save results
$bContinue = true;
$bDatabase = true;
$bDone = false;
$sSubTitle = "Prerequisites";

// If data is post, save file
if (isset($_POST['mode']))
{
    $bContinue = false;
    $bDone = true;
    $sSubTitle = "Configuration done";
    $aChecks = Installer::saveConfiguration($_POST);
}
else
{
    // Prerequisites
    $aChecks = Installer::prerequisites($bContinue, $bDatabase);
}

// Loop through checks
$sCheckStrings = '';
foreach ($aChecks as $sKey => $bValue)
{
    $sCheckStrings .= Installer::checksToString($sKey, $bValue);
}

// Print template
require_once(dirname(__FILE__) . '/template.php');

?>