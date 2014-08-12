<?php

require_once(dirname(__FILE__) . '/../../configuration.php');

if ($GLOBALS['DEBUG'] || $GLOBALS['FULL'])
{
    if (isset($_POST['start']))
    {
        if (in_array($_POST['start'], $GLOBALS['TESTS']))
        {
            $_SESSION['test_only'] = $_POST['start'];
        }
    }
}

?>