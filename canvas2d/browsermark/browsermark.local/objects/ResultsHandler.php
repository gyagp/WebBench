<?php

/**
 * Results Handler
 *
 * Is responsible for all results
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * Results Handler class
 * @package Browsermark
 */
class ResultsHandler
{
    /**
     * @private browser id in table browser_info
     */
    private $_browserInfoId;
    /**
     * @private browser layout engine in table browser_layout_engines
     */
    private $_browserLayoutEngineId;
    /**
     * @private general category id in table general_categories
     */
    private $_generalCategoryId;
    /**
     * @private os id in table os_info
     */
    private $_osInfoId;
    /**
     * @public result summary id
     */
    public  $resultSummaryId;

    /**
     * Constructor initialize all the id that is needed and create cross-binding to database for easier search
     */
    public function __construct()
    {
        // Initialize IDs
        $this->_initLayoutEngine();
        $this->_initBrowserInfo();
        $this->_initGeneralCategory();
        $this->_initOSInfo();

        // Now when IDs are initialized, we can create bindings between non-test information
        $this->_browserInfoToGeneralCategory();
        $this->_browserInfoToOSInfo();
        $this->_browserLayoutEngineToGeneralCategory();
        $this->_browserLayoutEngineToOSInfo();
    }

    /**
     * Calculate test final score from raw score against compare score
     *
     * @param $fRawScore raw score
     * @param $fCompareScore compare score
     * @param bool $bIsConformity if test was conformity test, set this to true
     * @return string Return json-encoded string
     */
    public function testFinalScore($fRawScore, $fCompareScore, $bIsConformity = false)
    {
        if ($bIsConformity)
        {
            // Conformity scores are used as is, create return object
            return json_encode(array('finalScore' => $fRawScore, 'formula' => 'N/A'));
        }
        else
        {
            // Benchmark scores use formula 1000 * (score / compare), if compare score is zero, use 1 instead
            $fCompareScore = ($fCompareScore == 0) ? 1 : $fCompareScore;
            $fFinalScore = 1000 * ((float) $fRawScore / (float) $fCompareScore);

            // Return object
            return json_encode(array('finalScore' => $fFinalScore, 'formula' => "1000 &times; ({$fRawScore} &divide; {$fCompareScore})"));
        }
    }

    /**
     * Default method for calculating group final score. Use arithmetic mean.
     *
     * @param $aScores All sub-test scores
     * @return float|int Group score
     */
    public function groupFinalArithmetic($aScores)
    {
        // Group final score is calculated with arithmetic average
        if (count($aScores > 0))
        {
            return array_sum($aScores) / count($aScores);
        }
        else
        {
            return 0;
        }
    }

    /**
     * Alternative method for calculating group score. Use geometric mean.
     *
     * @param $aScores All sub-test scores
     * @return int|number Group score
     */
    public function groupFinalGeomean($aScores)
    {
        // Geometric mean
        if (count($aScores > 0))
        {
            $iLength = count($aScores);
            $iMultiplication = 1;
            foreach ($aScores as $iScore)
            {
                if ($iScore != 0)
                {
                    $iMultiplication *= $iScore;
                }
            }
            return pow($iMultiplication, 1/$iLength);
        }
        else
        {
            return 0;
        }
    }

    /**
     * Default method for calculating overall score. Use arithmetic mean.
     *
     * @param $aGroupScores All sub-group scores
     * @return float|int Overall score
     */
    public function overallFinalArithmetic($aGroupScores)
    {
        // Overall final score is calculated with arithmetic average
        if (count($aGroupScores > 0))
        {
            return array_sum($aGroupScores) / count($aGroupScores);
        }
        else
        {
            return 0;
        }
    }

    /**
     * Alternative method for calculating overall score. Use geometric mean.
     *
     * @param $aGroupScores All sub-group scores
     * @return float|int Overall score
     */
    public function overallFinalGeomean($aGroupScores)
    {
        // Geometric mean
        if (count($aGroupScores > 0))
        {
            $iLength = count($aGroupScores);
            $iMultiplication = 1;
            foreach ($aGroupScores as $iScore)
            {
                if ($iScore != 0)
                {
                    $iMultiplication *= $iScore;
                }
            }
            return pow($iMultiplication, 1/$iLength);
        }
        else
        {
            return 0;
        }
    }

