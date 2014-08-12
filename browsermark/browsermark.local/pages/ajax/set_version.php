<?php

require_once(dirname(__FILE__) . '/../../configuration.php');

if (isset($_POST['version']))
{
    switch ($_POST['version'])
    {
        case '2.0':
            $_SESSION['VERSION'] = '2.0';
            $_SESSION['FORMULA'] = 'arithmetic';
            break;
        default:
            $_SESSION['VERSION'] = '2.1';
            $_SESSION['FORMULA'] = 'geomean';
            break;
    }
}

?>