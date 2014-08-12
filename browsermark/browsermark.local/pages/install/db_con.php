<?php

/**
 * Test Database parameters via AJAX
 * @version 2.0
 * @package Configuration
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * Hide errors
 **/
ini_set('display_errors', 0);
header('Content-Type: text/plain;charset=utf-8');

if (!empty($_POST))
{
    $db_host = (!empty($_POST['db_host']) ? $_POST['db_host'] : die('0'));
    $db_port = (!empty($_POST['db_port']) ? $_POST['db_port'] : 3306);
    $db_name = (!empty($_POST['db_name']) ? $_POST['db_name'] : die('0'));
    $db_user = (!empty($_POST['db_user']) ? $_POST['db_user'] : die('0'));
    $db_pass = (!empty($_POST['db_pass']) ? $_POST['db_pass'] : null);

    $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

    if ($mysqli->connect_error)
    {
        die('0');
    }
    if ($mysqli->select_db($db_name))
    {
        die('1');
    }
}

die('0');

?>