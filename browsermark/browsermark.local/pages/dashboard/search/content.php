<?php

// Required rights
$aRequiredRights = array (
    "view"  => $GLOBALS['USER_LEVELS']['client'],
    "edit" => $GLOBALS['USER_LEVELS']['admin'],
    "delete" => $GLOBALS['USER_LEVELS']['admin'],
);

// Only for logged in users who have enough rights to view
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $aRequiredRights['view'])
{
    header("Location: {$GLOBALS['HOST']}");
    exit;
}

// Print forms
$aLimits = array(100, 250, 500, 1000, 2000, 3000);
$sOptions = '';
foreach ($aLimits as $iLimit)
{
    $sSelected = (isset($_REQUEST['limit']) && $_REQUEST['limit'] == $iLimit) ? ' selected="selected"' : '';
    $sOptions .= "<option value=\"{$iLimit}\"{$sSelected}>{$iLimit} latest results</option>\n";
}
print <<<FORMS
<h1>Search & Export</h1>

<h2>Raw data</h2>
<p>You can get latest data in raw CSV format by selecting how many results you want from drop down below and downloading CSV file.</p>

<form method="get">
<select name="limit">
{$sOptions}</select>
<input type="submit" value="Next">
</form>

FORMS;

// Export query
unset($_SESSION['exportData']);
if (isset($_REQUEST['limit']))
{
    $sExportQuery = "SELECT
        result_summaries.result_summary_id AS id, result_summaries.summary_time AS time, result_meta.user_agent, result_meta.detected_name, general_categories.category_name AS category,
        CONCAT(browser_info.browser_name, ' ', browser_info.browser_major_version, '.', browser_info.browser_minor_version) AS browser,
        CONCAT(browser_layout_engines.engine_name, ' ', browser_layout_engines.engine_major_version, '.', browser_layout_engines.engine_minor_version) AS engine,
        CONCAT(os_info.os_name, ' ', os_info.os_major_version, '.', os_info.os_minor_version) AS os,
        isp_info.isp_name, continent_servers.server_name AS continent, isp_results.ping_average_milliseconds AS ping, isp_results.download_average_kbit AS download, isp_results.upload_average_kbit AS upload,
        isp_results.download_min_kbit AS download_min, isp_results.download_max_kbit AS download_max, isp_results.variance_percentage AS variance, result_meta.result_version AS version,
        result_summaries.overall_score AS score
        FROM result_summaries
        LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
        LEFT JOIN general_categories ON (general_categories.general_category_id = result_summaries.general_category_id)
        LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
        LEFT JOIN browser_layout_engines ON (browser_layout_engines.browser_layout_engine_id = browser_info.browser_layout_engine_id)
        LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)
        LEFT JOIN isp_results ON (isp_results.result_summary_id = result_summaries.result_summary_id)
        LEFT JOIN continent_servers ON (continent_servers.continent_server_id = isp_results.continent_server_id)
        LEFT JOIN isp_info ON (isp_info.isp_info_id = isp_results.isp_info_id)
        WHERE result_summaries.deleted = 0 AND isp_info.deleted = 0
        ORDER BY result_summaries.result_summary_id DESC LIMIT " . ((int) $_REQUEST['limit']);

    if ($oRes = $GLOBALS['DatabaseHandler']->query($sExportQuery))
    {
        $_SESSION['exportData'] = array(
            'details' => "latest-" . ((int) $_REQUEST['limit']),
            'titles' => array(
                "ID", "Time", "User Agent", "Detected Name", "Category", "Browser", "Engine",
                "OS", "ISP", "Continent", "Ping", "Download", "Upload", "Download MIN",
                "Dwonload MAX", "Variance %", "Name", "Version", "Score", "Meta",
            ),
            'data' => array(),
        );

        while ($aRes = $oRes->fetch_assoc())
        {
            $_SESSION['exportData']['data'][] = array(
                $aRes['id'], $aRes['time'], $aRes['user_agent'], $aRes['detected_name'], $aRes['category'], $aRes['browser'], $aRes['engine'],
                $aRes['os'], $aRes['isp_name'], $aRes['continent'], $aRes['ping'], $aRes['download'], $aRes['upload'], $aRes['download_min'],
                $aRes['download_max'], $aRes['variance'], "Overall", $aRes['version'], $aRes['score'], "{}",
            );

            // Fetch group results
            $sGroupsQuery = "SELECT benchmark_group_results.benchmark_group_result_id, browsermark_groups.group_name, browsermark_groups.group_version, benchmark_group_results.group_score
                    FROM benchmark_group_results
                    LEFT JOIN browsermark_groups ON (browsermark_groups.browsermark_group_id = benchmark_group_results.browsermark_group_id)
                    WHERE benchmark_group_results.result_summary_id = {$aRes['id']}";
            $oGroups = $GLOBALS['DatabaseHandler']->query($sGroupsQuery);
            while ($aGroup = $oGroups->fetch_assoc())
            {
                $_SESSION['exportData']['data'][] = array(
                    "", "", "", "", "", "", "",
                    "", "", "", "", "", "", "",
                    "", "", $aGroup['group_name'], $aGroup['group_version'], $aGroup['group_score'], "{}"
                );

                // Do we get benchmark or conformance tests?
                if ($aGroup['group_name'] == 'Conformity')
                {
                    // Conformity
                    $sTestQuery = "SELECT browsermark_tests.test_name, browsermark_tests.test_version, conformity_tests.conformity_score AS score, test_meta.meta_information
                            FROM conformity_tests
                            LEFT JOIN browsermark_tests ON (browsermark_tests.browsermark_test_id = conformity_tests.browsermark_test_id)
                            LEFT JOIN test_meta ON (test_meta.test_id = conformity_tests.conformity_test_id AND test_meta.is_conformity = 1)
                            WHERE conformity_tests.result_summary_id = {$aRes['id']} AND browsermark_tests.test_name NOT LIKE '%Network%'
                           	ORDER BY conformity_tests.conformity_test_id ASC";
                }
                else
                {
                    // Benchmark
                    $sTestQuery = "SELECT browsermark_tests.test_name, browsermark_tests.test_version, benchmark_tests.benchmark_score AS score, test_meta.meta_information
                            FROM benchmark_tests
                            LEFT JOIN browsermark_tests ON (browsermark_tests.browsermark_test_id = benchmark_tests.browsermark_test_id)
                            LEFT JOIN test_meta ON (test_meta.test_id = benchmark_tests.benchmark_test_id AND test_meta.is_conformity = 0)
                            WHERE benchmark_tests.benchmark_group_result_id = {$aGroup['benchmark_group_result_id']}
                            ORDER BY benchmark_tests.benchmark_test_id ASC";
                }

                $oTests = $GLOBALS['DatabaseHandler']->query($sTestQuery);
                while ($aTest = $oTests->fetch_assoc())
                {
                    $_SESSION['exportData']['data'][] = array(
                        "", "", "", "", "", "", "",
                        "", "", "", "", "", "", "",
                        "", "", $aTest['test_name'], $aTest['test_version'], $aTest['score'], $aTest['meta_information']
                    );
                }
            }
        }

        echo <<<DOWNLOAD
                        <div class="results_share">
                            <a href="/export.php" class="ready_for_test">Download CSV</a>
                        </div>

DOWNLOAD;

    }
}