    /**
     * Calculate superior percentage (how many percentages of other benchmarks have been less than given score).
     *
     * @param $fOverall Overall score
     * @return float|int Return rounded superior percentage
     */
    public function superiorPercentage($fOverall, $iCategory)
    {
        if ($fOverall == 0)
        {
            return 0;
        }

        $sQuery = "SELECT COUNT(result_summary_id) FROM result_summaries
                            LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
                            WHERE result_summaries.deleted = 0 AND result_summaries.general_category_id = ? AND result_meta.result_version = ?";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('is', $iCategory, $GLOBALS['VERSION']);
            $stmt->execute();
            $stmt->bind_result($iAll);
            $stmt->fetch();
            $stmt->close();

            $sQuery = "SELECT COUNT(result_summary_id) FROM result_summaries
                                LEFT JOIN result_meta ON (result_meta.result_meta_id = result_summaries.result_meta_id)
                                WHERE result_summaries.deleted = 0 AND result_summaries.general_category_id = ? AND result_summaries.overall_score < ? AND result_meta.result_version = ?";
            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
            {
                $stmt->bind_param('ids', $iCategory, $fOverall, $GLOBALS['VERSION']);
                $stmt->execute();
                $stmt->bind_result($iUnder);
                $stmt->fetch();

                if ($iAll == 1)
                {
                    return 100;
                }
                else if ($iUnder == 0)
                {
                    return 0;
                }
                else
                {
                    return round(($iUnder / $iAll * 100), 0);
                }
            }
        }

