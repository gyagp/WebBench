<?php
$iTime = microtime(true);

session_cache_limiter('nocache');
header('Access-Control-Allow-Origin: *');

// Get request bytes count
$iBytes = 0;
foreach ($_REQUEST as $sKey => $sValue)
{
    $iBytes += strlen($sKey);
    $iBytes += strlen($sValue);
    // Each request have punctuation colon, space, newline and carriage return so add +4
    $iBytes += 4;
}

echo json_encode(array('time' => $iTime, 'bytes' => $iBytes));

?>