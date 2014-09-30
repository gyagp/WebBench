<?php

/**
 * Browsermark Next Gen main controller
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

// Require master configuration
require_once(dirname(__FILE__) . '/../configuration.php');

// If maintenance mode is active, redirect to maintenance page instead
if (isset($GLOBALS['MAINTENANCE']))
{
    header("Location: {$GLOBALS['HOST']}/maintenance");
    exit;
}

// Temporary hack for media
if (isset($_SERVER['REMOTE_USER']) && !empty($_SERVER['REMOTE_USER']))
{
    $_SESSION['REMOTE_USER'] = $_SERVER['REMOTE_USER'];
}

// Check is request root request
if ($GLOBALS['PATH']['dirname'] == '/' || $GLOBALS['PATH']['dirname'] == '')
{
    // Root request, find handler
    if (file_exists(dirname(__FILE__) . '/../pages/' . $GLOBALS['PATH']['basename'] . '/index.php'))
    {
        // Found custom handler, use it
        require_once(dirname(__FILE__) . '/../pages/' . $GLOBALS['PATH']['basename'] . '/index.php');
    }
    // PHP handler not found, try to find file
    else if ($GLOBALS['PATH']['extension'] != '' && file_exists(dirname(__FILE__) . '/../pages/' . $GLOBALS['PATH']['basename']))
    {
        // Header
        header('Content-Type: ' . MIMEType::detect($GLOBALS['PATH']['extension']));

        // Found secondary file, require it if php, otherwise print it
        if ($GLOBALS['PATH']['extension'] == 'php')
        {
            require_once(dirname(__FILE__) . '/../pages/' . $GLOBALS['PATH']['basename']);
        }
        else
        {
            print file_get_contents(dirname(__FILE__) . '/../pages/' . $GLOBALS['PATH']['basename']);
        }
    }
    else
    {
        // Give handle for preprocessor
        $GLOBALS['PreProcessor']->generate();
    }
}
else
{
    // Not root request but a subpage request, try to find secondary PHP handler
    if (file_exists(dirname(__FILE__) . '/../pages' . $GLOBALS['PATH']['dirname'] . '/' . $GLOBALS['PATH']['basename'] . '.php'))
    {
        // Found secondary PHP handler, use it
        require_once(dirname(__FILE__) . '/../pages' . $GLOBALS['PATH']['dirname'] . '/' . $GLOBALS['PATH']['basename'] . '.php');
    }
    // secondary PHP handler not found, try to find secondary file
    else if ($GLOBALS['PATH']['extension'] != '' && file_exists(dirname(__FILE__) . '/../pages' . $GLOBALS['PATH']['fullname']))
    {
        // Header
        header('Content-Type: ' . MIMEType::detect($GLOBALS['PATH']['extension']));

        // If gzipped
        if ($GLOBALS['PATH']['extension'] == 'gz')
        {
            header('Content-Encoding: gzip');
        }

        // Found secondary file, require it if php, otherwise print it
        if ($GLOBALS['PATH']['extension'] == 'php')
        {
            require_once(dirname(__FILE__) . '/../pages' . $GLOBALS['PATH']['fullname']);
        }
        else
        {
            print file_get_contents(dirname(__FILE__) . '/../pages' . $GLOBALS['PATH']['fullname']);
        }
    }
    // Secondary file not found from templates, try to locate primary handler
    else if (file_exists(dirname(__FILE__) . '/../pages' . $GLOBALS['PATH']['dirname'] . '/index.php'))
    {
        // Found primary handler, use it
        require_once(dirname(__FILE__) . '/../pages' . $GLOBALS['PATH']['dirname'] . '/index.php');
    }
    // Primary handler not found, give handle for preprocessor
    else
    {
        // Give handle for preprocessor
        $GLOBALS['PreProcessor']->generate();
    }

}

ob_end_flush();

?>