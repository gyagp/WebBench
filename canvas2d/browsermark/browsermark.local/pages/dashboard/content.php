<?php

// Required rights
$aRequiredRights = array (
    "view"  => $GLOBALS['USER_LEVELS']['client'],
    "edit" => $GLOBALS['USER_LEVELS']['client'],
    "delete" => $GLOBALS['USER_LEVELS']['client'],
);

// Only for logged in users who have enough rights to view
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $aRequiredRights['view'])
{
    header("Location: {$GLOBALS['HOST']}");
    exit;
}

// Get database size
$sSize = "";
if ($_SESSION['login']['rights'] >= $GLOBALS['USER_LEVELS']['admin'])
{
    $oSize = $GLOBALS['DatabaseHandler']->query('SHOW TABLE STATUS');
    $iSize = 0;
    while ($aRow = $oSize->fetch_assoc())
    {
        $iSize += $aRow['Data_length'] + $aRow['Index_length'];
    }
    $iSize = round(($iSize / 1024 / 1024), 2);
    $sSize = " Currently database size is {$iSize} MB.";
}

// Get some statistics
$oStatistics = $GLOBALS['DatabaseHandler']->query("SELECT COUNT(result_summaries.result_summary_id) AS all_rows, SUM(result_meta.valid) AS valid_rows, SUM(result_summaries.deleted) AS deleted_rows FROM result_summaries LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)");

$aStats = $oStatistics->fetch_assoc();
$fValidPercentage = round(100 - (100 * ($aStats['all_rows'] - $aStats['valid_rows']) / $aStats['all_rows']), 2);
$fDeletedPercentage = round(100 - (100 * ($aStats['all_rows'] - $aStats['deleted_rows']) / $aStats['all_rows']), 2);

print <<<DASHBOARD
                        <h1>Dashboard</h1>
                        <p>Welcome {$_SESSION['login']['display_name']}.{$sSize}</p>

                        <h2>Latest results</h2>
                        <div id="latest-results"></div>

                        <div style="text-align: center; border: 1px solid #fff; border-width: 1px 0 1px 0">
                            <div class="column onethird">
                                <h2>Test runs
                                    <br />{$aStats['all_rows']} pcs</h2>
                            </div>
                            <div class="column onethird">
                                <h2>Valid test runs
                                    <br />{$aStats['valid_rows']} pcs ({$fValidPercentage}%)</h2>
                            </div>
                            <div class="column onethird">
                                <h2>Removed test runs
                                    <br />{$aStats['deleted_rows']} pcs ({$fDeletedPercentage}%)</h2>
                            </div>
                            <br clear="all"><br>
                        </div>

                        <!--h2>Graphs</h2>
                        <div class="tab selectedtab" id="tab-1">
                            Desktop browsers
                        </div>
                        <div class="tab" id="tab-2">
                            Tablet browsers
                        </div>
                        <div class="tab" id="tab-3">
                            Phone browsers
                        </div>
                        <div class="tabcontent tab-1">
                            <table class="visualize">
                                <caption>Desktop browsers score trends per {$GLOBALS['STATISTICS_RATE']}</caption>
                                <thead>
                                    <tr>
                                        <td>{$GLOBALS['STATISTICS_RATE']}</td-->

DASHBOARD;

