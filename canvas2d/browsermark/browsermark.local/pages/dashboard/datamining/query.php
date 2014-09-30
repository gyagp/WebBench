<?php

session_start();
header('Content-Type: application/json');
$_NG = json_decode(file_get_contents('php://input'), true);

function secureCSVString(&$sValue, $sKey)
{
    $sValue = str_replace('"', '""', $sValue);
}

// Versions
if (isset($_NG['get-versions']))
{
    if (!isset($_SESSION['Versions']))
    {
        $sQuery = "SELECT DISTINCT result_version FROM flat_search ORDER BY result_version ASC";
        $_SESSION['Versions'] = array();
        if ($rVersions = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aVersion = $rVersions->fetch_row())
            {
                $_SESSION['Versions'][] = $aVersion[0];
            }
        }
    }
    echo json_encode($_SESSION['Versions']);
}

// Countries
else if (isset($_NG['get-countries']))
{
    if (!isset($_SESSION['Countries']))
    {
        $sQuery = "SELECT DISTINCT country FROM flat_search ORDER BY country ASC";
        $_SESSION['Countries'] = array();
        if ($rCountries = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aCountry = $rCountries->fetch_row())
            {
                $_SESSION['Countries'][] = $aCountry[0];
            }
        }
    }
    echo json_encode($_SESSION['Countries']);
}

// Categories
else if (isset($_NG['get-categories']))
{
    if (!isset($_SESSION['Categories']))
    {
        $sQuery = "SELECT DISTINCT category_name FROM flat_search ORDER BY category_name ASC";
        $_SESSION['Categories'] = array();
        if ($rCategories = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aCategory = $rCategories->fetch_row())
            {
                $_SESSION['Categories'][] = $aCategory[0];
            }
        }
    }
    echo json_encode($_SESSION['Categories']);
}

// Browsers
else if (isset($_NG['get-browsers']))
{
    if (!isset($_SESSION['Browsers']))
    {
        $sQuery = "SELECT DISTINCT CONCAT(browser, ' ', browser_version) FROM flat_search ORDER BY browser ASC, browser_version ASC";
        $_SESSION['Browsers'] = array();
        if ($rBrowsers = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aBrowser = $rBrowsers->fetch_row())
            {
                $_SESSION['Browsers'][] = $aBrowser[0];
            }
        }
    }
    echo json_encode($_SESSION['Browsers']);
}

// Engines
else if (isset($_NG['get-engines']))
{
    if (!isset($_SESSION['Engines']))
    {
        $sQuery = "SELECT DISTINCT CONCAT(layout_engine, ' ', layout_engine_version) FROM flat_search ORDER BY layout_engine ASC, layout_engine_version ASC";
        $_SESSION['Engines'] = array();
        if ($rEngines = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aEngine = $rEngines->fetch_row())
            {
                $_SESSION['Engines'][] = $aEngine[0];
            }
        }
    }
    echo json_encode($_SESSION['Engines']);
}

// OS
else if (isset($_NG['get-oss']))
{
    if (!isset($_SESSION['OSs']))
    {
        $sQuery = "SELECT DISTINCT CONCAT(os_name, ' ', os_version) FROM flat_search ORDER BY os_name ASC, os_version ASC";
        $_SESSION['OSs'] = array();
        if ($rOSs = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aOS = $rOSs->fetch_row())
            {
                $_SESSION['OSs'][] = $aOS[0];
            }
        }
    }
    echo json_encode($_SESSION['OSs']);
}

// Detected name
else if (isset($_NG['get-detectednames']))
{
    if (!isset($_SESSION['DetectedNames']))
    {
        $sQuery = "SELECT DISTINCT detected_name FROM flat_search WHERE detected_name IS NOT NULL AND detected_name NOT LIKE '' ORDER BY detected_name ASC";
        $_SESSION['DetectedNames'] = array();
        if ($rDetectedNames = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aDetectedName = $rDetectedNames->fetch_row())
            {
                $_SESSION['DetectedNames'][] = $aDetectedName[0];
            }
        }
    }
    echo json_encode($_SESSION['DetectedNames']);
}

