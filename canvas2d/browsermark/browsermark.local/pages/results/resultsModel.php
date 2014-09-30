<?php

/**
 * Flow:
 * 1. Select used mean: arithmetic or geometric
 * 2. Does result need to be saved or not?
 *  a) If session contains data and DB is enabled, result is saved and session erased
 *  b) If session not found and DB is enabled, find result id from URL (primary) or from $_SESSION['last_run_id']
 *     (secondary) and create data arrays from database
 *  c) Otherwise redirect to front page
 * 3. Define is shown social media buttons, url or session warning
 *  a) If version is public, show social media buttons (if result is saved) or test start button (if result is viewed
 *  b) if version is full and DB is enabled, show url (permanent link for the result)
 *  c) Otherwise show session warning
 * 4. Define if device name request is shown
 *  a) if test run is started with indicate that detected information is not correct and if DB is enabled, show "more
 *     information" request
 *  b) otherwise do not show anything
 * 5. Define what from results is shown
 *  a) If version is full or if user has logged in, show full details (groups, tests, meta, conformity + meta)
 *  b) Otherwise show only conformity (not meta information)
 */

class resultsModel
{
    var $resultsSummaryId = 0;
    var $mean = 'arithmetic';
    var $overall = 0;
    var $groups = array();
    var $tests = array();
    var $conformity = array('Conformity');
    var $testMeta = array();
    var $valid = false;
    var $preventSaving = array();
    var $browser = 'Unknown';
    var $system = 'Unknown 1';
    var $category = 'Unknown';
    var $categoryId = 1;
    var $saved = false;
    var $error = false;
    var $testCount = 2; // Two primary groups: benchmarks and conformity
    var $extraClass = '';
    var $zoom = '';
    var $decimals = 0;

