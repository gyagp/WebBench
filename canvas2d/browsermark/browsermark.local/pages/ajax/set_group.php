<?php

require_once(dirname(__FILE__) . '/../../configuration.php');

if (isset($_POST['group_name'], $_POST['group_version']))
{
    // Create name for a group, set id as null for now
    $sGroup = $_POST['group_name'] . ' ' . $_POST['group_version'];
    $_SESSION['current_group'] = array(
        'id' => null,
        'name' => $sGroup,
    );

    // If database object is found, save group to a database (if necessary)
    if ($GLOBALS['DB'])
    {
        $sQuery = 'INSERT INTO browsermark_groups SET group_name = ?, group_version = ?  ON DUPLICATE KEY UPDATE browsermark_group_id = LAST_INSERT_ID(browsermark_group_id)';
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ss', $_POST['group_name'], $_POST['group_version']);
            if ($stmt->execute())
            {
                $_SESSION['current_group']['id'] = $stmt->insert_id;
            }
        }
    }
}

?>