// given name
else if (isset($_NG['get-givennames']))
{
    if (!isset($_SESSION['GivenNames']))
    {
        $sQuery = "SELECT DISTINCT given_name FROM flat_search WHERE given_name IS NOT NULL AND given_name NOT LIKE '' ORDER BY given_name ASC";
        $_SESSION['GivenNames'] = array();
        if ($rGivenNames = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aGivenName = $rGivenNames->fetch_row())
            {
                $_SESSION['GivenNames'][] = $aGivenName[0];
            }
        }
    }
    echo json_encode($_SESSION['GivenNames']);
}

// Query params to SQL
else
{
    $sWhere = '1';
    $sSearch = (isset($_NG['keyword'], $_NG['searchfield']))
            ? " AND " . $GLOBALS['DatabaseHandler']->real_escape_string($_NG['searchfield']) . " LIKE '%" .
                    $GLOBALS['DatabaseHandler']->real_escape_string($_NG['keyword']) . "%'"
            : '';
    $sGroup = (isset($_NG['groupfield'])) ? " GROUP BY " . $GLOBALS['DatabaseHandler']->real_escape_string($_NG['groupfield']) : '';
    $sNameForFile = (isset($_NG['groupfield'])) ? '-grouped_' . str_replace(array(',', ' '), '_', $_NG['groupfield']) : '';
    foreach ($_NG as $sKey => $sValue)
    {
        if (!empty($sValue))
        {
            $sVersion = '';
            $sName = '';
            switch ($sKey)
            {
                case 'startdate':
                    $sWhere .= " AND summary_time >= '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue . ' 00:00:00') . "'";
                    break;
                case 'enddate':
                    $sWhere .= " AND summary_time <= '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue . ' 23:59:59') . "'";
                    break;
                case 'valid':
                case 'flash':
                case 'silverlight':
                    $sNameForFile .= "-{$sKey}";
                    $sWhere .= " AND {$sKey} = 1";
                    break;
                case 'browserversion':
                    $sNameForFile .= '-' . str_replace(array(' ', '.'), '_', $sValue);
                    list($sVersion, $sName) = explode(' ', strrev($sValue), 2);
                    $sVersion = strrev($sVersion);
                    $sName = strrev($sName);
                    $sWhere .= " AND browser = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sName) . "'";
                    $sWhere .= " AND browser_version = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sVersion) . "'";
                    break;
                case 'engineversion':
                    $sNameForFile .= '-' . str_replace(array(' ', '.'), '_', $sValue);
                    list($sVersion, $sName) = explode(' ', strrev($sValue), 2);
                    $sVersion = strrev($sVersion);
                    $sName = strrev($sName);
                    $sWhere .= " AND layout_engine = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sName) . "'";
                    $sWhere .= " AND layout_engine_version = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sVersion) . "'";
                    break;
                case 'osversion':
                    $sNameForFile .= '-' . str_replace(array(' ', '.'), '_', $sValue);
                    list($sVersion, $sName) = explode(' ', strrev($sValue), 2);
                    $sVersion = strrev($sVersion);
                    $sName = strrev($sName);
                    $sWhere .= " AND os_name = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sName) . "'";
                    $sWhere .= " AND os_version = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sVersion) . "'";
                    break;
                case 'resultversion':
                    $sNameForFile .= '-' . str_replace(array(' ', '.'), '_', $sValue);
                    $sWhere .= " AND result_version = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue) . "'";
                    break;
                case 'country':
                    $sNameForFile .= "-{$sValue}";
                    $sWhere .= " AND country = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue) . "'";
                    break;
                case 'categoryname':
                    $sNameForFile .= "-{$sValue}";
                    $sWhere .= " AND category_name = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue) . "'";
                    break;
                case 'detectedname':
                    $sNameForFile .= '-' . str_replace(array(' ', '.'), '_', $sValue);
                    $sWhere .= " AND detected_name = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue) . "'";
                    break;
                case 'givenname':
                    $sNameForFile .= '-' . str_replace(array(' ', '.'), '_', $sValue);
                    $sWhere .= " AND given_name = '" . $GLOBALS['DatabaseHandler']->real_escape_string($sValue) . "'";
                    break;
            }
        }
    }

    $aStandardFields = array(
        "result_summary_id",
        "summary_time",
        "valid",
        "result_version",
        "country",
        "category_name",
        "CONCAT(browser, ' ', browser_version) AS browser",
        "CONCAT(layout_engine, ' ', layout_engine_version) AS layout_engine",
        "CONCAT(os_name, ' ', os_version) AS os",
        "detected_name",
        "given_name",
        "css_full",
        "css_partial",
        "css_not_supported",
        "html5_valid_elements",
        "html5_invalid_elements",
        "html5_valid_attributes",
        "html5_invalid_attributes",
        "html5_valid_selectors",
        "html5_invalid_selectors",
        "html5_valid_events",
        "html5_invalid_events",
        "html5_valid_misc",
        "html5_invalid_misc",
        "flash",
        "silverlight",
    );
    $aScoreFields = array(
        "overall_score",
        "css_group_score",
        "css_2d_test_score",
        "css_3d_test_score",
        "css_resize_test_score",
        "css_crunch_test_score",
        "dom_group_score",
        "dom_advanced_search_test_score",
        "dom_create_source_test_score",
        "dom_dynamic_create_test_score",
        "dom_search_test_score",
        "general_group_score",
        "general_page_load_test_score",
        "general_responsiveness_test_score",
        "graphics_group_score",
        "graphics_canvas_test_score",
        "graphics_webgl_test_score",
        "javascript_group_score",
        "javascript_array_blur_test_score",
        "javascript_array_weighted_test_score",
        "javascript_string_chat_test_score",
        "javascript_string_filter_test_score",
    );

    $sFields = implode(', ', $aStandardFields);
    foreach ($aScoreFields as $sScoreField)
    {
        $sName = str_replace('_test_score', '', $sScoreField);
        if (isset($_NG['groupfield']))
        {
            $sFields .= ", ROUND(MIN({$sScoreField}), 1) AS {$sName}_min";
            $sFields .= ", ROUND(MAX({$sScoreField}), 1) AS {$sName}_max";
            $sFields .= ", ROUND(AVG({$sScoreField}), 1) AS {$sName}_avg";
        }
        else
        {
            $sFields .= ", {$sScoreField} AS {$sName}";
        }
    }

    $sQuery = (isset($_NG['getcount'])) ? "SELECT COUNT(result_summary_id) AS cnt" : "SELECT {$sFields}";
    $iPerPage = (isset($_NG['resultsperpage'])) ? (int) $_NG['resultsperpage'] : 500;
    $iStart = (isset($_NG['page'])) ? $iPerPage * (int) $_NG['page'] : 0;
    $sQuery .= " FROM flat_search WHERE {$sWhere}{$sSearch}{$sGroup}";
    $sQuery .= (isset($_NG['getcount'])) ? '' : " LIMIT {$iStart}, {$iPerPage}";
    $aReturn = array();
    if ($rRes = $GLOBALS['DatabaseHandler']->query($sQuery))
    {
        // Export data title
        if (!isset($_NG['getcount']))
        {
            $sFileName = 'datamining-';
            $sFileName .= (isset($_NG['startdate'])) ? date('Ymd', strtotime($_NG['startdate'])) : '20121114';
            $sFileName .= '-';
            $sFileName .= (isset($_NG['enddate'])) ? date('Ymd', strtotime($_NG['enddate'])) : date('Ymd', strtotime('now - 1 day'));
            $sFileName .= $sNameForFile . '-page_' . ($_NG['page']+1);
            $_SESSION['exportData']['details'] = $sFileName;
        }
        if (isset($_NG['getcount'], $_NG['groupfield']))
        {
            $aReturn[0]['cnt'] = $rRes->num_rows;
        }
        else
        {
            $bTitles = false;
            while ($aRes = $rRes->fetch_assoc())
            {
                if (!isset($_NG['getcount']))
                {
                    if (!$bTitles)
                    {
                        $_SESSION['exportData']['data'] = array();
                        $_SESSION['exportData']['titles'] = array_keys($aRes);
                        $bTitles = true;
                    }
                    $aCSV = $aRes;
                    array_walk($aCSV, 'secureCSVString');
                    $_SESSION['exportData']['data'][] = $aCSV;
                }
                $aReturn[] = $aRes;
            }
        }
    }
    echo json_encode($aReturn);

}

?>