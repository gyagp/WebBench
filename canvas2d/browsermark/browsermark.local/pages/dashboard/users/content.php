<?php

// Required rights
$aRequiredRights = array (
    "view"  => $GLOBALS['USER_LEVELS']['admin'],
    "edit" => $GLOBALS['USER_LEVELS']['admin'],
    "delete" => $GLOBALS['USER_LEVELS']['admin'],
);

// Only for logged in users who have enough rights to view
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $aRequiredRights['view'])
{
    header("Location: {$GLOBALS['HOST']}");
    exit;
}

$aFormValues = (isset($_POST['email'])) ? $_POST : array(
    'email' => null,
    'firstname' => null,
    'lastname' => null,
    'company' => null,
    'approved' => 0,
);

$sApproveChecked = ($aFormValues['approved'] == 1) ? ' checked' : '';

print <<<EOT
                        <h1>Manage users</h1>

<form method="post">
<input type="hidden" name="approved" value="0">
<h2>Create user</h2>
<label for="email">User email:</label>
<input type="text" name="email" value="{$aFormValues['email']}">
<label for="password-1">Password:</label>
<input type="password" name="password-1">
<label for="password-2">Password again:</label>
<input type="password" name="password-2">
<br>
<label for="firstname">First name:</label>
<input type="text" name="firstname" value="{$aFormValues['firstname']}">
<label for="lastname">Last name:</label>
<input type="text" name="lastname" value="{$aFormValues['lastname']}">
<label for="company">Company:</label>
<input type="text" name="company" value="{$aFormValues['company']}">
<br>
<label for="user_level"l>User level:</label>
<select name="user_level">
    <option value="{$GLOBALS['USER_LEVELS']['visitor']}">Visitor</option>
    <option value="{$GLOBALS['USER_LEVELS']['client']}">Client</option>
    <option value="{$GLOBALS['USER_LEVELS']['admin']}">Admin (only for @rightware.com emails)</option>
</select>
<label for="approved"><input type="checkbox" name="approved" value="1"{$sApproveChecked}>Approved</label>
<input type="submit" value="Create new user">
</form>

EOT;

if (isset($_POST['email']) && isset($_POST['password-1']))
{
    $oResult = $GLOBALS['DatabaseHandler']->query('SELECT general_users_id FROM general_users WHERE user_email LIKE "' . $GLOBALS['DatabaseHandler']->real_escape_string($_POST['email']) . '" AND deleted = 0 LIMIT 1');

    $bErrors = false;

    // Ensure username is not taken
    if ($oResult->num_rows == 1)
    {
        echo '<p><strong class="inverse-color">✗</strong> User ' . $_POST['email'] . ' already exist</p>';
        $bErrors = true;
    }

    // Ensure passwords do not mismatch
    if ($_POST['password-1'] != $_POST['password-2'])
    {
        echo '<p><strong class="inverse-color">✗</strong> Passwords mismatch</p>';
        $bErrors = true;
    }

    // Only for public version: ensure that admin rights are given for @rightware.com emails
    if ($_POST['user_level'] == $GLOBALS['USER_LEVELS']['admin'] && !mb_stristr($_POST['email'], '@rightware.com'))
    {
        echo '<p><strong class="inverse-color">✗</strong> Admin rights can be granted only for Rightware employees</p>';
        $bErrors = true;
    }

    // If no errors, save user
    if ($bErrors === false)
    {
        $sQuery = "INSERT INTO general_users SET approved = ?, user_level = ?, secret_key = ?, user_email = ?, user_pass = ?, user_firstname = ?, user_lastname = ?, user_company = ? ON DUPLICATE KEY
                UPDATE deleted = 0, approved = ?, user_level = ?, secret_key = ?, user_email = ?, user_pass = ?, user_firstname = ?, user_lastname = ?, user_company = ?";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $sPassHash = md5($GLOBALS['SALT'] . $_POST['password-1']);
            $sSecretKey = LoginModel::generateSalt(8);
            $stmt->bind_param('iissssssiissssss', $_POST['approved'], $_POST['user_level'], $sSecretKey, $_POST['email'], $sPassHash, $_POST['firstname'], $_POST['lastname'], $_POST['company'],
                    $_POST['approved'], $_POST['user_level'], $sSecretKey, $_POST['email'], $sPassHash, $_POST['firstname'], $_POST['lastname'], $_POST['company']);

            if ($stmt->execute())
            {
                // Automatically approved accounts do not receive mail
                if ($_POST['approved'] == 1)
                {
                    // Send email to creator
                    $sSubject = "Browsermark user account for {$_POST['email']} created";
                    $sMessage = "New user account details:

Login URL: {$GLOBALS['HOST']}/login
Username: {$_POST['email']}
Password: {$_POST['password-1']}

Best regards,
Browsermark Team

---
Please note that this email was sent from unmonitored email.";

                    // Send email
                    mail($_SESSION['login']['email'], $sSubject, $sMessage, "From: No Reply <no-reply@rightware.com>\r\nReply-To: Browsermark Team <browsermark@rightware.com>");
                    echo "<p>User {$_POST['email']} with password {$_POST['password-1']} created and details mailed to you.</p>";
                }
                else
                {
                    // Create email
                    $sSubject = "Browsermark user account";
                    $sApproveLink = $GLOBALS['HOST'] . '/login?key=' . urlencode($sSecretKey);
                    $sMessage = "Greetings {$_POST['firstname']},

Your Browsermark credentials are created now, and after confirmation, you can login to our database for more detailed results.
To confirm your user account, please click link here {$sApproveLink}

After confirmation, use your email address as username and type password of your choosing (and confirm the password). After this, you are free to use Browsermark's full version.

Best regards,
Browsermark Team

---
Please note that this email was sent from unmonitored email.";
                    mail($_POST['email'], $sSubject, $sMessage, "From: No Reply <no-reply@rightware.com>\r\nReply-To: Browsermark Team <browsermark@rightware.com>");
                    echo "<p>User {$_POST['email']} notified about new user account via email.</p>";
                }
            }
        }

    }
}

