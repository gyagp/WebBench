<?php

require_once(dirname(__FILE__) . '/../../configuration.php');

if (isset($_POST['test_name'], $_POST['test_version']))
{
    // Create name for a test, set id as null for now
    $sTest = $_POST['test_name'] . ' ' . $_POST['test_version'];
    $_SESSION['current_test'] = array(
        'id' => null,
        'name' => $sTest,
    );

    // If database object is found, save test to a database (if necessary)
    if ($GLOBALS['DB'])
    {
        $sQuery = 'INSERT INTO browsermark_tests SET test_name = ?, test_version = ?  ON DUPLICATE KEY UPDATE browsermark_test_id = LAST_INSERT_ID(browsermark_test_id)';
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ss', $_POST['test_name'], $_POST['test_version']);
            if ($stmt->execute())
            {
                $_SESSION['current_test']['id'] = $stmt->insert_id;
            }
        }
    }
}

?>