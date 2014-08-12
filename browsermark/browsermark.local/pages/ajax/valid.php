<?php

if (isset($_POST['validity']))
{
    $_SESSION['validity'] = (int) $_POST['validity'];
}

?>