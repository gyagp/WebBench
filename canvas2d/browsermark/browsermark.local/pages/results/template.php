<?php

echo '<div class="performance"><br>';

echo $_SESSION['ResultsModel']->overall();

echo $_SESSION['ResultsModel']->fetchTOP3();

// Conformance is saved before validity test to provide network speed data for Power Board
$sConformance = $_SESSION['ResultsModel']->conformance();

echo $_SESSION['ResultsModel']->validity();

echo $_SESSION['ResultsModel']->share();

echo $_SESSION['ResultsModel']->performance();

echo '<br>&nbsp;</div><div class="conformance"><br>';

echo $sConformance;

echo '<br>&nbsp;</div>';

echo $_SESSION['ResultsModel']->export();

?>