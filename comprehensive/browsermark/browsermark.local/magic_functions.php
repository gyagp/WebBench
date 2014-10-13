<?php

/**
 * Magic functions
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * securePath
 *
 * Secure path info so it is safe to use in require_once (see LFI/RFI for more details). Removes example double dots and sanitize data
 * @param array aPathInfo Array from function pathinfo()
 * @return array Return sanitized array of pathinfo() containing always extension part too
 **/
function securePath($aPathInfo)
{
    $aReturn = array(
        'basename' => '',
        'dirname' => '',
        'filename' => '',
        'extension' => '',
        'fullname' => '',
    );

    foreach ($aPathInfo as $sKey => $sValue)
    {
        switch($sKey)
        {
            // Basename and filename can contain a-z, A-Z, 0-9, hyphen, underscore, (, ) or one dot at time (not two dots in a row)
            case 'basename':
            case 'filename':
                $sValue = str_replace('..', '', $sValue);
                $sValue = preg_replace('/[^a-z0-9A-Z\-\_\(\)\.\%]/', '', $sValue);
                break;
            // Dirname can contain a-z, A-Z, 0-9 hyphen, underscore, slash or one dot
            case 'dirname':
                $sValue = str_replace('..', '', $sValue);
                $sValue = preg_replace('/[^a-z0-9A-Z\-\_\/\.]/', '', $sValue);
                break;
            // Default is most restrictive extension which allows only a-z and A-Z
            default:
                $sValue = preg_replace('/[^a-zA-Z]/', '', $sValue);
                break;
        }

        // Generate fullname
        $aReturn['fullname'] = (mb_substr($aReturn['dirname'], -1) == '/') ? $aReturn['dirname'] . $aReturn['basename'] : $aReturn['dirname'] . '/' . $aReturn['basename'];

        $aReturn[$sKey] = $sValue;
    }

    return $aReturn;
}

/**
 * Output handler
 *
 * Handle content change requests before showing content made by classes
 * @param string sBuffer Buffered string sent by ob_flush()
 * @return string return modified content
 **/
function obHandler($sBuffer)
{
    // Loop through each $GLOBALS['OB'] and process buffer
    foreach ($GLOBALS['OB'] as $sClass => $sHandle)
    {
        // Ensure method exists
        if (method_exists($sClass, $sHandle))
        {
            // Found, process buffer
            $sBuffer = $GLOBALS[$sClass]->$sHandle($sBuffer);
        }
    }

    // Serialize all objects in to session
    /*foreach ($GLOBALS as $sKey => $sValue)
    {
        if (is_object($sValue))
        {
            $_SESSION[$sKey] = serialize($sValue);
        }
    }*/

    // Display errors at the bottom of the screen
    if (count($GLOBALS['ERRORS']) >= 1)
    {
        $sErrors = "\t<ul id=\"php_errors\">";
        foreach ($GLOBALS['ERRORS'] as $oError)
        {
            switch($oError->getSeverity())
            {
                case E_ERROR:
                case E_CORE_ERROR:
                case E_COMPILE_ERROR:
                case E_USER_ERROR:
                case E_RECOVERABLE_ERROR:
                    $sErrorName = "ERROR";
                    break;
                case E_WARNING:
                case E_CORE_WARNING:
                case E_COMPILE_WARNING:
                case E_USER_WARNING:
                    $sErrorName = "WARNING";
                    break;
                case E_NOTICE:
                case E_USER_NOTICE:
                    $sErrorName = "NOTICE";
                    break;
                case E_STRICT:
                    $sErrorName = "STRICT";
                    break;
                case E_DEPRECATED:
                case E_USER_DEPRECATED:
                    $sErrorName = "DEPRECATED";
                    break;
                default:
                    $sErrorName = "MYSTERY";
                    break;
            }
            $sErrors .= "\n\t\t\t<li class=\"error\">";
            $sErrors .= "\n\t\t\t\t" . $sErrorName . " in " . $oError->getFile() . " on line " . $oError->getLine() . " " . $oError->getMessage();
            $sErrors .= "\n\t\t\t</li>";
        }
        $sErrors .= "\n\t\t</ul>";
        $sBuffer = str_replace('</body>', "{$sErrors}\n\t</body>", $sBuffer);
    }

    return $sBuffer;

}

/**
 * Error handler
 *
 * Output errors nicely at the end of the page instead of breaking output
 *
 * @param int iErrNo Error number
 * @param string sErrString Error string
 * @param string sErrFile File where error occurred
 * @param int iErrLine Line number where error occurred
 * @return bool Return always true
 **/
function errorHandler($iErrNo, $sErrString, $sErrFile, $iErrLine)
{
    if ($GLOBALS['DEBUG'])
    {
        $GLOBALS['ERRORS'][] = new ErrorException($sErrString, 0, $iErrNo, $sErrFile, $iErrLine);
    }
    return true;
}

/**
 * Fetch tests
 *
 * Loop through pages/tests all folders and create array containing all tests
 *
 * @param string sStartDir Starting directory, /pages/tests by default
 * @return array Array of tests
 **/
function fetchTests($sStartDir = '/pages/tests')
{
    $aDirs = glob($GLOBALS['ROOT'] . $sStartDir . '/*', GLOB_ONLYDIR);
    $aReturn = array();
    foreach ($aDirs as $sDir)
    {
        // Remove ROOT . '/pages'
        $sPath = str_replace($GLOBALS['ROOT'] . '/pages', '', $sDir);

        // Fetch subdirs
        $aReturn[] = $sPath;
        $aReturn = array_merge($aReturn, fetchTests('/pages' . $sPath));

    }

    return $aReturn;

}

function uacmp ($a, $b)
{
    if (mb_strlen($a) == mb_strlen($b))
    {
        return 0;
    }
    return (mb_strlen($a) < mb_strlen($b)) ? -1 : 1;
}

// Function to convert IP address (xxx.xxx.xxx.xxx) to IP number (0 to 256^4-1)
function Dot2LongIP ($IPaddr) {
    if ($IPaddr == "")
    {
        return 0;
    }
    else
    {
        $ips = explode(".", "$IPaddr");
        return ($ips[3] + $ips[2] * 256 + $ips[1] * 256 * 256 + $ips[0] * 256 * 256 * 256);
    }
}

?>