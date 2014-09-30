<?php

require_once(dirname(__FILE__) . '/../../configuration.php');

if (isset($_POST['values']))
{
    // Save values
    $_SESSION['network'] = $_POST['values'];
}
else
{
    $aJSON = array(
        "ip" => $_SERVER['REMOTE_ADDR'],
        "isp" => "Unknown",
        "country_code" => "",
        "interface" => "",
        "ping" => 0,
        "download" => 0,
        "lowest" => 0,
        "highest" => 0,
        "upload" => 0,
        "variance" => 0,
    );

    // If continent was forced
    if ($_POST['continent'] > 0 && $_SESSION['continent_id'] != $_POST['continent'])
    {
        $_SESSION['continent_id'] = (int) $_POST['continent'];
        $_SESSION['continent_warning'] = '<span class="inverse-color">Due to limitations of cross-origin resource sharing, browser network test was executed against Rightware\'s North America server.</span><br>';
    }

    // If network details not set
    if (!isset($_SESSION['NETWORK_DETAILS']))
    {
        // Resolve ISP
        $iLongIP = Dot2LongIP($aJSON['ip']);

        $sQuery = "SELECT isp_name, country_code FROM ip_country WHERE ip_from <= {$iLongIP} AND ip_to >= {$iLongIP} LIMIT 1";
        if ($oResult = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            $aResult = $oResult->fetch_assoc();
            $_SESSION['NETWORK_DETAILS'] = $aResult;
        }
    }

    $aJSON['isp'] = mb_convert_case($_SESSION['NETWORK_DETAILS']['isp_name'], MB_CASE_TITLE) . " ({$_SESSION['NETWORK_DETAILS']['country_code']})";
    $aJSON['country_code'] = $_SESSION['NETWORK_DETAILS']['country_code'];

    // get ping, upload and download from request
    $aPing = isset($_REQUEST['pings']) ? $_REQUEST['pings'] : array();
    $aUpload = isset($_REQUEST['uploads']) ? $_REQUEST['uploads'] : array();
    $aDownload = isset($_REQUEST['downloads']) ? $_REQUEST['downloads'] : array();

    $aJSON['ping'] = array_sum($aPing) / count($aPing);
    $aJSON['upload'] = array_sum($aUpload) / count($aUpload);
    $aJSON['download'] = array_sum($aDownload) / count($aDownload);
    // Sort downloads to get variance
    sort($aDownload, SORT_NUMERIC);
    $aJSON['lowest'] = $aDownload[0];
    $aJSON['highest'] = $aDownload[count($aDownload)-1];
    $aJSON['variance'] = 100 * ($aJSON['highest'] - $aJSON['lowest']) / $aJSON['highest'];

    // If tested device is tablet or phone, try to determine interface
    if ($GLOBALS['BrowserDetect']->category == 'Tablet' || $GLOBALS['BrowserDetect']->category == 'Phone')
    {
        // Estimates from http://en.wikipedia.org/wiki/List_of_device_bandwidths#Mobile_telephone_interfaces
        $aInterface = array(
            '2G' => 14.4,
            'GPRS' => 57.6,
            'EDGE' => 236.8,
            '3G' => 384,
            'EDGE2' => 1896,
            'HSDPA/HSUPA' => 13648,
            'HSDPA+' => 43008,
            '4G' => 102400,
            'LTE 2x2 MIMO' => 177152,
            'LTE 4x4 MIMO' => 333824,
        );

        foreach ($aInterface as $sName => $fKbit)
        {
            if ($aJSON['download'] < $fKbit)
            {
                $aJSON['interface'] = $sName;
                break;
            }
        }
    }

    echo json_encode($aJSON);
}

?>