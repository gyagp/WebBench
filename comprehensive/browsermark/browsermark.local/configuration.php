<?php

/**
 * General configuration settings
 *
 * File contains general configuration settings that should remain unmodfied unless server configuration require other settings. To set up
 * MySQL connection parameters, possible debug-mode or to activate the full version mode, please use configuration/production.php instead.
 *
 * @see configuration/production.php
 *
 * @version 2.0
 * @package Configuration
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 *
 * @todo Improve PHPDoc blocks
 **/

/**
 * @global Browsermark version
 */
$GLOBALS['VERSION'] = '2.1';

/**
 * @global Root path
 **/
$GLOBALS['ROOT'] = dirname(__FILE__);

/**
 * @global host name
 **/
$GLOBALS['HOST'] = (isset($_SERVER['HTTPS']) ? "https://{$_SERVER['HTTP_HOST']}" : "http://{$_SERVER['HTTP_HOST']}");

/**
 * @global Database object not set by default
 **/
$GLOBALS['DB'] = false;

/**
 * @global Debug mode off
 **/
$GLOBALS['DEBUG'] = false;

/**
 * @global Full version enabled
 **/
$GLOBALS['FULL'] = true;

/**
 * @global Secret salt fallback value
 **/
$GLOBALS['SALT'] = '2ayux7jUd_x_?haf';

/**
 * @global timezone fallback value
 */
$GLOBALS['TIMEZONE'] = 'GMT';

/**
 * Require magic_functions.php
 **/
require_once(dirname(__FILE__) . '/magic_functions.php');

/**
 * @global path info where query string etc. is removed
 **/
$GLOBALS['PATH'] = securePath(pathinfo(str_replace(strpbrk($_SERVER['REQUEST_URI'], '?#;&'), '', $_SERVER['REQUEST_URI'])));

/**
 * @global output buffer queue
 **/
$GLOBALS['OB'] = array();

/**
 * @global array of ErrorExceptions
 **/
$GLOBALS['ERRORS'] = array();

/**
 * @global statistics rate, possible values are day/week/month
 **/
$GLOBALS['STATISTICS_RATE'] = 'month';

/**
 * Require production/development/test configuration
 *
 * To overwrite production values use configuration/development.php. To overwrite development values, use configuration/test.php
 **/
if (file_exists(dirname(__FILE__) . '/configuration/test.php'))
{
    require_once(dirname(__FILE__) . '/configuration/production.php');
}
else if (file_exists(dirname(__FILE__) . '/configuration/development.php'))
{
    require_once(dirname(__FILE__) . '/configuration/development.php');
}
else if (file_exists(dirname(__FILE__) . '/configuration/production.php'))
{
    require_once(dirname(__FILE__) . '/configuration/production.php');
}

// If no configurations found and path basename is not pointing to install, redirect browser to a installation script
else if ($GLOBALS['PATH']['basename'] != 'install' && $GLOBALS['PATH']['dirname'] != '/install' && empty($GLOBALS['PATH']['extension']))
{
    header("Location: {$GLOBALS['HOST']}/install");
    exit;
}

/**
 * Error reporting
 *
 * All errors on, display errors same as DEBUG
 **/
error_reporting(-1);
ini_set('display_errors', $GLOBALS['DEBUG']);

/**
 * session start
 **/
//session_cache_limiter('public');
session_start();

if (!isset($_SESSION['VERSION']))
{
    // By default user runs most current version of Browsermark
    $_SESSION['VERSION'] = $GLOBALS['VERSION'];
    // Most current version of Browsermark use geometric mean
    $_SESSION['FORMULA'] = 'geomean';
}

/**
 * @global array of tests (performance and conformance)
 **/
$GLOBALS['TESTS'] = array_merge(array('/tests/' . $_SESSION['VERSION']), fetchTests('/pages/tests/' . $_SESSION['VERSION']));


// Remove no-cache
//header('Pragma:');
//header('Cache-Control: public, max-age=10800');

/**
 * Objects creator
 *
 * Create objects (if necessary) for following classes: {@link Preprocessor}, {@link Database}, {@link ResultsHandler}, {@link LoginHandler},
 * {@link BrowserDetect} and {@link PowerboardConnector}
 *
 * @see Creator
 **/
if (!isset($GLOBALS['MAINTENANCE']))
{
    require_once(dirname(__FILE__) . '/objects/creator.php');

    // OB handler mess CSV export, so we need to have opt out
    global $bNoObHandler;
    if ($bNoObHandler !== true)
    {
        /**
         * Output buffer with ob_handler to process content before output
         **/
        ob_start('obHandler');

        /**
         * Error handler for to not mess good flow but showing errors at the bottom of screen...
         **/
        $sOldErrorHandler = set_error_handler("errorHandler", E_ALL | E_STRICT | E_USER_NOTICE | E_USER_WARNING | E_USER_ERROR);
    }
}

// Time zone set
date_default_timezone_set($GLOBALS['TIMEZONE']);

// User levels
$GLOBALS['USER_LEVELS'] = array(
    "master" => 99,
    "admin"  =>  50,
    "client" =>   25,
    "visitor" => 5,
);

?>