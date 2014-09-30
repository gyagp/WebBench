<?php

// Only for logged in users who have client rights or bigger
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] <= $GLOBALS['USER_LEVELS']['client'])
{
    echo json_encode(array());
    exit;
}

// Continue

// If requesting limit values list
if (isset($_REQUEST['list']))
{
    $aListValues = array('None');
    switch($_REQUEST['list'])
    {
        case 1: // Test
            // Fetch test names and version numbers
            $oData = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT CONCAT(test_name, ' ', test_version) AS data_value FROM browsermark_tests WHERE deleted = 0 ORDER BY data_value ASC");
            while ($aValue = $oData->fetch_assoc())
            {
                $aListValues[] = $aValue['data_value'];
            }
            break;
        case 2: // Group
            // Fetch group names and version numbers
            $oData = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT CONCAT(group_name, ' ', group_version) AS data_value FROM browsermark_groups WHERE deleted = 0 ORDER BY data_value ASC");
            while ($aValue = $oData->fetch_assoc())
            {
                $aListValues[] = $aValue['data_value'];
            }
            break;
        case 3: // Browser
            // Fetch browser names and version numbers
            $oData = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT CONCAT(browser_name, ' ', browser_major_version, '.', browser_minor_version, '.', browser_build_version, '.', browser_revision_version) AS data_value FROM browser_info WHERE browser_info_id > 1 AND deleted = 0 ORDER BY data_value ASC");
            while ($aValue = $oData->fetch_assoc())
            {
                $aListValues[] = $aValue['data_value'];
            }
            break;
        case 4: // OS
            // Fetch OS names and version numbers
            $oData = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT CONCAT(os_name, ' ', os_major_version, '.', os_minor_version, '.', os_build_version, '.', os_revision_version) AS data_value FROM os_info WHERE os_info_id > 1 AND deleted = 0 ORDER BY data_value ASC");
            while ($aValue = $oData->fetch_assoc())
            {
                $aListValues[] = $aValue['data_value'];
            }
            break;
        case 5: // Layout engine
            // Fetch layout engine names and version numbers
            $oData = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT CONCAT(engine_name, ' ', engine_major_version, '.', engine_minor_version, '.', engine_build_version, '.', engine_revision_version) AS data_value FROM browser_layout_engines WHERE browser_layout_engine_id > 1 AND deleted = 0 ORDER BY data_value ASC");
            while ($aValue = $oData->fetch_assoc())
            {
                $aListValues[] = $aValue['data_value'];
            }
            break;
        case 6: // Tablet name
            // Fetch tablet names
            $oData = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT result_meta.detected_name AS data_value FROM result_summaries LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id) WHERE result_summaries.general_category_id = 3 AND result_summaries.deleted = 0 AND result_meta.deleted = 0 AND result_meta.detected_name IS NOT NULL and result_meta.detected_name NOT LIKE 'Unknown' ORDER BY data_value ASC");
            while ($aValue = $oData->fetch_assoc())
            {
                $aListValues[] = $aValue['data_value'];
            }
            break;
        case 7: // Phone name
            // Fetch phone names
            $oData = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT result_meta.detected_name AS data_value FROM result_summaries LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id) WHERE result_summaries.general_category_id = 4 AND result_summaries.deleted = 0 AND result_meta.deleted = 0 AND result_meta.detected_name IS NOT NULL and result_meta.detected_name NOT LIKE 'Unknown' ORDER BY data_value ASC");
            while ($aValue = $oData->fetch_assoc())
            {
                $aListValues[] = $aValue['data_value'];
            }
            break;
    }

    echo json_encode($aListValues);
}

// Otherwise if request results
else if (isset($_REQUEST['group_by']))
{
    // Start to create SQL based on selections
    $sSQL  = 'SELECT ';

    $sSQL .= 'FROM result_summaries LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id) ';

    $sSQL .= 'WHERE result_summaries.deleted = 0 AND result_meta.deleted = 0 AND result_meta.result_version = ? ';

    $sSQL .= 'GROUP BY ';

    $sSQL .= 'ORDER BY ';
}
?>