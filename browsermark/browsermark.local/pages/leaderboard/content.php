                        <h1>Leaderboard TOP 3</h1>
                        <!-- Leaderboard left -->
                        <div class="column onethird toplist">
                            <h2>Desktops</h2>
<?php
// Fetch top 3 Desktops
$sQuery = "SELECT CONCAT(result_summaries.browser_info_id, '-', result_summaries.os_info_id) AS inter_id, os_info.os_name, browser_info.browser_name,
browser_info.browser_major_version, browser_info.browser_minor_version, MAX(result_summaries.overall_score) AS max_score,
result_summaries.summary_time, MAX(result_summaries.result_summary_id), COUNT(benchmark_tests.benchmark_test_id) as test_count
FROM result_summaries
LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)
LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
LEFT JOIN benchmark_tests ON (benchmark_tests.result_summary_id = result_summaries.result_summary_id)
WHERE result_summaries.deleted = 0 AND result_summaries.general_category_id = 2 AND result_meta.valid = 1 AND browser_info.browser_major_version > 0
AND result_meta.result_version = ?
GROUP BY result_summaries.result_summary_id
HAVING test_count > 10
ORDER BY max_score DESC LIMIT 50";

if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
{
    $stmt->bind_param('s', $GLOBALS['VERSION']);
    $stmt->execute();
    $stmt->bind_result($sInterId, $sOSName, $sBrowserName, $iBrowserMajor, $iBrowserMinor, $fOverallScore, $sSummaryTime, $iSummaryId, $iTestCount);
    $iNumber = 1;
    $aInters = array();
    while ($stmt->fetch())
    {
        if (!in_array($sInterId, $aInters))
        {
            $sTime = date('j F Y H:i', strtotime($sSummaryTime));
            $sBrowser = "{$sBrowserName} {$iBrowserMajor}.{$iBrowserMinor}";
            $sScore = round($fOverallScore);
            echo "                            <p class=\"number number-{$iNumber}\">{$iNumber}.</p>";
            echo "                            <p><small>{$sTime}</small>\n";
            echo "                            <br><a href=\"{$GLOBALS['HOST']}/results/{$iSummaryId}\">{$sOSName}\n";
            echo "                              <br>{$sBrowser}</a>\n";
            echo "                            <br><b>{$sScore} points</b></p>\n";
            $iNumber++;
            $aInters[] = $sInterId;
        }
        if ($iNumber >= 4)
        {
            break;
        }
    }

    // Fill possible empty slots
    for ($iNumber; $iNumber <= 3; $iNumber++)
    {
        echo "                            <p class=\"number number-{$iNumber}\">{$iNumber}.</p>";
        echo "                            <p><small>N/A</small>\n";
        echo "                            <br><a href=\"#\">No results\n";
        echo "                              <br>yet</a>\n";
        echo "                            <br><b>0 points</b></p>\n";
    }
    $stmt->close();
}
?>
                        </div>
                        <!-- /Leaderboard left -->
                        <!-- Leaderboard middle -->
                        <div class="column onethird toplist">
                            <h2>Tablets</h2>
<?php
// Fetch top 3 Tablets
$sQuery = "SELECT CONCAT(result_summaries.browser_info_id, '-', result_meta.detected_name) AS inter_id, result_meta.detected_name, browser_info.browser_name,
browser_info.browser_major_version, browser_info.browser_minor_version, MAX(result_summaries.overall_score) AS max_score,
result_summaries.summary_time, result_summaries.result_summary_id, COUNT(benchmark_tests.benchmark_test_id) as test_count
FROM result_summaries
LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)
LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
LEFT JOIN benchmark_tests ON (benchmark_tests.result_summary_id = result_summaries.result_summary_id)
WHERE result_summaries.deleted = 0 AND result_summaries.general_category_id = 3 AND result_meta.valid = 1 AND browser_info.browser_major_version > 0
AND result_meta.result_version = ?
AND result_meta.detected_name IS NOT NULL
GROUP BY result_summaries.result_summary_id
HAVING test_count > 10
ORDER BY max_score DESC LIMIT 50";

