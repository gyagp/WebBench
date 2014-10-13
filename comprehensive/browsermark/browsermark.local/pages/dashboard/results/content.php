<?php

// Required rights
$aRequiredRights = array (
    "view"  => $GLOBALS['USER_LEVELS']['admin'],
    "edit" => $GLOBALS['USER_LEVELS']['admin'],
    "delete" => $GLOBALS['USER_LEVELS']['admin'],
);

// Only for logged in users who have enough rights to view
if (!$GLOBALS['LoginModel']->hasLoggedIn() || $_SESSION['login']['rights'] < $aRequiredRights['view'])
{
    header("Location: {$GLOBALS['HOST']}");
    exit;
}

// Get version numbers
$sVersions = '';
$oVersions = $GLOBALS['DatabaseHandler']->query("SELECT DISTINCT result_version FROM result_meta ORDER BY result_version DESC");
$iCnt = 1;
while ($aVersion = $oVersions->fetch_assoc())
{
    $sVersions .= "                                    <option value=\"{$aVersion['result_version']}\">{$aVersion['result_version']}</option>\n";
}

// Get valid names from result_meta
$sQuery = "SELECT DISTINCT detected_name FROM result_meta WHERE valid = 1 ORDER BY detected_name ASC";
$oResult = $GLOBALS['DatabaseHandler']->query($sQuery);
$sDevices = '';
while ($aRes = $oResult->fetch_assoc())
{
    $sDevices .= "\r\n                          <option value=\"{$aRes['detected_name']}\">";
}


print <<<EOT
                        <h1>Manage results</h1>

                        <p>Select version:
                            <select name="version" id="manage-results-version">
                                <option value="0">-- select --</option>
{$sVersions}
                            </select>
                            or type ID you want to open:
                            <input type="text" name="summary_id" id="manage-results-id">
                            <input type="submit" value="Open ID" id="manage-results-submit">
                        </p>

                        <h2 id="results-title"></h2>
                        <datalist id="devices">{$sDevices}
                        </datalist>
                        <div id="results-list"></div>

EOT;

?>