/* Disabled temporarily
// Get distinct browsers
$oBrowsers = $GLOBALS['DatabaseHandler']->query("SELECT browser_info.browser_name, COUNT(result_summaries.result_summary_id) AS cnt, result_summaries.general_category_id
        FROM result_summaries
        LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
        WHERE browser_info.browser_info_id > 1 AND browser_info.browser_name NOT LIKE 'Unknown'
        GROUP BY browser_info.browser_name, result_summaries.general_category_id ORDER BY cnt DESC, browser_name ASC");
// Sort browsers
$aDBrowsers = array();
$aTBrowsers = array();
$aPBrowsers = array();
$aCount = array();
while ($aBrowser = $oBrowsers->fetch_assoc())
{
    $aCount[$aBrowser['browser_name']][$aBrowser['general_category_id']] = $aBrowser['cnt'];
    // Phone?
    if ($aBrowser['general_category_id'] == 4)
    {
        $aPBrowsers[] = $aBrowser['browser_name'];
    }
    // Tablet?
    else if ($aBrowser['general_category_id'] == 3)
    {
        $aTBrowsers[] = $aBrowser['browser_name'];
    }
    // Desktop?
    else if ($aBrowser['general_category_id'] == 2)
    {
        $aDBrowsers[] = $aBrowser['browser_name'];
    }
}

// Generate stats content
$aTimeGroups = array();
$aDResults = array();
$aTResults = array();
$aPResults = array();

// Get every timescale average score for every browser from every category
$oBrowserResults = $GLOBALS['DatabaseHandler']->query("
SELECT DATE_FORMAT(result_summaries.summary_time, '{$GLOBALS['STATISTICS_KEY']}') AS time_group, AVG(result_summaries.overall_score) AS avg_score, browser_info.browser_name, result_summaries.general_category_id
FROM result_summaries LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
WHERE result_summaries.deleted = 0 AND result_summaries.general_category_id > 1 AND summary_time > NOW() - INTERVAL 12 {$GLOBALS['STATISTICS_RATE']}
GROUP BY time_group, result_summaries.general_category_id, browser_info.browser_name ORDER BY time_group, result_summaries.general_category_id, browser_info.browser_name ASC
");

// var_dump($oBrowserResults);
while ($aBrowserResult = $oBrowserResults->fetch_assoc())
{
    if (!in_array($aBrowserResult['time_group'], $aTimeGroups))
    {
        $aTimeGroups[] = $aBrowserResult['time_group'];
    }

    switch ($aBrowserResult['general_category_id'])
    {
        case 2:
            // Add to desktop results
            $aDResults[$aBrowserResult['browser_name']][$aBrowserResult['time_group']] = $aBrowserResult['avg_score'];
            break;
        case 3:
            // Add to tablet results
            $aTResults[$aBrowserResult['browser_name']][$aBrowserResult['time_group']] = $aBrowserResult['avg_score'];
            break;
        case 4:
            // Add to phone results
            $aPResults[$aBrowserResult['browser_name']][$aBrowserResult['time_group']] = $aBrowserResult['avg_score'];
            break;
    }
}

// Print scopes
foreach ($aTimeGroups as $sTime)
{
    echo "                                      <th scope=\"col\">{$sTime}</th>\n";
}

print <<<DASHBOARD
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

DASHBOARD;

// Print desktop browsers
foreach ($aDBrowsers as $sBrowser)
{
    echo "                                      <th scope=\"row\">{$sBrowser} ({$aCount[$sBrowser][2]})</th>\n";
    // Loop through timegroups
    foreach ($aTimeGroups as $sTime)
    {
        $sScore = (isset($aDResults[$sBrowser][$sTime])) ? round($aDResults[$sBrowser][$sTime], -1) : 0;
        echo "                                      <td>{$sScore}</td>\n";
    }
    echo "                                 </tr>\n";
}

print <<<DASHBOARD
                                </tbody>
                            </table>
                        </div>
                        <div class="tabcontent tab-2">
                            <table class="visualize">
                                <caption>Tablet browsers score trends per {$GLOBALS['STATISTICS_RATE']}</caption>
                                <thead>
                                    <tr>
                                        <td>{$GLOBALS['STATISTICS_RATE']}</td>

DASHBOARD;

// Print scopes
foreach ($aTimeGroups as $sTime)
{
    echo "                                     <th scope=\"col\">{$sTime}</th>\n";
}

print <<<DASHBOARD
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

DASHBOARD;

// Print tablet browsers
foreach ($aTBrowsers as $sBrowser)
{
    echo "                                      <th scope=\"row\">{$sBrowser} ({$aCount[$sBrowser][3]})</th>\n";
    // Loop through timegroups
    foreach ($aTimeGroups as $sTime)
    {
        $sScore = (isset($aTResults[$sBrowser][$sTime])) ? round($aTResults[$sBrowser][$sTime], -1) : 0;
        echo "                                      <td>{$sScore}</td>\n";
    }
    echo "                                  </tr>\n";
}

print <<<DASHBOARD
                                </tbody>
                            </table>
                        </div>
                        <div class="tabcontent tab-3">
                            <table class="visualize">
                                <caption>Phone browsers score trends per {$GLOBALS['STATISTICS_RATE']}</caption>
                                <thead>
                                    <tr>
                                        <td>{$GLOBALS['STATISTICS_RATE']}</td>

DASHBOARD;

// Print scopes
foreach ($aTimeGroups as $sTime)
{
    echo "                                      <th scope=\"col\">{$sTime}</th>\n";
}

print <<<DASHBOARD
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

DASHBOARD;

// Print phone browsers
foreach ($aPBrowsers as $sBrowser)
{
    echo "                                      <th scope=\"row\">{$sBrowser} ({$aCount[$sBrowser][4]})</th>\n";
    // Loop through timegroups
    foreach ($aTimeGroups as $sTime)
    {
        $sScore = (isset($aPResults[$sBrowser][$sTime])) ? round($aPResults[$sBrowser][$sTime], -1) : 0;
        echo "                                      <td>{$sScore}</td>\n";
    }
    echo "                                  </tr>\n";
}

print <<<DASHBOARD
                                </tbody>
                            </table>
                        </div>

DASHBOARD;
*/
?>