if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
{
    $stmt->bind_param('s', $GLOBALS['VERSION']);
    $stmt->execute();
    $iCnt = $stmt->num_rows;
    $stmt->bind_result($sInterId, $sOSName, $sBrowserName, $iBrowserMajor, $iBrowserMinor, $fOverallScore, $sSummaryTime, $iSummaryId, $iTestCount);
    $iNumber = 1;
    $aInters = array();
    while ($stmt->fetch())
    {
        if (!in_array($sInterId, $aInters))
        {
            $sTime = date('j F Y H:i', strtotime($sSummaryTime));
            $sBrowser = "{$sBrowserName} {$iBrowserMajor}.{$iBrowserMinor}";
            $sScore = round($fOverallScore);
            echo "                            <p><small>{$sTime}</small>\n";
            echo "                            <br><a href=\"{$GLOBALS['HOST']}/results/{$iSummaryId}\" >{$sOSName}\n";
            echo "                              <br>{$sBrowser}</a>\n";
            echo "                            <br><b>{$sScore} points</b></p>\n";
            $iNumber++;
            $aInters[] = $sInterId;
        }
        if ($iNumber >= 4)
        {
            break;
        }
    }

    // Fill possible empty slots
    for ($iNumber; $iNumber <= 3; $iNumber++)
    {
        echo "                            <p><small>N/A</small>\n";
        echo "                            <br><a href=\"#\">No results\n";
        echo "                              <br>yet</a>\n";
        echo "                            <br><b>0 points</b></p>\n";
    }
    $stmt->close();
}
?>
                        </div>
                        <!-- /Leaderboard middle -->
                        <!-- Leaderboard right -->
                        <div class="column onethird toplist">
                            <h2>Phones</h2>
<?php
// Fetch top 3 Phones
$sQuery = "SELECT CONCAT(result_summaries.browser_info_id, '-', result_meta.detected_name) AS inter_id, result_meta.detected_name, browser_info.browser_name,
browser_info.browser_major_version, browser_info.browser_minor_version, MAX(result_summaries.overall_score) AS max_score,
result_summaries.summary_time, result_summaries.result_summary_id, COUNT(benchmark_tests.benchmark_test_id) as test_count
FROM result_summaries
LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)
LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
LEFT JOIN benchmark_tests ON (benchmark_tests.result_summary_id = result_summaries.result_summary_id)
WHERE result_summaries.deleted = 0 AND result_summaries.general_category_id = 4 AND result_meta.valid = 1 AND browser_info.browser_major_version > 0
AND result_meta.result_version = ?
AND result_meta.detected_name IS NOT NULL
GROUP BY result_summaries.result_summary_id
HAVING test_count > 10
ORDER BY max_score DESC LIMIT 50";

if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
{
    $stmt->bind_param('s', $GLOBALS['VERSION']);
    $stmt->execute();
    $iCnt = $stmt->num_rows;
    $stmt->bind_result($sInterId, $sOSName, $sBrowserName, $iBrowserMajor, $iBrowserMinor, $fOverallScore, $sSummaryTime, $iSummaryId, $iTestCount);
    $iNumber = 1;
    $aInters = array();
    while ($stmt->fetch())
    {
        if (!in_array($sInterId, $aInters))
        {
            $sTime = date('j F Y H:i', strtotime($sSummaryTime));
            $sBrowser = "{$sBrowserName} {$iBrowserMajor}.{$iBrowserMinor}";
            $sScore = round($fOverallScore);
            echo "                            <p><small>{$sTime}</small>\n";
            echo "                            <br><a href=\"{$GLOBALS['HOST']}/results/{$iSummaryId}\" >{$sOSName}\n";
            echo "                              <br>{$sBrowser}</a>\n";
            echo "                            <br><b>{$sScore} points</b></p>\n";
            $iNumber++;
            $aInters[] = $sInterId;
        }
        if ($iNumber >= 4)
        {
            break;
        }
    }

    // Fill possible empty slots
    for ($iNumber; $iNumber <= 3; $iNumber++)
    {
        echo "                            <p><small>N/A</small>\n";
        echo "                            <br><a href=\"#\">No results\n";
        echo "                              <br>yet</a>\n";
        echo "                            <br><b>0 points</b></p>\n";
    }
    $stmt->close();
}
?>
                        </div>
                        <!-- /Leaderboard right -->