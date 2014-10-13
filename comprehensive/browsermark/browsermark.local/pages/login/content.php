<?php

// If login request
$sError = '';
$sUserName = '';

// If user has already logged in
if ($GLOBALS['LoginModel']->hasLoggedIn())
{
    // Redirect to dashboard if no ?logout found
    if (isset($_REQUEST['logout']))
    {
        $GLOBALS['LoginModel']->logout();
    }
    else
    {
        header("Location: {$GLOBALS['HOST']}/dashboard");
        exit;
    }
}

// If user comes with key
if (isset($_REQUEST['key']))
{
    // If user submit new password
    if (isset($_POST['username']))
    {
        $sUserName = $_POST['username'];

        // Ensure password is long enough
        if (strlen($_POST['password-1']) < 6)
        {
            $sError = '<div class="inverse-color">Password has to be at least six (6) characters long</div>';
        }
        else if ($_POST['password-1'] != $_POST['password-2'])
        {
            $sError = '<div class="inverse-color">Passwords mismatch</div>';
        }
        else
        {
            // Try to change password
            $sPassHash = md5($GLOBALS['SALT'] . $_POST['password-1']);
            $sNewSecret = LoginModel::generateSalt(8);
            $sQuery = "UPDATE general_users SET approved = 1, secret_key = ?, user_pass = ? WHERE user_email = ? AND secret_key = ? AND deleted = 0 LIMIT 1";
            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $sOldKey = urldecode($_REQUEST['key']);
                $stmt->bind_param('ssss', $sNewSecret, $sPassHash, $_POST['username'], $sOldKey);
                $stmt->execute();
                if ($stmt->affected_rows == 1)
                {
                    // Redirect
                    header("Location: {$GLOBALS['HOST']}/login?password-changed");
                    exit;
                }
                else
                {
                    $sError = '<div class="inverse-color">Username or secret key do not match</div>';
                }
            }
        }
    }
    // Page has been redirected if everything went right so we output password change form here
    print <<<FORM
                        <form class="login_form" method="post" action="{$_SERVER['REQUEST_URI']}">
                            {$sError}
                            <div>
                                <label for="username">
                                    Username
                                </label>
                                <input type="text" name="username" value="{$sUserName}">
                            </div>
                            <div>
                                <label for="userpass">
                                    New password (at least 6 characters)
                                </label>
                                <input type="password" name="password-1">
                            </div>
                            <div>
                                <label for="userpass">
                                    New password again
                                </label>
                                <input type="password" name="password-2">
                            </div>
                            <div>
                                <input class="button" type="submit" value="Change password">
                            </div>
                        </form>

FORM;

}

// If user is requesting password reset
else if (isset($_REQUEST['password-reset']))
{
    // If username is given
    if (isset($_POST['username']))
    {
        $sUserName = $_POST['username'];

        // If username do not contain @ it means that it is general-purpose user account and password cannot be changed by user
        if (!mb_stristr($_POST['username'], '@'))
        {
            $sError = '<div class="inverse-color">General-purpose user accounts password cannot be changed. If you have forgotten your password, please contact <a href="mailto:browsermark@rightware.com">browsermark@rightware.com</a> to retrieve the password.</div>';
        }
        // Otherwise search database for username and send password change link there
        else
        {
            $sQuery = "SELECT user_email, user_firstname, secret_key FROM general_users WHERE user_email = ? AND deleted = 0 LIMIT 1";
            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $stmt->bind_param('s', $_POST['username']);
                $stmt->execute();
                $stmt->bind_result($sEmail, $sName, $sKey);
                if ($stmt->fetch())
                {
                    // Create email
                    $sSubject = "Browsermark password reset";
                    $sChangeLink = $GLOBALS['HOST'] . '/login?key=' . urlencode($sKey);
                    $sMessage = "Greetings {$sName},

Someone from IP {$_SERVER['REMOTE_ADDR']} has requested password reset for your user account.
To reset your password, please click link here {$sChangeLink}

If this request was not done by you, you can simply ignore this email and continue using your old password.

Best regards,
Browsermark Team

---
Please note that this email was sent from unmonitored email.";
                    mail($sEmail, $sSubject, $sMessage, "From: No Reply <no-reply@rightware.com>\r\nReply-To: Browsermark Team <browsermark@rightware.com>");
                    $sError = '<div class="shock-color">Password reset instructions was sent in your email. If you don\'t receive your email in next 30 minutes, please ensure that it was not placed under your mailbox spam before contacting Browsermark Team.</div>';
                }
                else
                {
                    // Username was not found
                    $sError = '<div class="inverse-color">Username was not found, please try again.</div>';
                }
            }
        }
    }
    // Output form
    print <<<FORM
                        <form class="login_form" method="post" action="{$_SERVER['REQUEST_URI']}">
                            {$sPassChanged}{$sError}
                            <div>
                                <label for="username">
                                    Username
                                </label>
                                <input type="text" name="username" value="{$sUserName}">
                            </div>
                            <div>
                                <input class="button" type="submit" value="Reset password">
                            </div>
                        </form>
FORM;

}
// Otherwise display login form
else
{
    if (isset($_POST['username']))
    {
        if (!$GLOBALS['LoginModel']->login($_POST['username'], $_POST['userpass']))
        {
            $sError = '<div class="inverse-color">Wrong username or password</div>';
            $sUserName = $_POST['username'];
        }
        else
        {
            // Redirect to dashboard
            header("Location: {$GLOBALS['HOST']}/dashboard");
            exit;
        }
    }

    $sPassChanged = (isset($_REQUEST['password-changed'])) ? '<div class="shock-color">Password changed succesfully. Please login to continue.</div>' : '';
    print <<<FORM
                        <form class="login_form" method="post" action="{$_SERVER['REQUEST_URI']}">
                            {$sPassChanged}{$sError}
                            <div>
                                <label for="username">
                                    Username
                                </label>
                                <input type="text" name="username" value="{$sUserName}">
                            </div>
                            <div>
                                <label for="userpass">
                                    Password
                                </label>
                                <input type="password" name="userpass">
                            </div>
                            <div>
                                <input class="button" type="submit" value="Login">
                                <br clear="all"><br><a href="/login?password-reset">Forgot your password?</a>
                            </div>
                        </form>
FORM;

}
?>