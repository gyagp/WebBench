<?php

if (isset($_POST['continent']))
{
    $sQuery = "SELECT continent_server_id, server_name, server_url FROM continent_servers WHERE continent_server_id = " . ((int) $_POST['continent']);
    $oContinent = $GLOBALS['DatabaseHandler']->query($sQuery);
    if ($oContinent->num_rows == 1)
    {
        $aContinent = $oContinent->fetch_assoc();
        $_SESSION['continent'] = ($aContinent['server_url'] == '') ? $GLOBALS['HOST'] : $aContinent['server_url'];
        $_SESSION['continent_name'] = $aContinent['server_name'];
        $_SESSION['continent_id'] = $aContinent['continent_server_id'];
        $_SESSION['continent_warning'] = '';
    }
    // Alternative method
    else if (isset($GLOBALS['CONTINENTS'][$_POST['continent']]))
    {
        $_SESSION['continent'] = ($GLOBALS['CONTINENTS'][$_POST['continent']] == '') ? $GLOBALS['HOST'] : $GLOBALS['CONTINENTS'][$_POST['continent']];
        $_SESSION['continent_name'] = $_POST['continent'];
        $_SESSION['continent_id'] = 0;
        $_SESSION['continent_warning'] = '';
    }
    else
    {
        unset($_SESSION['continent']);
        unset($_SESSION['continent_name']);
        unset($_SESSION['continent_id']);
        unset($_SESSION['continent_warning']);
    }
}

?>