<?php
/**
 * Browsermark Installer class
 *
 * @version 2.0
 * @package Configuration
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

class Installer
{
    /**
     * Prerequisites check
     *
     * @param bool &bContinue which is true if continue allowed, otherwise false
     * @param bool &bDatabase which is true if database setup is possible, otherwise false
     * @return array Return array where key is message and value is true if check was ok and false if check failed
     **/
    public static function prerequisites(&$bContinue, &$bDatabase)
    {
        $bContinue = true;
        $bDatabase = true;
        $aMods = apache_get_modules();
        $aReturn = array();

        // PHP >= 5.2
        if (PHP_MAJOR_VERSION >= 5 && PHP_MINOR_VERSION >= 2)
        {
            $aReturn['PHP 5.2 or higher found'] = true;

        }
        else
        {
            $aReturn['Please update server PHP version to 5.2 or higher. Current PHP ' . PHP_VERSION . ' is too old for Browsermark ' . $GLOBALS['VERSION']] = false;
            $bContinue = false;
        }

        // mod_rewrite
        if (in_array('mod_rewrite', $aMods))
        {
            $aReturn['Apache mod_rewrite found'] = true;
        }
        else
        {
            $aReturn['Browsermark ' . $GLOBALS['VERSION'] . ' requires Apache mod_rewrite to function. Please enable module and run installer again'] = false;
            $bContinue = false;
        }

        // Locate browsermark_next_generation_schema.sql
        if (file_exists(dirname(__FILE__) . '/browsermark_schema.sql'))
        {
            $aReturn['Browsermark ' . $GLOBALS['VERSION'] . ' database schema found'] = true;
        }
        else
        {
            $aReturn['Browsermark ' . $GLOBALS['VERSION'] . ' database schema not found. Only session-based benchmarking is possible'] = false;
            $bDatabase = false;
        }

        // Check that configuration directory is writeable
        if (is_writable("{$GLOBALS['ROOT']}/configuration/"))
        {
            $aReturn['Configurations directory writable'] = true;
        }
        else
        {
            $aReturn['Configurations directory not accessible by script. Please ensure that www user have read-write access to <span class="shock-color">' . $GLOBALS['ROOT'] . '/configuration/</span>'] = false;
            $bContinue = false;
        }

        // Ensure that production.php do not exist
        if (!file_exists("{$GLOBALS['ROOT']}/configuration/production.php"))
        {
            $aReturn['First time configuration detected'] = true;
        }
        else
        {
            $aReturn['Configuration file <span class="shock-color">' . $GLOBALS['ROOT'] . '/configuration/production.php</span> exists. This install script can handle only first time installations and cannot be used to modify configuration settings.'] = false;
            $bContinue = false;
        }

        return $aReturn;

    }

    /**
     * Method for converting checks to string
     *
     * @param string sKey key from array
     * @param string sValue value from array
     * @return string HTML-formatted string where key is text and value has defined check-mark
     **/
    public static function checksToString($sKey, $bValue)
    {
        if ($bValue == true)
        {
            return '            <strong class="shock-color">✓</strong> ' . $sKey . '<br>' . "\n";
        }
        else
        {
            return '            <strong class="inverse-color">✗</strong> ' . $sKey . '<br>' . "\n";
        }
    }

    /**
     * Installer form default / posted values
     *
     * @return array Array used for method Installer::form()
     **/
    public static function formValues()
    {
        // Default / post values
        $aValues = array(
            'mode_1' => (!isset($_POST['mode']) || $_POST['mode'] == 1 ? ' checked="checked"' : ''),
            'mode_0' => (isset($_POST['mode']) && $_POST['mode'] == 0 ? ' checked="checked"' : ''),
            'debug_1' => (isset($_POST['debug']) && $_POST['debug'] == 1 ? ' checked="checked"' : ''),
            'debug_0' => (!isset($_POST['debug']) || $_POST['debug'] == 0 ? ' checked="checked"' : ''),
            'salt' => (isset($_POST['salt']) ? $_POST['salt'] : ''),
            'timezone' => (isset($_POST['timezone']) ? $_POST['timezone'] : ''),
            'http_host' => (isset($_POST['http_host']) ? $_POST['http_host'] : $GLOBALS['HOST']),
            'use_db_1' => (!isset($_POST['use_db']) || $_POST['use_db'] == 1 ? ' checked="checked"' : ''),
            'use_db_0' => (isset($_POST['use_db']) && $_POST['use_db'] == 0 ? ' checked="checked"' : ''),
            'db_host' => (isset($_POST['db_host']) ? $_POST['db_host'] : ''),
            'db_port' => (isset($_POST['db_port']) ? $_POST['db_port'] : 3306),
            'db_name' => (isset($_POST['db_name']) ? $_POST['db_name'] : ''),
            'db_user' => (isset($_POST['db_user']) ? $_POST['db_user'] : ''),
            'db_pass' => (isset($_POST['db_pass']) ? $_POST['db_pass'] : ''),
            'admin_name' => (isset($_POST['admin_name']) ? $_POST['admin_name'] : 'admin'),
            'admin_pass' => (isset($_POST['admin_pass']) ? $_POST['admin_pass'] : 'password'),
        );

        return $aValues;
    }

    public static function saveConfiguration($aValues)
    {
         $aReturn = array();
        $bFail = false;

        // Salt generation (if necessary) && replace ' and \ with \' and \\
        $aValues['salt'] = (empty($aValues['salt']) ? Installer::generateSalt(16) : $aValues['salt']);
        $aValues['salt'] = str_replace(array("'", "\\"), array("\\'", "\\\\"), $aValues['salt']);

        // If no timezone set, use GMT
        $aValus['timezone'] = (empty($aValues['timezone'])) ? 'GMT' : $aValues['timezone'];

        // Start to create production.php configuration file
        $sStart = '<';
        $sEnd = '>';
        $sFile = "{$sStart}?php
/**
 * Production settings
 *
 * This file is overwritten if {$GLOBALS['ROOT']}/configuration/ contains development.php or test.php.
 *
 * @version {$GLOBALS['VERSION']}
 * @package Configuration
 **/\n\n";

         $sFile .= '$GLOBALS[\'FULL\'] = ' . ($aValues['mode'] == 1 ? 'true;' : 'false;') . "\n";
         $sFile .= '$GLOBALS[\'DEBUG\'] = ' . ($aValues['debug'] == 1 ? 'true;' : 'false;') . "\n";
         $sFile .= '$GLOBALS[\'DB\'] = ' . ($aValues['use_db'] == 1 ? 'true;' : 'false;') . "\n";
         $sFile .= "// Please note that changing salt will cause that every login will fail since salt is used as part of password hash\n";
         $sFile .= '$GLOBALS[\'SALT\'] = \'' . $aValues['salt'] . "';\n";
        $sFile .= '$GLOBALS[\'TIMEZONE\'] = \'' . $aValues['timezone'] . "';\n";
         $sFile .= '$GLOBALS[\'HOST\'] = \'' . $aValues['http_host'] . "';\n";
         if ($aValues['use_db'] == 1)
         {
             $sFile .= '$GLOBALS[\'DB_HOST\'] = \'' . $aValues['db_host'] . "';\n";
             $sFile .= '$GLOBALS[\'DB_PORT\'] = ' . (empty($aValues['db_port']) ? 'null' : (int) $aValues['db_port']) . ";\n";
             $sFile .= '$GLOBALS[\'DB_NAME\'] = \'' . $aValues['db_name'] . "';\n";
             $sFile .= '$GLOBALS[\'DB_USER\'] = \'' . $aValues['db_user'] . "';\n";
             $sFile .= '$GLOBALS[\'DB_PASS\'] = ' . (empty($aValues['db_pass']) ? 'null;' : "'{$aValues['db_pass']}';") . "\n";

             // Create new mysqli object
             $oMysqli = new mysqli($aValues['db_host'], $aValues['db_user'], $aValues['db_pass'], $aValues['db_name'], $aValues['db_port']);
             if ($oMysqli->connect_error)
             {
                 $aReturn["Unable to connect MySQL database, reason: {$oMysqli->connect_error}"] = false;
             }
             else
             {
                 if ($oMysqli->select_db($aValues['db_name']))
                 {
                     // Get schema
                     $sSchema = file_get_contents(dirname(__FILE__) . '/browsermark_schema.sql');
                     $bErrors = false;
                     if ($oMysqli->multi_query($sSchema))
                     {
                         do {
                             if ($oMysqli->error)
                             {
                                 $aReturn["MySQL error: {$oMysqli->error}"] = false;
                                 $bErrors = true;
                                 $bFail = true;
                             }
                         } while ($oMysqli->more_results() && $oMysqli->next_result());
                         if ($bErrors == false)
                         {
                             $aReturn['All MySQL queries ran successfully'] = true;
                         }
                     }
                 }
                 else
                 {
                     $aReturn["MySQL was unable to select database {$values['db_name']}"] = false;
                     $bFail = true;
                 }
             }
         }
         $sFile .= '$GLOBALS[\'ADMIN_NAME\'] = \'' . $aValues['admin_name'] . "';\n";
         // Admin pass is salted and md5'ed
         $sFile .= "// Forgot your password? You can generate new password by using some MD5 generator and get hash from <salt><password>\n";
         $sFile .= "// Example: md5('{$aValues['salt']}NewAdminPassword');\n";
         $sFile .= '$GLOBALS[\'ADMIN_PASS\'] = \'' . md5($aValues['salt'] . $aValues['admin_pass']) . "';\n\n?{$sEnd}";

         // Try to write file named production
         if (file_put_contents("{$GLOBALS['ROOT']}/configuration/production.php", $sFile))
         {
             // Chmod file to allow group write
             chmod("{$GLOBALS['ROOT']}/configuration/production.php", 0664);
             $aReturn["File <span class=\"shock-color\">{$GLOBALS['ROOT']}/configuration/production.php</span> created"] = true;
         }
         else
         {
             $aReturn["Install script was unable to create file <span class=\"shock-color\">{$GLOBALS['ROOT']}/configuration/production.php</span>"] = false;
             $bFail = true;
         }

         if ($bFail == false)
         {
             $aReturn["All tasks done. You can now delete <span class=\"shock-color\">{$GLOBALS['ROOT']}/install/</span> to prevent accidental configuration changes"] = true;
         }
         else
         {
             $aReturn["There were some errors and Browsermark might malfunction. If you wish to try again, please delete <span class=\"shock-color\">{$GLOBALS['ROOT']}/configuration/production.php</span> and try again"] = false;
         }
         return $aReturn;
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