    /**
     * Constructor
     *
     * Defines whether result need to be saved or not and retrieve information (if needed) from database. Also handle
     * redirect in cases when browser lands under /results but do not contain id
     */
    public function __construct()
    {
        // If session contains test_run, it means that user have done test(s) which need to be handled
        if (isset($_SESSION['test_run']))
        {
            // Set average model if available
            $this->mean = (isset($_SESSION['FORMULA'])) ? $_SESSION['FORMULA'] : $this->mean;

            // Fetch session details in variables
            $this->tests = $_SESSION['test_run'];
            $this->conformity = (isset($_SESSION['conformity_groups'])) ? $_SESSION['conformity_groups'] : array('Conformity');
            $this->testMeta = (isset($_SESSION['test_meta'])) ? $_SESSION['test_meta'] : array();
            $this->valid = (isset($_SESSION['validity'])) ? (bool) $_SESSION['validity'] : false;
            $this->preventSaving = (isset($_SESSION['prevent_saving'])) ? $_SESSION['prevent_saving'] : array();
            $this->browser = $GLOBALS['BrowserDetect']->browser;
            $this->system = $GLOBALS['BrowserDetect']->os;
            $this->category = $GLOBALS['BrowserDetect']->category;
            $this->categoryId = $GLOBALS['BrowserDetect']->categoryId;

            // Save data for Power Board
            if (isset($GLOBALS['PowerboardConnector']))
            {
                $_SESSION['Powerboard'] = array(
                    'result_hash' => $_SESSION['result_hash'],
                    'test_run' => $_SESSION['test_run'],
                    'device_name' => $GLOBALS['BrowserDetect']->deviceName,
                    'os' => $GLOBALS['BrowserDetect']->os,
                    'os_version' => $GLOBALS['BrowserDetect']->osVersion,
                    'browser' => $GLOBALS['BrowserDetect']->browser,
                    'browser_version' => $GLOBALS['BrowserDetect']->browserVersion,
                    'category_id' => $GLOBALS['BrowserDetect']->categoryId,
                );
            }

            // Delete session data (excluding last_run_id)
            unset($_SESSION['result_hash']);
            unset($_SESSION['current_group']);
            unset($_SESSION['current_test']);
            unset($_SESSION['test_meta']);
            unset($_SESSION['test_run']);
            unset($_SESSION['conformity_groups']);
            unset($_SESSION['prevent_saving']);
            unset($_SESSION['validity']);

        }
        // Otherwise if we get ID from url or from $_SESSION['last_run_id'] and if DB is enabled, we query database
        // to get details
        else if ($GLOBALS['DB'] == true && (is_numeric($GLOBALS['PATH']['basename']) || isset($_SESSION['last_run_id'])))
        {
            // Define id, url is primary
            $this->resultsSummaryId = (int) $GLOBALS['PATH']['basename'];
            if (!$this->resultsSummaryId)
            {
                // Get ID from session instead
                $this->resultsSummaryId = $_SESSION['last_run_id'];
            }
            // Get data from database
            $this->_browserDetails();
            $this->_tests();
        }
        // Otherwise user has landed in results page without id information or DB is not enabled, redirect to main page
        else
        {
            // Redirect
            header("Location: {$GLOBALS['HOST']}");
            exit;
        }

        // In this point browser has either redirected to a main page or tests information is found, start to process it
        foreach ($this->tests as $sGroup => $aTests)
        {
            // Increase test count with number of group tests + 1
            $this->testCount += count($aTests) + 1;

            // Conformity group tests are not calculated
            if (!in_array($sGroup, $this->conformity))
            {
                // Calculate group result
                $fGroupResult = ($this->mean == 'arithmetic')
                        ? $GLOBALS['ResultsHandler']->groupFinalArithmetic($aTests)
                        : $GLOBALS['ResultsHandler']->groupFinalGeomean($aTests);
                // Save result for overall results calculations
                $this->groups[$sGroup] = $fGroupResult;
            }
        }

        // Save test count to Power Board session if necessary
        if (isset($_SESSION['Powerboard']))
        {
            $_SESSION['Powerboard']['test_count'] = $this->testCount;
        }

        // Calculate overall score
        $this->overall = ($this->mean == 'arithmetic')
                ? $GLOBALS['ResultsHandler']->overallFinalArithmetic($this->groups)
                : $GLOBALS['ResultsHandler']->overallFinalGeomean($this->groups);

        // Save to $_SESSION['Powerboard']
        if (isset($_SESSION['Powerboard']))
        {
            $_SESSION['Powerboard']['overall'] = $this->overall;
        }

        // Check if saving is allowed
        if (empty($this->preventSaving) && !isset($_SESSION['autorun']))
        {
            // Ensure test count is correct or that full mode is activated
            if ($this->testCount == count($GLOBALS['TESTS']) || $GLOBALS['FULL'] == true)
            {
                $this->resultsSummaryId = $GLOBALS['ResultsHandler']->saveResult(
                        $this->overall, $this->tests, $this->conformity, $this->testMeta, $this->valid
                );

                if ($this->resultsSummaryId)
                {
                    $_SESSION['last_run_id'] = $this->resultsSummaryId;
                    $_SESSION['my_results'][] = $this->resultsSummaryId;
                    $this->saved = true;
                }
            }
        }
        else if (isset($_SESSION['autorun']))
        {
            unset($_SESSION['autorun']);
        }
    }

    private function _browserDetails()
    {
        // Get browser information
        $sQuery = 'SELECT browser_info.browser_name, browser_info.browser_major_version, os_info.os_name, general_categories.category_name, general_categories.general_category_id, result_meta.detected_name, result_summaries.deleted
                        FROM result_summaries
                        LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
                        LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)
                        LEFT JOIN general_categories ON (general_categories.general_category_id = result_summaries.general_category_id)
                        LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
                        WHERE result_summaries.result_summary_id = ? ';

