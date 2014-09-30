<?php

require_once(dirname(__FILE__) . '/../../configuration.php');

// Ensure all required data came
if (isset($_POST['test_name'], $_POST['test_version'], $_POST['raw_score'], $_POST['compare_score'], $_POST['is_conformity']))
{
    // Ensure current test is same as we got via post
    $sTestName = $_POST['test_name'] . ' ' . $_POST['test_version'];
    if ($sTestName != $_SESSION['current_test']['name'])
    {
        // Possible mismatch, prevent saving
        $_SESSION['prevent_saving'][] = "Tests mismatch: while running {$sTestName} system assumed test {$_SESSION['current_test']}";
    }

    // Add compare score to meta information when not in conformity test
    $aMetaInformation = $_POST['meta_information'];

    // Mark conformity group(s)
    if ($_POST['is_conformity'] == 1)
    {
        $_SESSION['conformity_groups'][$_SESSION['current_group']['name']] = $_SESSION['current_group']['name'];
    }
    else
    {
        $aMetaInformation['compareScore'] = $_POST['compare_score'];
    }

    // Send result to a results handler
    $sJSON = $GLOBALS['ResultsHandler']->testFinalScore($_POST['raw_score'], $_POST['compare_score'], $_POST['is_conformity']);

    $_SESSION['test_meta'][$_SESSION['current_group']['name']][$sTestName] = $aMetaInformation;

    // Save final score into session
    $oJSON = json_decode($sJSON);
    $_SESSION['test_run'][$_SESSION['current_group']['name']][$sTestName] = $oJSON->finalScore;

    // Return json
    echo $sJSON;

}

?>