<?php

$sWhere = ($GLOBALS['PATH']['basename'] == 'isp') ? '' : "AND isp_info.isp_country_code LIKE '" . ($GLOBALS['DatabaseHandler']->real_escape_string($GLOBALS['PATH']['basename'])) . "'";

$sTitle = ($GLOBALS['PATH']['basename'] == 'isp') ? 'ISP Info' : "ISP Info: {$GLOBALS['PATH']['basename']}";

echo "<h1>{$sTitle}</h1>";

// Get countries
$sQuery = "SELECT DISTINCT isp_country_code FROM isp_info
WHERE deleted = 0
AND LOWER(isp_name) NOT LIKE '% bloc%'
AND LOWER(isp_name) NOT LIKE '% pools %'
AND LOWER(isp_name) NOT LIKE '%universi%'
AND LOWER(isp_name) NOT LIKE '%uniwersy%'
AND LOWER(isp_name) NOT LIKE '%institut%'
AND LOWER(isp_name) NOT LIKE '%bank%'
AND LOWER(isp_name) NOT LIKE '%academ%'
AND LOWER(isp_name) NOT LIKE '% private %'
AND LOWER(isp_name) NOT LIKE '%politechnica'
ORDER BY isp_country_code ASC";

if ($oCountries = $GLOBALS['DatabaseHandler']->query($sQuery))
{
    echo '<p>Select country: ';
    while ($aCountry = $oCountries->fetch_assoc())
    {
        if ($aCountry['isp_country_code'] == $GLOBALS['PATH']['basename'])
        {
            echo "{$aCountry['isp_country_code']} ";
        }
        else
        {
            echo "<a href=\"/isp/{$aCountry['isp_country_code']}\">{$aCountry['isp_country_code']}</a> ";
        }
    }
    echo '</p>';
}

// Get all ISPs except excluded
$sQuery = "SELECT isp_info.isp_name, COUNT(isp_results.isp_result_id) AS c FROM isp_results
LEFT JOIN isp_info ON (isp_info.isp_info_id = isp_results.isp_info_id)
WHERE isp_info.deleted = 0
AND LOWER(isp_info.isp_name) NOT LIKE '% bloc%'
AND LOWER(isp_info.isp_name) NOT LIKE '% pools %'
AND LOWER(isp_info.isp_name) NOT LIKE '%universi%'
AND LOWER(isp_info.isp_name) NOT LIKE '%uniwersy%'
AND LOWER(isp_info.isp_name) NOT LIKE '%institut%'
AND LOWER(isp_info.isp_name) NOT LIKE '%bank%'
AND LOWER(isp_info.isp_name) NOT LIKE '%academ%'
AND LOWER(isp_info.isp_name) NOT LIKE '% private %'
AND LOWER(isp_info.isp_name) NOT LIKE '%politechnica'
{$sWhere}
GROUP BY isp_results.isp_info_id
HAVING c > 4
ORDER BY isp_name ASC";


if ($oISP = $GLOBALS['DatabaseHandler']->query($sQuery))
{
    echo '<div id="isp_list">';

    $sLetter = '';
    while ($aISP = $oISP->fetch_assoc())
    {
        $sCurrentLetter = mb_convert_case(mb_substr($aISP['isp_name'], 0, 1), MB_CASE_UPPER);
        if ($sCurrentLetter != $sLetter)
        {
            if ($sLetter != '')
            {
                echo "</ul>\n";
            }
            echo "<h2 id=\"letter-{$sCurrentLetter}\">{$sCurrentLetter}</h2>\n<ul>";
            $sLetter = $sCurrentLetter;
        }
        $sUrl = str_replace(' ', '_', mb_convert_case($aISP['isp_name'], MB_CASE_LOWER));
        $sUrl = urlencode($sUrl);
        echo "<li><a href=\"/isp/{$sUrl}\">{$aISP['isp_name']}</a></li>\n";
    }
}

?>
        </ul>
    </div>
