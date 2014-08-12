<?php

require_once(dirname(__FILE__) . '/../../configuration.php');

if (isset($_POST['values']))
{
    // Save values
    $_SESSION['responsiveness'] = $_POST['values'];
}
else if (isset($_SESSION['responsiveness']))
{
    echo json_encode($_SESSION['responsiveness']);
    unset($_SESSION['responsiveness']);
}

?>