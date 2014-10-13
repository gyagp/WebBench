<?php

class ISPModel
{
    var $error = false;
    private $_details = array();
    var $isp = '';

    public function __construct()
    {
        $this->isp = $this->_parseName();
    }

    public function checkCountry($sCountry)
    {
        $sQuery = "SELECT isp_country_code FROM isp_info WHERE isp_country_code LIKE ? AND deleted = 0 LIMIT 1";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('s', $sCountry);
            $stmt->execute();
            return $stmt->fetch();
        }
        return false;
    }

    public function mainDetails()
    {
        $sLogo = ($this->_details['isp_logo']) ? '<img src="' . $this->_details['isp_logo'] . '" alt=""> ' : '';
        $sAddress = '';
        if ($this->_details['isp_address1'])
        {
            $sAddressRow = ($this->_details['isp_address2']) ? "{$this->_details['isp_address1']}<br />{$this->_details['isp_address2']}" : $this->_details['isp_address1'];
            $sPhone = ($this->_details['isp_phone']) ? 'Tel. ' . $this->_details['isp_phone'] : '';
            $sFax = ($this->_details['isp_fax']) ? '<br />Fax. ' . $this->_details['isp_fax'] : '';
            $sURL = ($this->_details['isp_url']) ? '<p class="button"><a href="' . $this->_details['isp_url'] . '">Visit ISP site</a></p>' : '';
            $sAddress = <<<ADDRESS
            <div id="isp_address"">
                {$sLogo}
                <p>
                    {$sAddressRow}
                    <br />{$this->_details['isp_city']} {$this->_details['isp_province']}
                    <br />{$this->_details['isp_zip']}-{$this->_details['isp_country']}
                </p>
                <p>
                    {$sPhone}
                    {$sFax}
                </p>
                {$sURL}
            </div>

ADDRESS;
        }

        // Get average and best results from ISP
        $aTopResults = $this->_getTopResults();
        $sResultsCount = $this->_intToName($aTopResults['result_count']);
        return <<<DETAILS
            <div id="isp_name">
                <h1>{$this->isp}</h1>
                <p class="mode">{$sResultsCount} results found. Select speed unit: <a href="#" data-mode="kbit" class="display-mode selected">Kilobits</a> <a href="#" data-mode="mbit" class="display-mode">Megabits</a></p>
                <table border="0" cellpadding="5">
                    <tr>
                        <th>&nbsp;</th>
                        <th>Ping</th>
                        <th>Download</th>
                        <th>Upload</th>
                        <th>Variance</th>
                    </tr>
                    <tr>
                        <th>Average:</th>
                        <td>{$aTopResults['average_ping']} ms</td>
                        <td><span data-mode="kbit">{$aTopResults['average_download']}</span> <span data-display="kbit">kbit/s</span></td>
                        <td><span data-mode="kbit">{$aTopResults['average_upload']}</span> <span data-display="kbit">kbit/s</span></td>
                        <td>{$aTopResults['average_variance']}%</td>
                    </tr>
                    <tr>
                        <th>Best:</th>
                        <td>{$aTopResults['best_ping']} ms</td>
                        <td><span data-mode="kbit">{$aTopResults['best_download']}</span> <span data-display="kbit">kbit/s</span></td>
                        <td><span data-mode="kbit">{$aTopResults['best_upload']}</span> <span data-display="kbit">kbit/s</span></td>
                        <td>{$aTopResults['best_variance']}%</td>
                    </tr>
                </table>
            </div>
{$sAddress}

DETAILS;

    }

    public function continentInfo()
    {
        $sReturn = <<<CONTINENTS
            <div id="continents-info">
                <h2>Averages per server per category</h2>

CONTINENTS;

        $aDetails = array();
        $sAverageTables = '';
        $sBestTables = '';

        // Get continents
        $sQuery = "SELECT continent_server_id, server_name FROM continent_servers ORDER BY continent_server_id ASC";
        if ($oContinents = $GLOBALS['DatabaseHandler']->query($sQuery))
        {
            while ($aContinent = $oContinents->fetch_assoc())
            {
                // Start with average & best tables
                $sAverageTables .= '<table border="0" cellpadding="5"><thead><tr><th>&nbsp;</th><th colspan="4">' . $aContinent['server_name'] . '</th></tr><tr><th>&nbsp;</th><th>Ping</th><th>Download</th><th>Upload</th><th>Variance</th></thead><tbody>';
                $sBestTables .= '<table border="0" cellpadding="5"><thead><tr><th>&nbsp;</th><th colspan="4">' . $aContinent['server_name'] . '</th></tr><tr><th>&nbsp;</th><th>Ping</th><th>Download</th><th>Upload</th><th>Variance</th></thead><tbody>';

                // Get categories
                $sQuery = "SELECT general_category_id, category_name FROM general_categories WHERE deleted = 0 AND general_category_id > 1 ORDER by general_category_id ASC";
                if ($oCategories = $GLOBALS['DatabaseHandler']->query($sQuery))
                {
                    while ($aCategory = $oCategories->fetch_assoc())
                    {
                        // Get averages and best values
                        $sQuery = "SELECT COUNT(isp_result_id) AS result_count, ROUND(AVG(ping_average_milliseconds)) AS average_ping, ROUND(MIN(ping_average_milliseconds))
                                  AS best_ping, ROUND(AVG(download_average_kbit)) AS average_download, ROUND(MAX(download_average_kbit)) AS best_download,
                                  ROUND(AVG(upload_average_kbit)) AS average_upload, ROUND(MAX(upload_average_kbit)) AS best_upload, ROUND(AVG(variance_percentage), 2)
                                  AS average_variance, ROUND(MIN(variance_percentage), 2) AS best_variance FROM isp_results WHERE isp_info_id = {$this->_details['isp_info_id']}
                                  AND continent_server_id = {$aContinent['continent_server_id']} AND general_category_id = {$aCategory['general_category_id']}
                                  GROUP BY isp_info_id, continent_server_id, general_category_id";
                        $oResults = $GLOBALS['DatabaseHandler']->query($sQuery);
                        if ($oResults->num_rows > 0)
                        {
                            while ($aResult = $oResults->fetch_assoc())
                            {
                                $sResultCount = $this->_intToName($aResult['result_count']);

                                $sAverageTables .= '<tr><th>' . $aCategory['category_name'] . ' (' . $sResultCount . ')</th>';
                                $sAverageTables .= '<td>' . $aResult['average_ping'] . ' ms</td>';
                                $sAverageTables .= '<td><span data-mode="kbit">' . $aResult['average_download'] . '</span> <span data-display="kbit">kbit/s</span></td>';
                                $sAverageTables .= '<td><span data-mode="kbit">' . $aResult['average_upload'] . '</span> <span data-display="kbit">kbit/s</span></td>';
                                $sAverageTables .= '<td>' . $aResult['average_variance'] . '%</td>';
                                $sAverageTables .= '</tr>';

                                $sBestTables .= '<tr><th>' . $aCategory['category_name'] . ' (' . $sResultCount . ')</th>';
                                $sBestTables .= '<td>' . $aResult['best_ping'] . ' ms</td>';
                                $sBestTables .= '<td><span data-mode="kbit">' . $aResult['best_download'] . '</span> <span data-display="kbit">kbit/s</span></td>';
                                $sBestTables .= '<td><span data-mode="kbit">' . $aResult['best_upload'] . '</span> <span data-display="kbit">kbit/s</span></td>';
                                $sBestTables .= '<td>' . $aResult['best_variance'] . '%</td>';
                                $sBestTables .= '</tr>';

                                foreach ($aResult as $sField => $mValue)
                                {
                                    $aDetails[$aContinent['server_name']][$aCategory['category_name']][$sField] = $mValue;
                                }
                            }
                        }
                        else
                        {
                            // No data
                            $sAverageTables .= '<tr><th>' . $aCategory['category_name'] . '</th><th colspan="4">No data available</th></tr>';
                            $sBestTables .= '<tr><th>' . $aCategory['category_name'] . '</th><th colspan="4">No data available</th></tr>';
                        }
                    }
                }

                $sAverageTables .= '</tbody></table>';
                $sBestTables .= '</tbody></table>';
            }
        }

        $sReturn .= <<<CONTINENTS
                {$sAverageTables}
                <br clear="all">
                <h2>Best per server per category</h2>
                {$sBestTables}
            </div>
            <br clear="all">&nbsp;

CONTINENTS;

        return $sReturn;
    }

    private function _intToName($iInt)
    {
        if ($iInt > 1000000)
        {
            return floor($iInt / 1000000) . 'M+';
        }
        else if ($iInt > 1000)
        {
            return floor($iInt / 1000) . 'k+';
        }
        else if ($iInt > 500)
        {
            return '500+';
        }
        else if ($iInt > 100)
        {
            return '100+';
        }
        else if ($iInt > 10)
        {
            return floor($iInt / 10) * 10 . '+';
        }
        else
        {
            return $iInt;
        }
    }

    private function _parseName()
    {
        $sName = urldecode($GLOBALS['PATH']['basename']);
        $sName = $GLOBALS['DatabaseHandler']->real_escape_string(str_replace('_', ' ', $sName));

        // Find name from database
        $sQuery = "SELECT * FROM isp_info WHERE deleted = 0 AND LOWER(isp_name) = '{$sName}' LIMIT 1";
        $oResult = $GLOBALS['DatabaseHandler']->query($sQuery);
        if ($oResult->num_rows == 1)
        {
            $this->_details = $oResult->fetch_assoc();
            return $this->_details['isp_name'];
        }
        else
        {
            $this->error = true;
            return 'ISP Info';
        }
    }

    private function _getTopResults()
    {
        $sQuery = "SELECT COUNT(isp_result_id) AS result_count, ROUND(AVG(ping_average_milliseconds)) AS average_ping, ROUND(MIN(ping_average_milliseconds))
                AS best_ping, ROUND(AVG(download_average_kbit)) AS average_download, ROUND(MAX(download_average_kbit)) AS best_download,
                ROUND(AVG(upload_average_kbit)) AS average_upload, ROUND(MAX(upload_average_kbit)) AS best_upload, ROUND(AVG(variance_percentage), 2)
                AS average_variance, ROUND(MIN(variance_percentage), 2) AS best_variance FROM isp_results WHERE isp_info_id = {$this->_details['isp_info_id']}
                AND general_category_id > 1
                GROUP BY isp_info_id";

        $oResult = $GLOBALS['DatabaseHandler']->query($sQuery);
        return $oResult->fetch_assoc();
    }
}

?>