        return '?';

    }

    /**
     * Results saver. Handle all saves to database.
     *
     * @param $fOverall Overall score
     * @param $aTestRun Test run details
     * @param $aConformityGroups Conformity group names
     * @param $aTestMeta Test run meta information
     * @param $bValid Validity of the test run
     * @return bool Return true if save was done correctly, otherwise false
     */
    public function saveResult($fOverall, $aTestRun, $aConformityGroups, $aTestMeta, $bValid)
    {
        // Hash check to prevent double saves
        $sHash = md5(serialize($aTestRun));
        if (count($aTestRun) > 0 && (!isset($_SESSION['result_hash']) || $_SESSION['result_hash'] != $sHash))
        {
            // Ensure that at least browser and category is something else than unknown
            if ($this->_browserInfoId != 1 && $this->_generalCategoryId != 1)
            {
                // All good, save hash and continue
                $_SESSION['result_hash'] = $sHash;

                // First save meta information
                $sQuery = 'INSERT INTO result_meta SET `valid` = ?, result_version = ?, user_agent = ?, detected_name = ?';
                if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                {
                    $iValid = (int) $bValid;
                    $stmt->bind_param('isss', $iValid, $GLOBALS['VERSION'], $GLOBALS['BrowserDetect']->userAgent, $GLOBALS['BrowserDetect']->deviceName);
                    if ($stmt->execute())
                    {
                        // Meta information saved, get ID and continue
                        $iResultMetaId = $stmt->insert_id;
                        $stmt->close();

                        // Save summary
                        $sQuery = 'INSERT INTO result_summaries SET browser_info_id = ?, os_info_id = ?, general_category_id = ?, result_meta_id = ?, general_user_id = ?, overall_score = ?';
                        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                        {
                            $fOverall = (float) $fOverall;
                            $iUser = (isset($_SESSION['login']['id'])) ? $_SESSION['login']['id'] : 0;
                            $stmt->bind_param('iiiiid', $this->_browserInfoId, $this->_osInfoId, $this->_generalCategoryId, $iResultMetaId, $iUser, $fOverall);
                            if ($stmt->execute())
                            {
                                // Result summary saved, get id
                                $iResultSummaryId = $stmt->insert_id;
                                $this->resultSummaryId = (int) $iResultSummaryId;
                                $stmt->close();

                                foreach ($aTestRun as $sGroup => $aTests)
                                {
                                    // Group is "Single Test Custom" if empty
                                    $sGroupName = (empty($sGroup)) ? 'Single Test Custom' : $sGroup;

                                    // Ensure there is at least one test
                                    if (count($aTests))
                                    {
                                        // Get group id
                                        if ($iGroupId = $this->_getId($sGroupName, 'group'))
                                        {
                                            // Group found, save group result
                                            $fGroupScore = array_sum($aTests) / count($aTests);
                                            $sQuery = "INSERT INTO benchmark_group_results SET result_summary_id = ?, browsermark_group_id = ?, group_score = ?";
                                            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                                            {
                                                $stmt->bind_param('iid', $iResultSummaryId, $iGroupId, $fGroupScore);
                                                if ($stmt->execute())
                                                {
                                                    $iGroupResultId = $stmt->insert_id;
                                                    $stmt->close();

                                                    // Save group result keys
                                                    $this->_benchmarkGroupResultToBrowserInfo($iGroupResultId);
                                                    $this->_benchmarkGroupResultToBrowserLayoutEngine($iGroupResultId);
                                                    $this->_benchmarkGroupResultToGeneralCategory($iGroupResultId);
                                                    $this->_benchmarkGroupResultToOSInfo($iGroupResultId);

                                                    // Loop through individual tests
                                                    foreach ($aTests as $sTest => $fResult)
                                                    {
                                                        // Get test id
                                                        if ($iTestId = $this->_getId($sTest, 'test'))
                                                        {
                                                            // Conformity tests and benchmark tests are saved differently
                                                            if (!in_array($sGroup, $aConformityGroups))
                                                            {
                                                                // Benchmark test
                                                                $sQuery = "INSERT INTO benchmark_tests
                                                                                    SET result_summary_id = ?, benchmark_group_result_id = ?, browsermark_group_id = ?,
                                                                                    browsermark_test_id = ?, benchmark_score = ?, compare_score = ?, raw_score = ?";
                                                                if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                                                                {
                                                                    $fCompareScore = (isset($aTestMeta[$sGroup][$sTest]['compareScore'])) ? $aTestMeta[$sGroup][$sTest]['compareScore'] : 1;
                                                                    $fRawScore = (isset($aTestMeta[$sGroup][$sTest]['ops'])) ? $aTestMeta[$sGroup][$sTest]['ops'] : 0;
                                                                    $stmt->bind_param('iiiiddd', $iResultSummaryId, $iGroupResultId, $iGroupId, $iTestId, $fResult, $fCompareScore, $fRawScore);
                                                                    if ($stmt->execute())
                                                                    {
                                                                        $iTestResultId = $stmt->insert_id;
                                                                        $stmt->close();

                                                                        // Save test result keys
                                                                        $this->_benchmarkTestToBrowserInfo($iTestResultId);
                                                                        $this->_benchmarkTestToBrowserLayoutEngine($iTestResultId);
                                                                        $this->_benchmarkTestToGeneralCategory($iTestResultId);
                                                                        $this->_benchmarkTestToOSInfo($iTestResultId);

                                                                        if (isset($aTestMeta[$sGroup][$sTest]))
                                                                        {
                                                                            // Save test meta, only accepted fields are elapsedTime, operations, ops and compareScore (except on full version or if logged in user, which saves everything)
                                                                            $aAccepted = array('elapsedTime', 'operations', 'ops', 'compareScore', 'server', 'loadTimes', 'loadMedian', 'responseTimes', 'responseMedian');
                                                                            $aMeta = array();
                                                                            foreach ($aAccepted as $sKey)
                                                                            {
                                                                                if (isset($aTestMeta[$sGroup][$sTest][$sKey]))
                                                                                {
                                                                                    $aMeta[$sKey] = $aTestMeta[$sGroup][$sTest][$sKey];
                                                                                }
                                                                            }

                                                                            $sMeta = ($GLOBALS['FULL'] || $GLOBALS['LoginModel']->hasLoggedIn()) ? json_encode($aTestMeta[$sGroup][$sTest]) : json_encode($aMeta);
                                                                            $sQuery = "INSERT INTO test_meta SET is_conformity = 0, test_id = ?, meta_information = ?";
                                                                            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                                                                            {
                                                                                $stmt->bind_param('is', $iTestResultId, $sMeta);
                                                                                $stmt->execute();
                                                                                $stmt->close();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                // Conformity tests
                                                                $sQuery = "INSERT INTO conformity_tests SET result_summary_id = ?, browsermark_test_id = ?, conformity_score = ?, raw_score = ?, max_score = ?";
                                                                if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                                                                {
                                                                    $fRawScore = (isset($aTestMeta[$sGroup][$sTest]['pts'])) ? $aTestMeta[$sGroup][$sTest]['pts'] : $fResult;
                                                                    $fMaxScore = (isset($aTestMeta[$sGroup][$sTest]['max'])) ? $aTestMeta[$sGroup][$sTest]['max'] : 1;
                                                                    $stmt->bind_param('iiddd', $iResultSummaryId, $iTestId, $fResult, $fRawScore, $fMaxScore);
                                                                    if ($stmt->execute())
                                                                    {
                                                                        $iTestResultId = $stmt->insert_id;
                                                                        $stmt->close();

                                                                        // Save conformity result keys
                                                                        $this->_conformityTestToBrowserInfo($iTestResultId);
                                                                        $this->_conformityTestToBrowserLayoutEngine($iTestResultId);
                                                                        $this->_conformityTestToGeneralCategory($iTestResultId);
                                                                        $this->_conformityTestToOSInfo($iTestResultId);

                                                                        // Save test meta
                                                                        if (isset($aTestMeta[$sGroup][$sTest]))
                                                                        {
                                                                            // In conformity we save all metadata
                                                                            $sMeta = json_encode($aTestMeta[$sGroup][$sTest]);
                                                                            $sQuery = "INSERT INTO test_meta SET is_conformity = 1, test_id = ?, meta_information = ?";
                                                                            if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
                                                                            {
                                                                                $stmt->bind_param('is', $iTestResultId, $sMeta);
                                                                                $stmt->execute();
                                                                                $stmt->close();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                // Powerboard
                                /*if (isset($GLOBALS['PowerboardConnector']))
                                {
                                    // Requirements:
                                    // 1. Device must be tablet or phone
                                    // 2. Test run must be valid
                                    // 3. Device have name (other than Unknown)
                                    // 4. All tests are done
                                    // 5. Version is not full version (to prevent accidental data escape from test environments)
                                    // 6. Version number is 1.0 or higher (to prevent alpha/beta phase submissions)
                                    $aRequirements = array(
                                        ($this->_generalCategoryId > 2),
                                        ($bValid),
                                        (!empty($GLOBALS['BrowserDetect']->deviceName)),
                                        ($GLOBALS['BrowserDetect']->deviceName != 'Unknown'),
                                        /* This cannot be done like this: (count($aTestRun) == count($GLOBALS['TESTS'])-2) */
                                        /*(!$GLOBALS['FULL']),
                                        ((float) $GLOBALS['VERSION'] >= 1.0),
                                    );

                                    if (!in_array(false, $aRequirements))
                                    {
                                        $GLOBALS['PowerboardConnector']->send($fOverall, $aTestRun, $aConformityGroups);
                                    }
                                }*/

                                // All done what could have been done, return result summary id
                                return $iResultSummaryId;

                            }
                        }
                    }
                }
            }
        }

        // Something went wrong, return false
        return false;

    }

    /**
     * Return the id of the group/test.
     *
     * @param $sName Name of the group/test (example "CSS 0.9")
     * @param $sTable Table name of the group/test (example "group"
     * @return int|bool Return id of the group/test or false if group/test was not found.
     */
    private function _getId($sName, $sTable)
    {
        // Explode name in parts
        $aParts = explode(' ', $sName);
        // Pop out the version
        $sVersion = array_pop($aParts);
        // Generate name without version number
        $sName = str_replace(" {$sVersion}", '', $sName);

        $sQuery = "SELECT browsermark_{$sTable}_id FROM browsermark_{$sTable}s WHERE {$sTable}_name = ? AND {$sTable}_version = ? AND deleted = 0 LIMIT 1";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ss', $sName, $sVersion);
            $stmt->execute();
            $stmt->bind_result($iId);
            if ($stmt->fetch())
            {
                return $iId;
            }
        }
        return false;
    }

    /**
     * Initialize layout engine
     */
    private function _initLayoutEngine()
    {
        // Query
        $sQuery = "INSERT INTO browser_layout_engines SET engine_name = ?, engine_major_version = ?, engine_minor_version = ?, engine_build_version = ?,
                                engine_revision_version = ? ON DUPLICATE KEY UPDATE browser_layout_engine_id = LAST_INSERT_ID(browser_layout_engine_id)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('siiii',
                $GLOBALS['BrowserDetect']->layoutEngine,
                $GLOBALS['BrowserDetect']->layoutMajor,
                $GLOBALS['BrowserDetect']->layoutMinor,
                $GLOBALS['BrowserDetect']->layoutBuild,
                $GLOBALS['BrowserDetect']->layoutRevision
            );

            if ($stmt->execute())
            {
                // Set browser layouet engine id
                $this->_browserLayoutEngineId = $stmt->insert_id;
            }
        }
    }

    /**
     * Initialize browser
     */
    private function _initBrowserInfo()
    {
        // Query
        $sQuery = "INSERT INTO browser_info SET browser_layout_engine_id = ?, browser_name = ?, browser_major_version = ?, browser_minor_version = ?,
                                browser_build_version = ?, browser_revision_version = ? ON DUPLICATE KEY UPDATE browser_info_id = LAST_INSERT_ID(browser_info_id)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('isiiii',
                $this->_browserLayoutEngineId,
                $GLOBALS['BrowserDetect']->browser,
                $GLOBALS['BrowserDetect']->browserMajor,
                $GLOBALS['BrowserDetect']->browserMinor,
                $GLOBALS['BrowserDetect']->browserBuild,
                $GLOBALS['BrowserDetect']->browserRevision
            );

            if ($stmt->execute())
            {
                // Set browser info id
                $this->_browserInfoId = $stmt->insert_id;
            }
        }
    }

    /**
     * Initialize general category
     */
    private function _initGeneralCategory()
    {
        // Unlike others general categories are predefined and cannot be changed based on tested browser & device
        $sQuery = "SELECT general_category_id FROM general_categories WHERE category_name = ?";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('s', $GLOBALS['BrowserDetect']->category);
            if ($stmt->execute())
            {
                $stmt->bind_result($iId);
                if ($stmt->fetch())
                {
                    $this->_generalCategoryId = $iId;
                }
            }
        }
    }

    /**
     * Initialize OS
     */
    private function _initOSInfo()
    {
        // Query
        $sQuery = "INSERT INTO os_info SET os_name = ?, os_major_version = ?, os_minor_version = ?,
                                os_build_version = ?, os_revision_version = ? ON DUPLICATE KEY UPDATE os_info_id = LAST_INSERT_ID(os_info_id)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('siiii',
                $GLOBALS['BrowserDetect']->os,
                $GLOBALS['BrowserDetect']->osMajor,
                $GLOBALS['BrowserDetect']->osMinor,
                $GLOBALS['BrowserDetect']->osBuild,
                $GLOBALS['BrowserDetect']->osRevision
            );

            if ($stmt->execute())
            {
                // Set browser info id
                $this->_osInfoId = $stmt->insert_id;
            }
        }
    }

    /**
     * Bind benchmark groups to browser
     * @param $iId benchmark group id
     */
    private function _benchmarkGroupResultToBrowserInfo($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_group_results_browser_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_browserInfoId);
            $stmt->execute();
        }
    }

    /**
     * Bind benchmark groups to layout engine
     * @param $iId benchmark group id
     */
    private function _benchmarkGroupResultToBrowserLayoutEngine($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_group_results_browser_layout_engines VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_browserLayoutEngineId);
            $stmt->execute();
        }
    }

    /**
     * Bind benchmark groups to general category
     * @param $iId benchmark group id
     */
    private function _benchmarkGroupResultToGeneralCategory($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_group_results_general_categories VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_generalCategoryId);
            $stmt->execute();
        }
    }

    /**
     * Bind benchmark groups to OS
     * @param $iId benchmark group id
     */
    private function _benchmarkGroupResultToOSInfo($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_group_results_os_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_osInfoId);
            $stmt->execute();
        }
    }

    /**
     * Bind benchmark test to browser
     * @param $iId benchmark test id
     */
    private function _benchmarkTestToBrowserInfo($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_tests_browser_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_browserInfoId);
            $stmt->execute();
        }
    }

    /**
     * Bind benchmark test to layout engine
     * @param $iId benchmark test id
     */
    private function _benchmarkTestToBrowserLayoutEngine($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_tests_browser_layout_engines VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_browserLayoutEngineId);
            $stmt->execute();
        }
    }

    /**
     * Bind benchmark test to general category
     * @param $iId benchmark test id
     */
    private function _benchmarkTestToGeneralCategory($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_tests_general_categories VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_generalCategoryId);
            $stmt->execute();
        }
    }

    /**
     * Bind benchmark test to OS
     * @param $iId benchmark test id
     */
    private function _benchmarkTestToOSInfo($iId)
    {
        $sQuery = "INSERT INTO key_benchmark_tests_os_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_osInfoId);
            $stmt->execute();
        }
    }

    /**
     * Bind browser to general category
     */
    private function _browserInfoToGeneralCategory()
    {
        $sQuery = "INSERT INTO key_browser_info_general_categories VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $this->_browserInfoId, $this->_generalCategoryId);
            $stmt->execute();
        }
    }

    /**
     * Bind browser to OS
     */
    private function _browserInfoToOSInfo()
    {
        $sQuery = "INSERT INTO key_browser_info_os_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $this->_browserInfoId, $this->_osInfoId);
            $stmt->execute();
        }
    }

    /**
     * Bind layout engine to general category
     */
    private function _browserLayoutEngineToGeneralCategory()
    {
        $sQuery = "INSERT INTO key_browser_layout_engines_general_categories VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $this->_browserLayoutEngineId, $this->_generalCategoryId);
            $stmt->execute();
        }
    }

    /**
     * Bind layout engine to OS
     */
    private function _browserLayoutEngineToOSInfo()
    {
        $sQuery = "INSERT INTO key_browser_layout_engines_os_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $this->_browserLayoutEngineId, $this->_osInfoId);
            $stmt->execute();
        }
    }

    /**
     * Bind conformity test to browser
     * @param $iId conformity test id
     */
    private function _conformityTestToBrowserInfo($iId)
    {
        $sQuery = "INSERT INTO key_conformity_tests_browser_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_browserInfoId);
            $stmt->execute();
        }
    }

    /**
     * Bind conformity test to layout engine
     * @param $iId conformity test id
     */
    private function _conformityTestToBrowserLayoutEngine($iId)
    {
        $sQuery = "INSERT INTO key_conformity_tests_browser_layout_engines VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_browserLayoutEngineId);
            $stmt->execute();
        }
    }

    /**
     * Bind conformity test to general category
     * @param $iId conformity test id
     */
    private function _conformityTestToGeneralCategory($iId)
    {
        $sQuery = "INSERT INTO key_conformity_tests_general_categories VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_generalCategoryId);
            $stmt->execute();
        }
    }

    /**
     * Bind conformity test to OS
     * @param $iId conformity test id
     */
    private function _conformityTestToOSInfo($iId)
    {
        $sQuery = "INSERT INTO key_conformity_tests_os_info VALUES(?, ?)";
        if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
        {
            $stmt->bind_param('ii', $iId, $this->_osInfoId);
            $stmt->execute();
        }
    }

}

?>