// Create dropdown for time frame months
/*$sTimeFrameMonths = '';
$iThisMonth = date('n');
$iLastYear = date('Y')-1;
for ($iCnt = 0; $iCnt < 12; $iCnt++)
{
    $iMonth = $iThisMonth + $iCnt;
    $iYear = $iLastYear;
    if ($iMonth > 12)
    {
        $iMonth -= 12;
        $iYear++;
    }
    $iValue = $iCnt + 5;
    $sDate = date('F Y', strtotime("{$iYear}-{$iMonth}-01 00:00:01"));
    $sTimeFrameMonths .= "                                    <option value=\"{$iValue}\">{$sDate}</option>\n";
}

// Get version numbers
$sVersions = '';
$oVersions = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT result_version FROM result_meta ORDER BY result_version DESC");
$iCnt = 1;
while ($aVersion = $oVersions->fetch_assoc())
{
    $sVersions .= "                                    <option value=\"{$iCnt}\">{$aVersion['result_version']}</option>\n";
}

print <<<EOT
                        <h1>Search</h1>
                        <form id="ajax-admin-search" class="search_form" method="post">
                            <div class="column onethird">
                                <label for="group_by">
                                    Group by
                                </label>
                                <select name="group_by">
                                    <option value="1">Test</option>
                                    <option value="2">Group</option>
                                    <option value="3">Browser</option>
                                    <option value="4">OS</option>
                                    <option value="5">Layout engine</option>
                                    <option value="6">Tablet name</option>
                                    <option value="7">Phone name</option>
                                </select>
                            </div>
                            <div class="column onethird">
                                <label for="value_field">
                                    Value field
                                </label>
                                <select name="value_field">
                                    <option value="1">Test score</option>
                                    <option value="2" disabled>Group score</option>
                                    <option value="3" disabled>Overall score</option>
                                </select>
                            </div>
                            <div class="column onethird">
                                <label for="value_type">
                                    Value type
                                </label>
                                <select name="value_type">
                                    <option value="1">Count</option>
                                    <option value="2">Min</option>
                                    <option value="3">Max</option>
                                    <option value="4">Average</option>
                                </select>
                            </div>
                            <br clear="all">
                            <div class="column onethird">
                                <label for="limit_field">
                                    Limit field
                                <label>
                                <select name="limit_field">
                                    <option value="0">None</option>
                                    <option value="1">Test</option>
                                    <option value="2">Group</option>
                                    <option value="3">Browser</option>
                                    <option value="4">OS</option>
                                    <option value="5">Layout engine</option>
                                    <option value="6">Tablet name</option>
                                    <option value="7">Phone name</option>
                                </select>
                            </div>
                            <div class="column onethird">
                                <label for="limit_value">
                                    Limit value
                                </label>
                                <select name="limit_value">
                                    <option data-table="benchmark" value="0">None</option>
                                </select>
                            </div>
                            <div class="column onethird">
                                <label for="display_value">
                                    Display data as
                                </label>
                                <select name="display_value">
                                    <option value="1">Raw data (table)</option>
                                    <option value="2">Bar chart</option>
                                    <option value="3">Area chart</option>
                                    <option value="4">Pie chart</option>
                                    <option value="5">Line chart</option>
                                </select>
                            </div>
                            <br clear="all">
                            <div class="column onethird">
                                <label for="time_value">
                                    Time frame
                                </label>
                                <select name="time_value">
                                    <option value="1">Last 24 hours</option>
                                    <option value="2">Last 7 days</option>
                                    <option value="3">Last month</option>
                                    <option value="4">Last year</option>
{$sTimeFrameMonths}
                                </select>
                            </div>
                            <div class="column onethird">
                                <label for="results_group">
                                    Group results (for area &amp; line chart)
                                </label>
                                <select name="results_group" disabled="disabled">
                                    <option value="1">Hourly</option>
                                    <option value="2">Daily</option>
                                    <option value="3" disabled="disabled">Weekly</option>
                                    <option value="4" disabled="disabled">Monthly</option>
                                    <option value="5" disabled="disabled">Yearly</option>
                                </select>
                            </div>
                            <div class="column onethird">
                                <label for="version_value">
                                    Browsermark version
                                </label>
                                <select name="version_value">
{$sVersions}
                                </select>
                            </div>
                            <br clear="all">
                            <input class="button" type="submit" value="Search">
                        </form>

                        <div id="ajax-admin-search-result"></div>

EOT;
*/
?>
