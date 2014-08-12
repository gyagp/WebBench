<?php

// Required rights
$aRequiredRights = array (
    "view"  => $GLOBALS['USER_LEVELS']['client'],
    "edit" => $GLOBALS['USER_LEVELS']['client'],
    "delete" => $GLOBALS['USER_LEVELS']['admin'],
);

// Only for logged in users who have enough rights to view
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $aRequiredRights['view'])
{
    header("Location: {$GLOBALS['HOST']}");
    exit;
}

// Get user last 20 personal benchmark results
print <<<DETAILS
                        <h1>Manage your account</h1>
                        <h2>Your latest benchmarks</h2>
                        <div id="latest-results" data-user-id="{$_SESSION['login']['id']}"></div>

DETAILS;

// If user update own details
$sErrors = '';
if (isset($_POST['firstname']))
{
    if (empty($_POST['firstname']))
    {
        $sErrors .= '<div class="inverse-color">First name cannot be empty</div>';
    }
    if (empty($_POST['lastname']))
    {
        $sErrors .= '<div class="inverse-color">Last name cannot be empty</div>';
    }
    if (empty($_POST['company']))
    {
        $sErrors .= '<div class="inverse-color">Company cannot be empty</div>';
    }
    if (empty($_POST['userpass']))
    {
        $sErrors .= '<div class="inverse-color">Every update requires your current password</div>';
    }
    if (!empty($_POST['new-password-1']))
    {
        if (mb_strlen($_POST['new-password-1']) < 6)
        {
            $sErrors .= '<div class="inverse-color">New password must be at least 6 characters long</div>';
        }
        if ($_POST['new-password-1'] != $_POST['new-password-2'])
        {
            $sErrors .= '<div class="inverse-color">New passwords mismatch</div>';
        }
    }
    // If no errors
    if ($sErrors == '')
    {
        // Default query start
        $sQuery = 'UPDATE general_users SET user_firstname = ?, user_lastname = ?, user_company = ?';
        // If password update
        $bPassUpdate = false;
        if (!empty($_POST['new-password-1']))
        {
            $sQuery .= ", user_pass = ?";
            $bPassUpdate = true;
        }
        $sQuery .= " WHERE general_users_id = ? AND user_pass = ? LIMIT 1";

        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $sOldPass = md5($GLOBALS['SALT'] . $_POST['userpass']);
            $sNewPass = md5($GLOBALS['SALT'] . $_POST['new-password-1']);
            if ($bPassUpdate)
            {
                $stmt->bind_param('ssssis', $_POST['firstname'], $_POST['lastname'], $_POST['company'], $sNewPass, $_SESSION['login']['id'], $sOldPass);
            }
            else
            {
                $stmt->bind_param('sssis', $_POST['firstname'], $_POST['lastname'], $_POST['company'], $_SESSION['login']['id'], $sOldPass);
            }
            $stmt->execute();
            if ($stmt->affected_rows == 1)
            {
                $sErrors = '<div class="shock-color">Details updated</div>';
            }
            else
            {
                $sErrors = '<div class="inverse-color">Something went wrong with details update (maybe wrong password?). Please try again</div>';
            }
        }
    }
}
// Get user information
$sQuery = "SELECT user_level, user_email, user_firstname, user_lastname, user_company FROM general_users WHERE general_users_id = " . (int) $_SESSION['login']['id'];
if ($oResult = $GLOBALS['DatabaseHandler']->query($sQuery))
{
    $aDetails = $oResult->fetch_assoc();
    // Get user level
    $sUserLevel = 'Unknown';
    foreach ($GLOBALS['USER_LEVELS'] as $sLevel => $iLevel)
    {
        if ($iLevel == $aDetails['user_level'])
        {
            $sUserLevel = mb_convert_case($sLevel, MB_CASE_TITLE);
            break;
        }
    }
    print <<<FORM
                        <h2>Your details</h2>
                        {$sErrors}
                        <form method="post">
                            <label>Username:</label>
                            {$aDetails['user_email']} ({$sUserLevel})
                            <br clear="all"><label>First name:</label>
                            <input type="text" name="firstname" value="{$aDetails['user_firstname']}">
                            <br clear="all"><label>Last name:</label>
                            <input type="text" name="lastname" value="{$aDetails['user_lastname']}">
                            <br clear="all"><label>Company:</label>
                            <input type="text" name="company" value="{$aDetails['user_company']}">
                            <p>Due security reasons every update requires your current password!</p>
                            <label>Password:</label>
                            <input type="password" name="userpass">
                            <p>If you do not wish to change your password, leave following fields empty</p>
                            <label>New password (min. 6 chars):</label>
                            <input type="password" name="new-password-1">
                            <br clear="all"><label>New password again:</label>
                            <input type="password" name="new-password-2">
                            <br clear="all"><br><input type="submit" value="Update details">
                        </form>
FORM;

}
?>
