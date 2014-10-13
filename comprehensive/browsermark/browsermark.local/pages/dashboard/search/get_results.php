<?php

// Required rights
$aRequiredRights = array (
    'view'  => $GLOBALS['USER_LEVELS']['client'],
    'edit' => $GLOBALS['USER_LEVELS']['client'],
    'delete' => $GLOBALS['USER_LEVELS']['client'],
);

// Only for logged in users who have enough rights to view
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] <= $aRequiredRights['view'])
{
    header("Location: {$GLOBALS['HOST']}");
    exit;
}

if (isset($_POST['group_by']))
{
    // Generate query, explanation:
    // 1: "name" field
    // 2: "value" field, including MIN/MAX/AVG/COUNT/SUM
    // 3: preserved for second join
    // 4: preserved for third join
    // 5: preserved for fourth join
    // 6: primary clause name, id
    // 7: primary clause value, always integer
    // 8: result version, required string
    // 9: timeframe clause
    // 10: preserved for fourth clause
    // 11: grouping
    // 12: order
    $aQuery = array(
        'name'              => '',
        'value'             => '',
        'join_2'            => '',
        'join_3'            => '',
        'join_4'            => '',
        'where_id'          => '',
        'where_id_value'    => 0,
        'version'           => '',
        'timeframe'         => '',
        'where_4'           => '',
        'group_by'          => '',
        'order'             => '',
    );

    // Assistant table for preventing multiple joins on same table
    $aJoins = array();

    // Query body
    $sQuery = "SELECT %s, %s FROM result_summaries
    LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
    %s
    %s
    %s
    WHERE %s = %i AND result_meta.result_version = '%s' AND %s %s
    GROUP BY %s
    ORDER BY %s";

    // Individual test data table
    $sDataTable = ($_POST['data-table'] == 'conformity') ? 'conformity' : 'benchmark';

    // Start to select name field and default group_by
    switch($_POST['group_by'])
    {
        case 1:
            // Test
            $aQuery['name'] = 'browsermark_tests.test_name';
            $aQuery['group_by'] = 'browsermark_tests.test_name';
            $aQuery['join_2'] = "LEFT JOIN {$sDataTable}_tests ON ({$sDataTable}_tests.result_summary_id = result_summaries.result_summary_id)";
            $aQuery['join_3'] = 'LEFT JOIN browsermark_tests ON (browsermark_tests.browsermark_test_id = benchmark_tests.browsermark_test_id)';
            $aJoins["{$sDataTable}_tests"] = true;
            $aJoins['browsermark_tests'] = true;
            break;
        case 2:
            // Group
            $aQuery['name'] = 'browsermark_groups.group_name';
            $aQuery['group_by'] = 'browsermark_groups.group_name';
            $aQuery['join_2'] = 'LEFT JOIN benchmark_group_results ON (benchmark_group_results.result_summary_id = result_summaries.result_summary_id)';
            $aQuery['join_3'] = 'LEFT JOIN browsermark_groups ON (browsermark_groups.browsermark_group_id = benchmark_group_results.browsermark_group_id)';
            $aJoins['benchmark_group_results'] = true;
            $aJoins['browsermark_groups'] = true;
            break;
        case 3:
            // Browser
            $aQuery['name'] = 'browser_info.browser_name';
            $aQuery['group_by'] = 'browser_info.browser_name';
            $aQuery['join_2'] = 'LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)';
            $aJoins['browser_info'] = true;
            break;
        case 4:
            // OS
            $aQuery['name'] = 'os_info.os_name';
            $aQuery['group_by'] = 'os_info.os_name';
            $aQuery['join_2'] = 'LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)';
            $aJoins['os_info'] = true;
            break;
        case 5:
            // Layout Engine
            $aQuery['name'] = 'browser_info.browser_name';
            $aQuery['group_by'] = 'browser_info.browser_name';
            $aQuery['join_2'] = 'LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)';
            $aJoins[] = 'browser_info';
            break;
        case 6:
            // Tablet Name
            $aQuery['name'] = 'results_meta.detected_name';
            $aQuery['group_by'] = 'results_meta.detected_name';
            $aQuery['where_4'] = 'result_summaries.general_category_id = 3';
            break;
        case 7:
            // Phone name
            $aQuery['name'] = 'results_meta.detected_name';
            $aQuery['group_by'] = 'results_meta.detected_name';
            $aQuery['where_4'] = 'result_summaries.general_category_id = 4';
            break;
        default:
            // Something went wrong, exit without executing
            exit;
            break;
    }

    // Next select value field
    $aOperation = array(
        array('', ''),
        array('COUNT(', ')'),
        array('MIN', ')'),
        array('MAX(', ')'),
        array('AVG(', ')'),
    );
    switch($_POST['value_field'])
    {
        case 1:
            // Test score
            $aQuery['value'] = $aOperation[$_POST['value_type']][0] . "{$sDataTable}_tests.{$sDataTable}_score" . $aOperation[$_POST['value_type']][1];
            // Join if needed
            if (!array_key_exists("$sDataTable_tests", $aJoins))
            {
                // Find first empty join slot
                for ($iCnt = 2; $iCnt <= 4; $iCnt++)
                {
                    if (empty($aQuery["join_{$iCnt}"]))
                    {
                        $aQuery["join_{$iCnt}"] = "LEFT JOIN {$sDataTable}_tests ON ({$sDataTable}_tests.result_summary_id = result_summaries.result_summary_id)";
                        $aJoins[] = "{$sDataTable}_tests";
                    }
                }
            }
            break;
        case 2:
            // Group score
            $aQuery['value'] = $aOperation[$_POST['value_type']][0] . "benchmark_group_results.group_score" . $aOperation[$_POST['value_type']][1];
            // Join if needed
            if (!array_key_exists('benchmark_group_results', $aJoins))
            {
                // Find first empty join slot
                for ($iCnt = 2; $iCnt <= 4; $iCnt++)
                {
                    if (empty($aQuery["join_{$iCnt}"]))
                    {
                        $aQuery["join_{$iCnt}"] = 'LEFT JOIN benchmark_group_results ON (benchmark_group_results.result_summary_id = result_summaries.result_summary_id)';
                        $aJoins[] = 'benchmark_group_results';
                    }
                }
            }
            break;
        case 3:
            // Overall score
            $aQuery['value'] = $aOperation[$_POST['value_type']][0] . "result_summaries.overall_score" . $aOperation[$_POST['value_type']][1];
            break;
        default:
            // Something went wrong, exit without executing
            exit;
            break;
    }

    // Limit field if value greater than 0, default is result_
    if ($_POST['limit_value'] > 0)
    {
        // Start to select name field and default group_by
        switch($_POST['group_by'])
        {
            case 1:
                // Test
                $aQuery['name'] = 'browsermark_tests.test_name';
                $aQuery['group_by'] = 'browsermark_tests.test_name';
                $aQuery['join_2'] = "LEFT JOIN {$sDataTable}_tests ON ({$sDataTable}_tests.result_summary_id = result_summaries.result_summary_id)";
                $aQuery['join_3'] = 'LEFT JOIN browsermark_tests ON (browsermark_tests.browsermark_test_id = benchmark_tests.browsermark_test_id)';
                $aJoins["{$sDataTable}_tests"] = true;
                $aJoins['browsermark_tests'] = true;
                break;
            case 2:
                // Group
                $aQuery['name'] = 'browsermark_groups.group_name';
                $aQuery['group_by'] = 'browsermark_groups.group_name';
                $aQuery['join_2'] = 'LEFT JOIN benchmark_group_results ON (benchmark_group_results.result_summary_id = result_summaries.result_summary_id)';
                $aQuery['join_3'] = 'LEFT JOIN browsermark_groups ON (browsermark_groups.browsermark_group_id = benchmark_group_results.browsermark_group_id)';
                $aJoins['benchmark_group_results'] = true;
                $aJoins['browsermark_groups'] = true;
                break;
            case 3:
                // Browser
                $aQuery['name'] = 'browser_info.browser_name';
                $aQuery['group_by'] = 'browser_info.browser_name';
                $aQuery['join_2'] = 'LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)';
                $aJoins['browser_info'] = true;
                break;
            case 4:
                // OS
                $aQuery['name'] = 'os_info.os_name';
                $aQuery['group_by'] = 'os_info.os_name';
                $aQuery['join_2'] = 'LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)';
                $aJoins['os_info'] = true;
                break;
            case 5:
                // Layout Engine
                $aQuery['name'] = 'browser_info.browser_name';
                $aQuery['group_by'] = 'browser_info.browser_name';
                $aQuery['join_2'] = 'LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)';
                $aJoins[] = 'browser_info';
                break;
            case 6:
                // Tablet Name
                $aQuery['name'] = 'results_meta.detected_name';
                $aQuery['group_by'] = 'results_meta.detected_name';
                $aQuery['where_4'] = 'result_summaries.general_category_id = 3';
                break;
            case 7:
                // Phone name
                $aQuery['name'] = 'results_meta.detected_name';
                $aQuery['group_by'] = 'results_meta.detected_name';
                $aQuery['where_4'] = 'result_summaries.general_category_id = 4';
                break;
            default:
                // Something went wrong, exit without executing
                exit;
                break;
        }


    }
    echo '<pre>' . print_r(vsprintf($sQuery, $aQuery),1 ) . "\r\n\r\n" . print_r($aJoins, 1) . '</pre>';

}

?>