// List created user accounts
$sQuery = "SELECT general_users_id, deleted, approved, user_level, user_email, user_firstname, user_lastname, user_company FROM general_users WHERE deleted = 0 ORDER BY user_lastname ASC, user_firstname ASC";
if ($oResult = $GLOBALS['DatabaseHandler']->query($sQuery))
{
    print <<<TABLE_START

<h2>List of users</h2>
<table border="0" id="list-users">
    <tr>
        <th>ID</th>
        <th>Delete</th>
        <th>Approved</th>
        <th>Level</th>
        <th>Username</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Company</th>
    </tr>

TABLE_START;

    while ($aRow = $oResult->fetch_assoc())
    {
        $sApprovedChecked = ($aRow['approved'] == 1) ? ' checked' : '';
        // Dropdown
        $sDropdown = '<select name="user_level">';
        foreach ($GLOBALS['USER_LEVELS'] as $sName => $iLevel)
        {
            // Skip master
            if ($sName != 'master')
            {
                $sSelected = ($iLevel == $aRow['user_level']) ? ' selected' : '';
                $sDisabled = '';
                if ($sName == 'admin' && !mb_stristr($aRow['user_email'], '@rightware.com'))
                {
                    $sDisabled = ' disabled';
                }
                else if ($sName != 'visitor' && !mb_stristr($aRow['user_email'], '@'))
                {
                    $sDisabled = ' disabled';
                }
                $sName = mb_convert_case($sName, MB_CASE_TITLE);
                $sDropdown .= "<option value=\"{$iLevel}\"{$sSelected}{$sDisabled}>{$sName}</option>";
            }
        }
        print <<<ROW
    <tr data-id="{$aRow['general_users_id']}">
        <td>{$aRow['general_users_id']}</td>
        <td><input type="checkbox" name="deleted" value="1" data-has-changed="0"></td>
        <td><input type="checkbox" name="approved" value="1"{$sApprovedChecked} data-has-changed="0"></td>
        <td>{$sDropdown}</td>
        <td><input type="text" name="user_email" value="{$aRow['user_email']}" data-has-changed="0"></td>
        <td><input type="text" name="user_firstname" value="{$aRow['user_firstname']}" data-has-changed="0"></td>
        <td><input type="text" name="user_lastname" value="{$aRow['user_lastname']}" data-has-changed="0"></td>
        <td><input type="text" name="user_company" value="{$aRow['user_company']}" data-has-changed="0"></td>
    </tr>

ROW;

    }

    print <<<TABLE_END
</table>
<input type="submit" id="change-users-detail" value="Update user(s)">
<div id="users-update-result"></div>

TABLE_END;

}
?>
