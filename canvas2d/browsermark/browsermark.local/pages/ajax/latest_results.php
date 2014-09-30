<?php

// Only for logged in users who have client rights or bigger
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $GLOBALS['USER_LEVELS']['client'])
{
    echo json_encode(array());
    exit;
}

// Continue

// Get last 20 results
$sWhere = (isset($_REQUEST['user_id'])) ? ' AND result_summaries.general_user_id = ' . (int) $_REQUEST['user_id'] : '';

$sQuery = "SELECT
        result_summaries.result_summary_id, result_summaries.general_category_id, result_summaries.summary_time, result_summaries.overall_score,
        general_categories.category_name,
        browser_info.browser_name, browser_info.browser_major_version, browser_info.browser_minor_version,
        os_info.os_name, os_info.os_major_version, os_info.os_minor_version,
        result_meta.detected_name
        FROM result_summaries
        LEFT JOIN general_categories ON (general_categories.general_category_id = result_summaries.general_category_id)
        LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
        LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)
        LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
        WHERE 1{$sWhere}
        ORDER BY result_summaries.summary_time DESC LIMIT 20";

$oLatest = $GLOBALS['DatabaseHandler']->query($sQuery);

$aReturn = array();
while ($aRes = $oLatest->fetch_assoc())
{
    $sBrowser = $aRes['browser_name'] . ' ' . $aRes['browser_major_version'] . '.' . $aRes['browser_minor_version'];
    $sOS = $aRes['os_name']; // . ' ' . $aRes['os_major_version'] . '.' . $aRes['os_minor_version'];
    $sSystem = ($aRes['general_category_id'] >= 3) ? $aRes['detected_name'] : $sOS;
    $iTime = strtotime($aRes['summary_time']);
    $aContent = array(
        'result_summary_id' => $aRes['result_summary_id'],
        'summary_time' => $aRes['summary_time'],
        'overall_score' => $aRes['overall_score'],
        'timestamp' => $iTime,
        'category' => $aRes['category_name'],
        'browser' => $sBrowser,
        'system' => $sSystem,
    );
    $aReturn[] = $aContent;
}

echo json_encode($aReturn);

?>
