<?php

require_once(dirname(__FILE__) . '/resultsModel.php');

// Initialize resultsModel
$_SESSION['ResultsModel'] = new resultsModel();

if ($_SESSION['ResultsModel']->error == true)
{
    // Generate 404
    $GLOBALS['PreProcessor']->generate();
}
else
{
    // Generate content
    $GLOBALS['PreProcessor']->generate(array('content.php' => '/results/template.php'));
}

?>