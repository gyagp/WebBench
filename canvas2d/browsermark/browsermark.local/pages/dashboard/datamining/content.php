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

// end date
$sEndDate = date('Y-m-d', strtotime('now - 1 day'));

// Count
$sQuery = "SELECT COUNT(result_summary_id) FROM flat_search";
$iCount = 0;
if ($rCount = $GLOBALS['DatabaseHandler']->query($sQuery))
{
    $aCount = $rCount->fetch_row();
    $iCount = $aCount[0];
}

print <<<FORM
<h1>Data mining</h1>

<div id="angular-area" ng-app="dataMining">
<form id="datamining" ng-controller="formCtrl">
<table class="datamining">
<tr>
<td>Time range:</td>
<td><input name="startdate" ng-model="datamining.startdate" ng-change="recalculate(datamining)" type="date" min="2012-11-14" max="{$sEndDate}"> - <input name="enddate" ng-model="datamining.enddate" ng-change="recalculate(datamining)" type="date" min="2012-11-14" max="{$sEndDate}"></td>
<td>Only valid results:</td>
<td><input type="checkbox" name="valid" ng-model="datamining.valid" ng-change="recalculate(datamining)" value="1"> True</td>
</tr>
<tr>
<td>Version:</td>
<td>
<select name="result_version" ng-options="version for version in versions" ng-model="datamining.resultversion" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
<td>Country:</td>
<td>
<select name="country" ng-options="country for country in countries" ng-model="datamining.country" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
</tr>
<tr>
<td>Category:</td>
<td>
<select name="category_name" ng-options="category for category in categories" ng-model="datamining.categoryname" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
<td>Browser:</td>
<td>
<select name="browser-version" ng-options="browser for browser in browsers" ng-model="datamining.browserversion" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
</tr>
<tr>
<td>Engine:</td>
<td>
<select name="engine-version" ng-options="engine for engine in engines" ng-model="datamining.engineversion" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
<td>OS:</td>
<td>
<select name="os-version" ng-options="os for os in oss" ng-model="datamining.osversion" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
</tr>
<tr>
<td>Detected name:</td>
<td>
<select name="detected_name" ng-options="detectedname for detectedname in detectednames" ng-model="datamining.detectedname" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
<td>Given name:</td>
<td>
<select name="given_name" ng-options="givenname for givenname in givennames" ng-model="datamining.givenname" ng-change="recalculate(datamining)">
<option value="">All</option>
</select></td>
</tr>
<tr>
<td>Results per page:</td>
<td><select name="resultsperpage" ng-options="r for r in resultsperpage" ng-model="datamining.resultsperpage"></select></td>
<td>Keyword search:</td>
<td><input type="text" name="keyword" ng-model="datamining.keyword" ng-change="recalculate(datamining)">
<select name="search_field" ng-options="searchfield for searchfield in searchfields" ng-model="datamining.searchfield" ng-change="recalculate(datamining)"></select></td>
</tr>
<tr>
<td>Group results:</td>
<td colspan="3">
<select name="group_field" ng-options="groupfield for groupfield in groupfields" ng-model="datamining.groupfield" ng-change="recalculate(datamining)">
<option value="">No grouping</option>
</select></td>
</tr>
<tr>
<td>Flash support:</td>
<td><input type="checkbox" name="flash" value="1" ng-model="datamining.flash" ng-change="recalculate(datamining)"> True</td>
<td>Silverlight support:</td>
<td><input type="checkbox" name="silverlight" value="1" ng-model="datamining.silverlight" ng-change="recalculate(datamining)"> True</td>
</tr>
<tr>
<td></td>
<td><button ng-click="getdata(datamining)">Get data</button></td>
<td colspan="2" id="count-field">Total rows: {{count}}</td>
</tr>
</table>
<div id="pagination">
<span ng-repeat="n in pageRange" ng-click="getdata(datamining, n)" ng-class="{selected : isSelected(n)}">{{n+1}}</span>
<br clear="all"><p style="text-align: center{{hidden_export}}"><a href="/export.php?notresult" class="ready_for_test">Export as CSV</a></p><br clear="all">
</div>
<div id="results-table">
<table>
<thead>
<tr>
<th ng-repeat="k in notSorted(result[0])">{{k}}</th>
</tr>
</thead>
<tbody>
<tr ng-repeat="k in result">
<td ng-repeat="i in notSorted(k)" ng-init="value = k[i]"><div>{{value}}</div></td>
</tr>
</tbody>
</table>
</div>
</form>
</div>

FORM;

?>