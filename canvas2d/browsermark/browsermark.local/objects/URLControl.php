<?php

class URLControl
{
    public function __construct()
    {
        // Pre-requisites: version must be full version or user must be logged in to use url params
        if ($GLOBALS['FULL'] == true || $GLOBALS['LoginModel']->hasLoggedIn())
        {
            // Session destroy
            if (isset($_GET['destroy']))
            {
                session_destroy();
                session_start();
                $_SESSION['VERSION'] = $GLOBALS['VERSION'];
            }
            // Others
            $this->_setParams();
        }
    }

    private function _setParams()
    {
        // Continent
        if (isset($_GET['continent']))
        {
            $bFound = false;
            // First test approach that is used by corporate version
            if (isset($GLOBALS['CONTINENTS'][$_GET['continent']]))
            {
                $bFound = true;
                $_SESSION['continent'] = $GLOBALS['CONTINENTS'][$_GET['continent']];
            }
            // If not found, try to public version approach
            else if ($GLOBALS['DB'] == true)
            {
                $sServerName = $GLOBALS['DatabaseHandler']->real_escape_string(urldecode($_GET['continent']));
                $sQuery = "SELECT continent_server_id, server_name, server_url FROM continent_servers WHERE server_name LIKE '{$sServerName}'";
                $oContinent = $GLOBALS['DatabaseHandler']->query($sQuery);
                if ($oContinent->num_rows == 1)
                {
                    $bFound = true;
                    $aContinent = $oContinent->fetch_assoc();
                    $_SESSION['continent'] = ($aContinent['server_url'] == '') ? $GLOBALS['HOST'] : $aContinent['server_url'];
                    $_SESSION['continent_name'] = $aContinent['server_name'];
                    $_SESSION['continent_id'] = $aContinent['continent_server_id'];
                    $_SESSION['continent_warning'] = '';
                }
            }
            // if still not found, unset
            else if ($bFound == false)
            {
                unset($_SESSION['continent']);
                unset($_SESSION['continent_name']);
                unset($_SESSION['continent_id']);
                unset($_SESSION['continent_warning']);
            }
        }

        // Test / Group preselect
        if (isset($_GET['select']))
        {
            if (in_array($_GET['select'], $GLOBALS['TESTS']))
            {
                $_SESSION['test_only'] = $_GET['select'];
            }
        }

        // User agent fake
        if (isset($_GET['UA']) || isset($_SESSION['UserAgent']))
        {
            // Empty UA will remove this setting
            if (isset($_GET['UA']) && empty($_GET['UA']))
            {
                unset($_SESSION['UserAgent']);
            }
            else
            {
                $_SESSION['UserAgent'] = (isset($_GET['UA'])) ? urldecode($_GET['UA']) : $_SESSION['UserAgent'];
                //$this->userAgent = $_SESSION['UserAgent'];
            }
        }

    }
}