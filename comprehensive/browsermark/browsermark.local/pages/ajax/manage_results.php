<?php

// Only for admins
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $GLOBALS['USER_LEVELS']['admin'])
{
    echo json_encode(array());
    exit;
}

// If receiving update request
if (isset($_REQUEST['update']))
{
    // Rationalize data received
    $aProcess = array();
    foreach ($_REQUEST['changes'] as $aData)
    {
        $aProcess[$aData['id']][$aData['name']] = $aData['value'];
    }

    // Now after data is rationalized, we can run one query per row to make changes
    $aReturn = array();
    foreach ($aProcess as $iId => $aChanges)
    {
        // Delete/undelete request
        if (isset($aChanges['deleted']))
        {
            // Delete/undelete? By default operation failed
            $sKey = ($aChanges['deleted'] == 1) ? 'deleted' : 'undeleted';
            $aReturn[$iId][$sKey] = false;

            $sQuery = "UPDATE result_summaries SET deleted = ? WHERE result_summary_id = ?";
            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $stmt->bind_param('ii', $aChanges['deleted'], $iId);

                if ($stmt->execute())
                {
                    $aReturn[$iId][$sKey] = true;
                }
                else
                {
                    // Save SQL error
                    $aReturn[$iId][$sKey] = $stmt->error;
                }
            }
            else
            {
                // Save SQL error
                $aReturn[$iId][$sKey] = $GLOBALS['DatabaseHandler']->error;
            }
        }
        // Other requests
        if (isset($aChanges['valid']) || isset($aChanges['detected-name']))
        {
            // By default meta update failed
            $aReturn[$iId]['meta'] = false;

            // Both, validity or detected-name only?
            if (isset($aChanges['valid']) && isset($aChanges['detected-name']))
            {
                $sQuery = "UPDATE result_meta SET valid = ?, detected_name = ? WHERE result_meta_id = (SELECT result_meta_id FROM result_summaries WHERE result_summary_id = ?)";
                if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                {
                    $stmt->bind_param('isi', $aChanges['valid'], $aChanges['detected-name'], $iId);
                    if ($stmt->execute())
                    {
                        $aReturn[$iId]['meta'] = true;
                    }
                    else
                    {
                        // Save SQL error
                        $aReturn[$iId][$sKey] = $stmt->error;
                    }
                }
                else
                {
                    // Save SQL error
                    $aReturn[$iId][$sKey] = $GLOBALS['DatabaseHandler']->error;
                }
            }
            else if (isset($aChanges['valid']))
            {
                $sQuery = "UPDATE result_meta SET valid = ? WHERE result_meta_id = (SELECT result_meta_id FROM result_summaries WHERE result_summary_id = ?)";
                if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                {
                    $stmt->bind_param('ii', $aChanges['valid'], $iId);
                    if ($stmt->execute())
                    {
                        $aReturn[$iId]['meta'] = true;
                    }
                    else
                    {
                        // Save SQL error
                        $aReturn[$iId][$sKey] = $stmt->error;
                    }
                }
                else
                {
                    // Save SQL error
                    $aReturn[$iId][$sKey] = $GLOBALS['DatabaseHandler']->error;
                }
            }
            else
            {
                $sQuery = "UPDATE result_meta SET detected_name = ? WHERE result_meta_id = (SELECT result_meta_id FROM result_summaries WHERE result_summary_id = ?)";
                if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                {
                    $stmt->bind_param('si', $aChanges['detected-name'], $iId);
                    if ($stmt->execute())
                    {
                        $aReturn[$iId]['meta'] = true;
                    }
                    else
                    {
                        // Save SQL error
                        $aReturn[$iId][$sKey] = $stmt->error;
                    }
                }
                else
                {
                    // Save SQL error
                    $aReturn[$iId][$sKey] = $GLOBALS['DatabaseHandler']->error;
                }
            }
        }
        // If category is changed
        if (isset($aChanges['category']))
        {
            $sQuery = "UPDATE result_summaries SET general_category_id = ? WHERE result_summary_id = ?";
            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $stmt->bind_param('ii', $aChanges['category'], $iId);
                if ($stmt->execute())
                {
                    $aReturn[$iId]['summary'] = true;
                }
                else
                {
                    // Save SQL error
                    $aReturn[$iId][$sKey] = $stmt->error;
                }
            }
            else
            {
                // Save SQL error
                $aReturn[$iId][$sKey] = $GLOBALS['DatabaseHandler']->error;
            }
        }
    }

    echo json_encode($aReturn);

}
else
{
    $aJSON = array(
        array(
            "summary-id" => "ID",
            "overall-score" => "Score",
            "time" => "Time",
            "valid" => "Valid",
            "deleted" => "Delete",
            "version" => "Version",
            "category" => "Category",
            "browser" => "Browser",
            "engine" => "Engine",
            "detected-name" => "Detected Name",
            "given-name" => "Given Name",
            "user-agent" => "User-Agent",
        ),
    );

    // Base query without where
    $sQuery = "SELECT
        result_summaries.result_summary_id,
        result_summaries.overall_score,
        result_summaries.summary_time,
        result_meta.valid,
        result_summaries.deleted,
        result_meta.result_version,
        general_categories.category_name,
        CONCAT(browser_info.browser_name, ' ', browser_info.browser_major_version, '.', browser_info.browser_minor_version) AS browser_name_version,
        CONCAT(browser_layout_engines.engine_name, ' ', browser_layout_engines.engine_major_version, '.', browser_layout_engines.engine_minor_version) AS engine_name_version,
        result_meta.user_agent,
        result_meta.detected_name,
        result_meta.given_name
    FROM result_summaries
        LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
        LEFT JOIN general_categories ON (general_categories.general_category_id = result_summaries.general_category_id)
        LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
        LEFT JOIN browser_layout_engines ON (browser_layout_engines.browser_layout_engine_id = browser_info.browser_layout_engine_id)
    ";

    $sType = 'i';
    $mValue = 0;

    if (isset($_REQUEST['version']))
    {
        $sQuery .= "WHERE
        (result_summaries.general_category_id = 2 OR (result_meta.detected_name NOT LIKE 'iPhone%' AND result_meta.detected_name NOT LIKE 'iPad%'
        AND result_meta.detected_name NOT LIKE 'Unknown') OR result_meta.given_name IS NOT NULL)
        AND result_summaries.deleted = 0 AND
        result_meta.valid = 0 AND
        result_meta.result_version = ?
    ";
        $sType = 's';
        $mValue = $_REQUEST['version'];
    }
    else if (isset($_REQUEST['summary_id']))
    {
        $sQuery .= "WHERE result_summaries.result_summary_id = ?
    ";
        $sType = 'i';
        $mValue = $_REQUEST['summary_id'];
    }

    $sQuery .= " ORDER BY result_summaries.result_summary_id DESC";

    if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
    {
        $stmt->bind_param($sType, $mValue);
        $stmt->execute();
        $stmt->bind_result($iId, $fScore, $sTime, $iValid, $iDeleted, $sVersion, $sCategory, $sBrowser, $sEngine, $sUserAgent, $sDetectedName, $sGivenName);
        while($stmt->fetch())
        {
            $iScore = round($fScore);
            $aJSON[] = array(
                "summary-id" => $iId,
                "overall-score" => $iScore,
                "time" => $sTime,
                "valid" => $iValid,
                "deleted" => $iDeleted,
                "version" => $sVersion,
                "category" => $sCategory,
                "browser" => $sBrowser,
                "engine" => $sEngine,
                "detected-name" => $sDetectedName,
                "given-name" => $sGivenName,
                "user-agent" => $sUserAgent,
            );
        }
    }

    echo json_encode($aJSON);
}

?>