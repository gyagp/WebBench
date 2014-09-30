<?php

// Only for admins
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $GLOBALS['USER_LEVELS']['admin'])
{
    echo json_encode(array());
    exit;
}

// If receiving update request
if (isset($_REQUEST['update']))
{
    // Rationalize data received
    $aProcess = array();
    foreach ($_REQUEST['update'] as $aData)
    {
        $aProcess[$aData['id']][$aData['name']] = $aData['value'];
    }
    // Update each user
    foreach ($aProcess as $iId => $aValues)
    {
        $sQuery = 'UPDATE general_users SET ';
        foreach ($aValues as $sName => $sValue)
        {
            $sQuery .= $GLOBALS['DatabaseHandler']->real_escape_string($sName) . " = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue) . "', ";
        }
        // Remove last comma
        $sQuery = mb_substr($sQuery, 0, -2);
        $sQuery .= ' WHERE general_users_id = ' . ((int) $iId) . ' LIMIT 1';

        if ($GLOBALS['DatabaseHandler']->query($sQuery))
        {
            echo '<div class="shock-color">User ID ' . $iId . ' details updated.</div>';
        }
        else
        {
            echo '<div class="inverse-color">User ID ' . $iId . ' details update failed.</div>';
        }
    }
}

?>