        // If isset $_REQUEST['ignore'] and user has logged in and user is admin, we can show deleted result also
        if (isset($_REQUEST['ignore']) && $GLOBALS['LoginModel']->hasLoggedIn() && $_SESSION['login']['rights'] >= $GLOBALS['USER_LEVELS']['admin'])
        {
            $sQuery .= 'LIMIT 1';
        }
        else
        {
            $sQuery .= 'AND result_summaries.deleted = 0 LIMIT 1';
        }

        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('i', $this->resultsSummaryId);
            $stmt->execute();
            $stmt->bind_result($sBrowserName, $iBrowserMajorVersion, $sOsName, $sCategoryName, $iCategoryId, $sDetectedName, $iDeleted);
            if ($stmt->fetch())
            {
                $this->browser = $sBrowserName . ' ' . $iBrowserMajorVersion;
                $this->system = (!empty($sDetectedName)) ? $sDetectedName : $sOsName;
                $this->category = $sCategoryName;
                $this->categoryId = $iCategoryId;
                // If admin is viewing deleted record, add deleted -notification
                if ($iDeleted == 1)
                {
                    $this->extraClass = 'deleted';
                }
            }
            // If result was not found, raise false flag so index.php can generate 404
            else
            {
                $this->error = true;
            }
            $stmt->close();
        }
    }

    private function _tests()
    {
        // Fetch test run information, first benchmarks
        $sQuery = "SELECT benchmark_tests.benchmark_score, benchmark_tests.compare_score, browsermark_groups.group_name, browsermark_groups.group_version,
                        browsermark_tests.test_name, browsermark_tests.test_version, test_meta.meta_information, result_meta.result_version
                        FROM result_summaries
                        LEFT JOIN benchmark_tests ON (benchmark_tests.result_summary_id = result_summaries.result_summary_id)
                        LEFT JOIN browsermark_groups ON (browsermark_groups.browsermark_group_id = benchmark_tests.browsermark_group_id)
                        LEFT JOIN browsermark_tests ON (browsermark_tests.browsermark_test_id = benchmark_tests.browsermark_test_id)
                        LEFT JOIN test_meta ON (test_meta.test_id = benchmark_tests.benchmark_test_id AND test_meta.is_conformity = 0)
                        RIGHT JOIN result_meta ON (result_summaries.result_meta_id = result_meta.result_meta_id)
                        WHERE result_summaries.result_summary_id = ? and benchmark_tests.deleted = 0 AND browsermark_groups.deleted = 0 AND browsermark_tests.deleted = 0
                        ORDER BY browsermark_groups.group_name ASC, browsermark_groups.group_version DESC, browsermark_tests.test_name ASC, browsermark_tests.test_version DESC";

        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('i', $this->resultsSummaryId);
            $stmt->execute();
            $stmt->bind_result($fScore, $fCompare, $sGroup, $sGroupVersion, $sTest, $sTestVersion, $sMeta, $sVersion);
            while ($stmt->fetch())
            {
                $this->valid = true;
                $sGroupName = $sGroup . ' ' . $sGroupVersion;
                $sTestName = $sTest . ' ' . $sTestVersion;
                $this->tests[$sGroupName][$sTestName] = $fScore;
                $aMeta = json_decode($sMeta, true);
                $aMeta['compareScore'] = round($fCompare, 2);
                $this->testMeta[$sGroupName][$sTestName] = $aMeta;
                $this->mean = ($sVersion == '2.0') ? 'arithmetic' : 'geomean';
            }
            $stmt->close();
        }

        // Next conformity
        $sQuery = "SELECT conformity_tests.conformity_score, browsermark_tests.test_name, browsermark_tests.test_version, test_meta.meta_information
                        FROM conformity_tests
                        LEFT JOIN browsermark_tests ON (browsermark_tests.browsermark_test_id = conformity_tests.browsermark_test_id)
                        LEFT JOIN test_meta ON (test_meta.test_id = conformity_tests.conformity_test_id AND test_meta.is_conformity = 1)
                        WHERE conformity_tests.result_summary_id = ? and conformity_tests.deleted = 0 AND browsermark_tests.deleted = 0
                        ORDER BY browsermark_tests.test_name ASC, browsermark_tests.test_version DESC";

        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('i', $this->resultsSummaryId);
            $stmt->execute();
            $stmt->bind_result($fScore, $sTest, $sTestVersion, $sMeta);
            while ($stmt->fetch())
            {
                $sTestName = $sTest . ' ' . $sTestVersion;
                $this->tests['Conformity'][$sTestName] = $fScore;
                $aMeta = json_decode($sMeta, true);
                $this->testMeta['Conformity'][$sTestName] = $aMeta;
            }
            $stmt->close();
        }

        // When this function is ran, we want to prevent saving
        $this->preventSaving[] = "Data from database, no need to save";
    }

    public function overall()
    {
        // Overall summary is shown always, first define scoretext
        $sScoreText = $this->scoreText();

        // Overall is rounded
        $iOverall = round($this->overall, $this->decimals);
        // Superior percentage
        $sSuperior = '';
        if ($GLOBALS['DB'])
        {
            $sPercentage = $GLOBALS['ResultsHandler']->superiorPercentage($this->overall, $this->categoryId);
            $sSuperior = "<p class=\"superior\">{$sScoreText} browser is superior to {$sPercentage}% of all {$this->category} browsers</p>";
        }
        return <<<OVERALL
                        <div class="help_us" style="text-align: center">

                        </div>
                        <div class="benchmark_results">
                            <p class="benchmark_heading">Performance</p>
                        </div>
                        <div class="overall_score">
                            <p class="your_score"><br>{$sScoreText} score was:</p>
                            <p class="score">{$iOverall}</p>
                            {$sSuperior}
                        </div>

OVERALL;
    }

    public function validity()
    {
        // If not valid test run and result is saved
        if ($this->valid == false && $this->saved == true)
        {
            // Get valid names from result_meta
            $sQuery = "SELECT DISTINCT detected_name FROM result_meta WHERE valid = 1 ORDER BY detected_name ASC";
            $oResult = $GLOBALS['DatabaseHandler']->query($sQuery);
            $sDevices = '';
            while ($aRes = $oResult->fetch_assoc())
            {
                $sDevices .= "\r\n                                <option value=\"{$aRes['detected_name']}\">";
            }

            return <<<VALIDITY
                    <div class="help_us">
                        <h3>Please help us to improve this service</h3>
                        <p>Your device was identified as {$GLOBALS['BrowserDetect']->deviceName}</span></p>
                        <p id="user_information">If identification is incorrect, please type correct device model:</p>
                        <input type="hidden" name="id" value="{$this->resultsSummaryId}">
                        <input class="given_name" type="text" name="given_name" list="devices" placeholder="What is your device model?">
                        <datalist id="devices">{$sDevices}
                        </datalist>
                        <input class="send_info" type="submit" value="✓ Send">
                    </div>

VALIDITY;

        }
        else if (isset($GLOBALS['PowerboardConnector']) && isset($_SESSION['Powerboard']))
        {
            // Valid test run, submit result and get URL
            if ($sURL = $GLOBALS['PowerboardConnector']->submit())
            {
                return <<<COMPARE
                    <div class="help_us">
                        <a href="{$sURL}" target="_blank" id="pb_compare" class="ready_for_test">Compare results</a>
                    </div>

COMPARE;
            }
        }
        return '';
    }

    public function share()
    {
        // if saved and BMNG is in public mode
        if (($this->saved == true && $GLOBALS['FULL'] == false) || ($GLOBALS['FULL'] == false && isset($_SESSION['my_results']) && in_array($this->resultsSummaryId, $_SESSION['my_results'])))
        {
            // Social media sharing buttons
            $sScoreText = urlencode(number_format($this->overall) . '  points, can you beat my browser?');
            $sUrl = urlencode("{$GLOBALS['HOST']}/results/{$this->resultsSummaryId}");
            print <<<SHARE
                        <div class="results_share">
                            <a class="url" data-media="Facebook" data-width="640" data-height="360" href="http://www.facebook.com/sharer/sharer.php?u={$sUrl}">
                                <img src="{$GLOBALS['HOST']}/images/facebook.png" alt="Facebook share" title="Facebook share"> Share
                            </a>
                            <a class="url" data-media="Twitter" data-width="550" data-height="420" href="https://twitter.com/intent/tweet?url={$sUrl}&amp;text={$sScoreText}">
                                <img src="{$GLOBALS['HOST']}/images/twitter.png" alt="Tweet" title="Tweet"> Tweet
                            </a>
                        </div>

SHARE;
        }
        // Else if public mode
        else if ($GLOBALS['FULL'] == false)
        {
            // Ready for test? button
            return <<<READY
                        <div class="results_share">
                            <a href="{$GLOBALS['HOST']}" class="ready_for_test">Ready to try how well your browser performs?</a>
                        </div>

READY;
        }
        // Else if database enabled
        else if ($GLOBALS['DB'] == true)
        {
            // Permanent link
            return <<<PERMALINK
                        <div class="results_share">
                            Permanent link for this result: <a href="{$GLOBALS['HOST']}/results/{$this->resultsSummaryId}">{$GLOBALS['HOST']}/results/{$this->resultsSummaryId}</a>
                        </div>

PERMALINK;
        }
        // Otherwise session warning
        else
        {
            return <<<ONLY_SESSION
                        <div class="resultDisplay">
                            <span>Results displayed only once: if you leave this page or if you refresh, these results cannot be seen anymore!</span>
                        </div>

ONLY_SESSION;
        }

        return '';
    }

    public function performance()
    {
        $sReturn = '';

        // If full mode or if user has logged in
        if ($GLOBALS['FULL'] == true || $GLOBALS['LoginModel']->hasLoggedIn() || (isset($_SESSION['REMOTE_USER']) && $_SESSION['REMOTE_USER'] == 'media'))
        {
            $sReturn = <<<HEADING
                        <div class="benchmark_results">

HEADING;

            foreach ($this->tests as $sGroup => $aTests)
            {
                if (!in_array($sGroup, $this->conformity))
                {
                    $sGroupResult = round($this->groups[$sGroup], $this->decimals);
                    $sGroupText = (empty($sGroup)) ? "Single Test Custom" : $sGroup;
                    $sReturn .= "                            <div class=\"group_result_wrap\">
                                    <div class=\"group_result_header\">{$sGroupText}</div>
                                    <div class=\"group_result_score\">{$sGroupResult}</div>
                                </div>\n";
                    // Loop through tests
                    foreach ($aTests as $sTest => $fResult)
                    {
                        $sResult = round((float) $fResult, $this->decimals);
                        $sMetaId = $this->_getMetaId($sGroup, $sTest);
                        $sMetaSpan = (isset($this->testMeta[$sGroup][$sTest])) ? '<span data-meta-id-toggle="' . $sMetaId . '">Show meta information</span>' : '<span>No meta information</span>';
                        $sReturn .= "                            <div class=\"test_result_wrap\">
                                    <div class=\"test_result_header\">{$sTest}</div>
                                    <div class=\"test_result_score\">{$sResult}</div>
                                    <div class=\"test_result_meta\">{$sMetaSpan}</div>
                                </div>\n";
                        // Meta output
                        $sReturn .= $this->metaInformation($sGroup, $sTest, $this->testMeta[$sGroup][$sTest]);
                    }
                }
            }

            $sReturn .= '                        </div>';
        }

        return $sReturn;
    }

    private function _getMetaId($sGroup, $sTest)
    {
        return str_replace(' ', '_', $sGroup . '-' . $sTest);
    }

    public function metaInformation($sGroup, $sTest, $aMeta, $iRound = 0, $iInline = 0)
    {
        $sReturn = '';
        if ($aMeta)
        {
            // If round is 0
            $sMetaId = $this->_getMetaId($sGroup, $sTest);
            $sReturn = ($iRound == 0) ? '<div class="meta" data-meta-id-value="' . $sMetaId . '">' : '';

            // Loop through meta values
            foreach ($aMeta as $sKey => $mValue)
            {
                // Inline ternary
                $sReturn .= ($iInline) ? '' : '<div class="meta-row">';

                // If value is an array
                if (is_array($mValue))
                {
                    // If key is meaningful, non-numeric
                    if (!is_numeric($sKey))
                    {
                        $sReturn .= '<div class="meta-label" title="' . $sKey . '">' . $sKey . ':</div>';
                    }
                    $iInlineCount = count($mValue) * 2;
                    $sReturn .= $this->metaInformation($sGroup, $sTest, $mValue, $iRound+1, $iInlineCount);
                }
                else
                {
                    // If key is meaningful, non-numeric
                    if (!is_numeric($sKey))
                    {
                        // two, four or six?
                        $sNum = ($iInline > 0) ? $this->_getMetaNth($iInline) : 'two';
                        $sReturn .= '<div class="meta-label ' . $sNum . '" title="' . $sKey . '">' . $sKey . ':</div>';
                        $sReturn .= '<div class="meta-value ' . $sNum . '" title="' . $mValue . '">' . $mValue . '</div>';
                    }
                    else
                    {
                        $sReturn .= '<div class="meta-value" title="' . $mValue . '">' . $mValue . '</div>';
                    }
                }
                // Inline ternary
                $sReturn .= ($iInline) ? '' : '</div>';
            }

            // If round is 0
            $sReturn .= ($iRound == 0) ? '</div>' : '';
        }
        return $sReturn;
    }

    private function _getMetaNth($iNum)
    {
        if ($iNum < 4)
        {
            return 'two';
        }
        else
        {
            $sNum = 'six';
            if ($iNum % 6 != 0 && $iNum % 4 == 0)
            {
                $sNum = 'four';
            }
        }
        return $sNum;
    }

    public function conformance()
    {
        $sReturn = <<<HEADING
                        <div class="conformity_results">
                            <div class="group_result_wrap">
                                <div class="group_result_header">Conformance</div>
                            </div>

HEADING;

        $bFound = false;

        // If full mode or if user has logged in, we show full details. Otherwise basic details
        foreach ($this->conformity as $sConformityGroup)
        {
            if (isset($this->tests[$sConformityGroup]))
            {
                $bFound = true;
                foreach ($this->tests[$sConformityGroup] as $sTest => $fResult)
                {
                    // If test is not HTML5 or CSS test, show simple yes/no
                    $sScore = round((float) $fResult);
                    $sScore = ($sScore > 100) ? '100+%' : $sScore . '%';
                    $sExtra = '';
                    $sExtraWrapClass = '';

                    /* If test is page load or responsiveness, show score
                    if (mb_stristr($sTest, 'Page Load') || mb_stristr($sTest, 'Responsiveness'))
                    {
                        $sScore = round((float) $fResult, 4);
                    }*/
                    if (mb_stristr($sTest, 'Network'))
                    {
                        // Network test behaves bit differently, score is not shown
                        $sScore = '&nbsp;';
                        if (isset($this->testMeta[$sConformityGroup][$sTest]))
                        {
                            // Let's save some ISP data
                            $this->_saveISP($this->testMeta[$sConformityGroup][$sTest]);

                            // kbit or Mbit?
                            $iDivider = 1;
                            $sBitMode = 'kbit';
                            if ($this->testMeta[$sConformityGroup][$sTest]['download'] > 2048)
                            {
                                $iDivider = 1024;
                                $sBitMode = 'Mbit';
                            }
                            $sExtra .= '<p class="extra-details">';
                            $sExtra .= '<span>' . $_SESSION['continent_warning'] . 'ISP: ' . $this->testMeta[$sConformityGroup][$sTest]['isp'] . '</span>';
                            $sExtra .= '<span>Ping: ' . round($this->testMeta[$sConformityGroup][$sTest]['ping']) . ' ms</span>';
                            $sExtra .= '<span>Download: ' . round($this->testMeta[$sConformityGroup][$sTest]['download'] / $iDivider, 2) . " {$sBitMode}/s";
                            if ($this->testMeta[$sConformityGroup][$sTest]['interface'])
                            {
                                $sExtra .= ' (' . $this->testMeta[$sConformityGroup][$sTest]['interface'] . ')';
                            }
                            $sExtra .= '</span><span>Upload: ' . round($this->testMeta[$sConformityGroup][$sTest]['upload'] / $iDivider, 2) . " {$sBitMode}/s</span>";
                            $sExtra .= '<span>Variance: ' . round($this->testMeta[$sConformityGroup][$sTest]['variance'], 2) . '% (';
                            $sExtra .= 'from ' . round($this->testMeta[$sConformityGroup][$sTest]['lowest'] / $iDivider, 2) . " {$sBitMode}/s ";
                            $sExtra .= 'to ' . round($this->testMeta[$sConformityGroup][$sTest]['highest'] / $iDivider, 2) . " {$sBitMode}/s";
                            $sExtra .= ')</span></p>';

                            // Save ISP data to Power Board if needed
                            if (isset($_SESSION['Powerboard']))
                            {
                                $sISP = $this->testMeta[$sConformityGroup][$sTest]['isp'];
                                //unset($_SESSION['Powerboard']['test_run'][$sConformityGroup][$sTest]);
                                $_SESSION['Powerboard']['isp_results']['isp'] = $sISP;
                                $_SESSION['Powerboard']['isp_results']['ping'] = $this->testMeta[$sConformityGroup][$sTest]['ping'];
                                $_SESSION['Powerboard']['isp_results']['download'] = $this->testMeta[$sConformityGroup][$sTest]['download'];
                                $_SESSION['Powerboard']['isp_results']['download_min'] = $this->testMeta[$sConformityGroup][$sTest]['lowest'];
                                $_SESSION['Powerboard']['isp_results']['download_max'] = $this->testMeta[$sConformityGroup][$sTest]['highest'];
                                $_SESSION['Powerboard']['isp_results']['connection_type'] = (isset($this->testMeta[$sConformityGroup][$sTest]['interface'])) ? $this->testMeta[$sConformityGroup][$sTest]['interface'] : '';
                                $_SESSION['Powerboard']['isp_results']['upload'] = 0; //@todo: activate this line after upload is fixed: $this->testMeta[$sConformityGroup][$sTest]['upload'];
                                $_SESSION['Powerboard']['isp_results']['variance'] = $this->testMeta[$sConformityGroup][$sTest]['variance'];
                            }
                            $sExtraWrapClass = ' extraDetails';
                        }
                    }
                    else if (mb_stristr($sTest, 'Flash') || mb_stristr($sTest, 'Silverlight'))
                    {
                        $sScore = ($fResult == 1) ? '<span class="resultTest">Yes</span>' : '<span class="resultTest">No</span>';
                    }
                    $sReturn .= "                            <div class=\"test_result_wrap{$sExtraWrapClass}\">
                                <div class=\"test_result_header\">{$sTest}</div>
                                <div class=\"test_result_score\">{$sScore}</div>
";

                    // If full or user logged in and test contains metadata
                    if (($GLOBALS['FULL'] || $GLOBALS['LoginModel']->hasLoggedIn() || (isset($_SERVER['REMOTE USER']) && $_SERVER['REMOTE USER'] == 'media')))
                    {
                        $sMetaId = $this->_getMetaId($sConformityGroup, $sTest);
                        $sMetaSpan = (isset($this->testMeta[$sConformityGroup][$sTest])) ? '<span data-meta-id-toggle="' . $sMetaId . '">Show meta information</span>' : '<span>No meta information</span>';

                        $sReturn .= "                                <div class=\"test_result_meta\">{$sMetaSpan}</div>\n";
                        // Output extra before meta
                        $sReturn .= "                                <div class=\"test_result_extra\">{$sExtra}</div>\n";
                        $sReturn .= "                               </div>\n";
                        // Meta
                        $sReturn .= $this->metaInformation($sConformityGroup, $sTest, $this->testMeta[$sConformityGroup][$sTest]);
                    }
                    else
                    {
                        // Output extra only
                        $sReturn .= "                                <div class=\"test_result_extra\">{$sExtra}</div>\n";
                        $sReturn .= "                               </div>\n";
                    }
                }
            }
        }

        $sReturn .= '</div>';

        if ($bFound == false)
        {
            $sReturn = '';
        }

        return $sReturn;
    }

    public function facebookMeta()
    {
        // Get facebook information
        $sFacebook = '';
        if (is_numeric($GLOBALS['PATH']['basename']) && !$GLOBALS['FULL'])
        {
            $sScore = number_format(round((float) $this->overall));
            $sFacebook = '<meta property="og:title" content="'. $sScore . ' points, can you beat this browser?" />
        <meta property="og:description" content="' . $this->category . ' ' . $this->system . ' with ' . $this->browser . ' scored ' . $sScore . ' points from Browsermark ' . $GLOBALS['VERSION'] . ' ! Can you beat that?" />
        <meta property="og:image" content="' . $GLOBALS['HOST'] . '/images/brand_for_fb.png" />
        <meta property="og:url" content="' . $GLOBALS['HOST'] . '/results/' . $GLOBALS['PATH']['basename'] . '" />';
        }

        return $sFacebook;
    }

    public function scoreText()
    {
        return ($this->saved == true) ? 'Your' : $this->category . ' ' . $this->system . ' with ' . $this->browser;
    }

    private function _saveISP($aMeta)
    {
        // Check if saving is allowed
        if (empty($this->preventSaving))
        {
            // Get ISP id or create new
            $sISP = $GLOBALS['DatabaseHandler']->real_escape_string($aMeta['isp']);
            $sCode = $GLOBALS['DatabaseHandler']->real_escape_string($aMeta['country_code']);
            $sQuery = "INSERT INTO isp_info SET isp_name = '" . $sISP . "', isp_country_code = '" . $sCode . "' ON DUPLICATE KEY UPDATE isp_info_id = LAST_INSERT_ID(isp_info_id)";
            $GLOBALS['DatabaseHandler']->query($sQuery);
            $iISP = $GLOBALS['DatabaseHandler']->insert_id;
            $sQuery = "INSERT INTO isp_results SET result_summary_id = ?, continent_server_id = ?, isp_info_id = ?, general_category_id = ?,
                              ping_average_milliseconds = ?,  download_average_kbit = ?, upload_average_kbit = ?, download_min_kbit = ?,
                              download_max_kbit = ?, variance_percentage = ?";

            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $stmt->bind_param('iiiidddddd', $this->resultsSummaryId, $_SESSION['continent_id'], $iISP, $GLOBALS['BrowserDetect']->categoryId, $aMeta['ping'],
                                  $aMeta['download'], $aMeta['upload'], $aMeta['lowest'], $aMeta['highest'], $aMeta['variance']);
                $stmt->execute();
            }
        }
    }

    public function export()
    {
        if (isset($GLOBALS['ExportHandler']) && ($GLOBALS['FULL'] == true || $GLOBALS['LoginModel']->hasLoggedIn()))
        {
            // Save data in to session
            $_SESSION['exportData'] = array(
                "details" => ($this->resultsSummaryId == 0 ? 'session' : $this->resultsSummaryId),
                "titles" => array("Name", "Result", "Meta JSON"),
                "data" => array(array("Overall", $this->overall, "")),
            );

            foreach ($this->tests as $sGroup => $aTests)
            {
                $sGroupResult = round($this->groups[$sGroup]);
                $sGroupText = (empty($sGroup)) ? "Single Test Custom" : $sGroup;
                $_SESSION['exportData']['data'][] = array(
                    $sGroupText,
                    $sGroupResult,
                    "",
                );
                foreach ($aTests as $sTest => $fResult)
                {
                    $sResult = round((float) $fResult);
                    $sMeta = (isset($this->testMeta[$sGroup][$sTest])) ? json_encode($this->testMeta[$sGroup][$sTest]) : "";
                    $_SESSION['exportData']['data'][] = array(
                        $sTest,
                        $sResult,
                        addslashes($sMeta),
                    );
                }
            }

            return <<<CSV
                        <div class="export_cvs">
                            <a href="/export.php" class="ready_for_test">Export as CSV</a><span class="DDIcon"></span>
                        </div>
                        <div class="goToPowerBoard"><a href="http://results.rightware.com"><img src="/images/resultBottomBanner.png" alt="Power Board"/></a></div>

CSV;
        }

        return '<div class="ad"><a href="http://results.rightware.com"><img src="/images/resultBottomBanner.png" alt="Power Board"</a></div>';
    }

    public function fetchTOP3 ()
    {
        if ($this->saved)
        {
            $sReturn = '<div class="results_top3 toplist"><h2>Best ' . $this->category . 's</h2>';

            $sNameField = ($this->categoryId > 2) ? 'result_meta.detected_name' : 'os_info.os_name';
            $sExtra = ($this->categoryId > 2) ? 'AND result_meta.detected_name IS NOT NULL' : '';
            // Fetch top 3
            $sQuery = "SELECT CONCAT(result_summaries.browser_info_id, '-', {$sNameField}) AS inter_id, {$sNameField}, browser_info.browser_name,
            browser_info.browser_major_version, browser_info.browser_minor_version, MAX(result_summaries.overall_score) AS max_score,
            result_summaries.summary_time, result_summaries.result_summary_id, COUNT(benchmark_tests.benchmark_test_id) as test_count
            FROM result_summaries
            LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
            LEFT JOIN os_info ON (os_info.os_info_id = result_summaries.os_info_id)
            LEFT JOIN browser_info ON (browser_info.browser_info_id = result_summaries.browser_info_id)
            LEFT JOIN benchmark_tests ON (benchmark_tests.result_summary_id = result_summaries.result_summary_id)
            WHERE result_summaries.deleted = 0 AND result_summaries.general_category_id = ? AND result_meta.valid = 1 AND browser_info.browser_major_version > 0
            AND result_meta.result_version = ?
            {$sExtra}
            GROUP BY result_summaries.result_summary_id
            HAVING test_count > 10
            ORDER BY max_score DESC LIMIT 50";

            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $stmt->bind_param('is', $this->categoryId, $GLOBALS['VERSION']);
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
                        $sReturn .= "                            <div><p><small>{$sTime}</small>\n";
                        $sReturn .= "                            <br><a href=\"{$GLOBALS['HOST']}/results/{$iSummaryId}\" >{$sOSName}\n";
                        $sReturn .= "                              <br>{$sBrowser}</a>\n";
                        $sReturn .= "                            <br><b>{$sScore} points</b></p></div>\n";
                        $iNumber++;
                        $aInters[] = $sInterId;
                    }
                    if ($iNumber >= 4)
                    {
                        break;
                    }
                }

                $stmt->close();
            }

            $sReturn .= '<br clear="all"></div>';
            return $sReturn;
        }

        return '';
    }

}

?>

