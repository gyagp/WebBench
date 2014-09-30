<?php
// Opt out from ob handler
$bNoObHandler = true;

// Require master configuration
require_once(dirname(__FILE__) . '/../configuration.php');

$bNotResult = isset($_GET['notresult']);

$GLOBALS['ExportHandler']->exportCSV($bNotResult);

?>