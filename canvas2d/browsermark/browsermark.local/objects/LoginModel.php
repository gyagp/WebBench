<?php

/**
 * Login Model
 *
 * Handle user login and logout and set user rights
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * Login Model class
 * @package Browsermark
 */
class LoginModel
{
    /**
     * @public bool LoggedIn tells if user has logged in or not
     */
    var $LoggedIn = false;

    /**
     * Constructor
     *
     * Initialize session if needed and control LoggedIn parameter
     */
    public function __construct()
    {
        if (!isset($_SESSION['login']))
        {
            $_SESSION['login'] = array();
        }
        if (isset($_SESSION['login']['id']))
        {
            $this->LoggedIn = true;
        }
    }

    /**
     * @return bool $LoginModel->LoggedIn
     */
    public function hasLoggedIn()
    {
        return $this->LoggedIn;
    }

    /**
     * Handle user login request
     *
     * @param $sUserName user name
     * @param $sUserPass password
     * @return bool true if login was succesful, otherwise false
     */
    public function login($sUserName, $sUserPass)
    {
        // Salt password and create hash
        $sHash = md5($GLOBALS['SALT'] . $sUserPass);

        // First check if this match to site admin details
        if ($sUserName == $GLOBALS['ADMIN_NAME'] && $sHash == $GLOBALS['ADMIN_PASS'])
        {
            // True, set user details
            $_SESSION['login']['id'] = 0;
            $_SESSION['login']['email'] = '';
            $_SESSION['login']['display_name'] = 'Administrator';
            $_SESSION['login']['rights'] = $GLOBALS['USER_LEVELS']['master'];
            $this->LoggedIn = true;
            return true;
        }
        else
        {
            // Check from database
            $sQuery = "SELECT general_users_id, CONCAT(user_firstname, ' ', user_lastname) AS user_name, user_level, user_email FROM general_users WHERE user_email = ? AND user_pass = ? AND deleted = 0 AND approved = 1";
            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $stmt->bind_param('ss', $sUserName, $sHash);
                $stmt->execute();
                $stmt->bind_result($iId, $sName, $iLevel, $sEmail);
                if ($stmt->fetch())
                {
                    $stmt->close();

                    // Update user secret key
                    $sKey = $GLOBALS['DatabaseHandler']->real_escape_string(self::generateSalt(8));

                    $_SESSION['login']['id'] = $iId;
                    $_SESSION['login']['email'] = $sEmail;
                    $_SESSION['login']['display_name'] = $sName;
                    $_SESSION['login']['rights'] = $iLevel;
                    $this->LoggedIn = true;

                    return true;
                }
            }
        }
        return false;
    }

    public function changePassword($sUsername, $sPassword, $sKey)
    {

    }

    /**
     * Logout user and redirect to main page
     */
    public function logout()
    {
        unset($_SESSION['login']);
        header("Location: {$GLOBALS['HOST']}");
        exit;
    }

    public static function generateSalt($iLength)
    {
        $sUseChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?#&()=-_.:,;+';
        $iMax = mb_strlen($sUseChars) - 1;
        $sGeneratedSalt = '';
        while (mb_strlen($sGeneratedSalt) < $iLength)
        {
            $iRand = rand(0, $iMax);
            $sGeneratedSalt .= mb_substr($sUseChars, $iRand, 1);
        }

        return $sGeneratedSalt;
    }

}

?>