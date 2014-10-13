<?php

// Get domain host
$sDomainHost = $_SERVER['HTTP_HOST'];
if (mb_strtolower($_SERVER['HTTP_HOST']) != mb_strtoupper($_SERVER['HTTP_HOST']))
{
    // Not IP, get last two parts of the domain
    $aDomainParts = explode('.', $_SERVER['HTTP_HOST']);
    $aDomainParts = array_reverse($aDomainParts);
    $sDomainHost = (isset($aDomainParts[1])) ? $aDomainParts[1] . '.' . $aDomainParts[0] : $aDomainParts[0];
}
header("Access-Control-Allow-Origin: *");

$sQuery = isset($_REQUEST['rand']) ? $_REQUEST['rand'] : microtime(true);
$sQuery = str_replace('.', '', $sQuery);

$aVersions = array(
    '2.0' => array('1.7.2', '1.8.19'),
    '2.1' => array('2.0.3', '1.10.3'),
);
$aUseVersion = (isset($_GET['ver']) && isset($aVersions[$_GET['ver']])) ? $aVersions[$_GET['ver']] : $aVersions['2.0'];

// If continent server is
print <<<HEADER
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript">
            // CORS
            document.domain = "{$sDomainHost}";

            var d = new Date();
            var windowLoad = d.getTime();
        </script>
        <title>Page load and responsiveness test</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/page_load/css.php?rand={$sQuery}" type="text/css">
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/{$aUseVersion[0]}/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/{$aUseVersion[1]}/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/page_load/init.js?rand={$sQuery}"></script>
    </head>
    <body>

HEADER;

if (isset($_GET['rand']))
{
    $fTime = microtime();
    $aTime = explode(' ', $fTime);
    $iTime = $aTime[1] + $aTime[0];
    $iStart = $iTime;

    print <<<EOT
<h1>All images from Wikipedia</h1>
<img alt="" src="/page_load/250px-Plants_diversity.jpg" >
<img alt="" src="/page_load/Flora.png?cachetrap={$sQuery}">
<img alt="" src="/page_load/250px-Floristic_regions_in_Europe_(english).png?cachetrap={$sQuery}">
<img alt="" src="/page_load/225px-Plants.jpg">
<img alt="" src="/page_load/200px-Comptonia_columbiana_01.jpg">

<h2>Monk Latin</h2>

<h3 class="dostuff-{$sQuery}">This heading will get inversed</h3>

<p>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis
    facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit. Sed augue orci,
    lacinia eu tincidunt et eleifend nec lacus. Donec ultricies nisl ut felis, suspendisse potenti. Lorem ipsum ligula ut hendrerit mollis,
    ipsum erat vehicula risus, eu suscipit sem libero nec erat. Aliquam erat volutpat. Sed congue augue vitae neque. Nulla consectetuer
    porttitor pede. Fusce purus morbi tortor magna condimentum vel, placerat id blandit sit amet tortor.
</p>

<h3>Normal heading, level 3</h3>

<p>
    Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet, lorem velit accumsan velit vel mattis libero nisl et sem. Proin interdum
    maecenas massa turpis sagittis in, interdum non lobortis vitae massa. Quisque purus lectus, posuere eget imperdiet nec sodales id arcu.
    Vestibulum elit pede dictum eu, viverra non tincidunt eu ligula.
</p>

<p>
    Nam molestie nec tortor. Donec placerat leo sit amet velit. Vestibulum id justo ut vitae massa. Proin in dolor mauris consequat aliquam.
    Donec ipsum, vestibulum ullamcorper venenatis augue. Aliquam tempus nisi in auctor vulputate, erat felis pellentesque augue nec, pellentesque
    lectus justo nec erat. Aliquam et nisl. Quisque sit amet dolor in justo pretium condimentum.
</p>

<h3>Another normal heading, level 3</h3>

<p>
    Vivamus placerat lacus vel vehicula scelerisque, dui enim adipiscing lacus sit amet sagittis, libero enim vitae mi. In neque magna posuere,
    euismod ac tincidunt tempor est. Ut suscipit nisi eu purus. Proin ut pede mauris eget ipsum. Integer vel quam nunc commodo consequat. Integer
    ac eros eu tellus dignissim viverra. Maecenas erat aliquam erat volutpat. Ut venenatis ipsum quis turpis. Integer cursus scelerisque lorem.
    Sed nec mauris id quam blandit consequat. Cras nibh mi hendrerit vitae, dapibus et aliquam et magna. Nulla vitae elit. Mauris consectetuer
    odio vitae augue.
</p>

<h3 class="dostuff-{$sQuery}">Also this heading will have inversed colors</h3>

EOT;

    $fTime = microtime();
    $aTime = explode(' ', $fTime);
    $iTime = $aTime[1] + $aTime[0];
    $iEnd = $iTime;

    $sTotal = round((($iEnd - $iStart) * 1000), 4);

    print <<<DETAILS
    <div id="calculations" style="width: 100%">
        <p>Call time: <span id="call_time">{$_GET['rand']}</span></p>
        <p>PHP load time: <span id="php_loadtime">{$sTotal}</span></p>
        <p>Window load time: <span id="window_load"></span></p>
        <p>Window ready time: <span id="window_ready"></span></p>
        <p>responsiveness in milliseconds: <span id="responsiveness"></span></p>
        <p>Page load time in milliseconds: <span id="page_load"></span></p>
    </div>
DETAILS;
}

print <<<FOOTER
    </body>
</html>

FOOTER;

?>