
<a href='index.html'>Home</a><br />
<?php
    function getStdDev($mean, $validResults) {
        $stddev = 0;
        $total  = 0;
        foreach ( $validResults as $result ) {
            $total += ($result - $mean) * ($result - $mean);
        }
        return ( $total == 0)? 0 : sqrt($total/count($validResults));
    }

    $link = mysql_connect('localhost', 'root', 'intel0');
    if (!$link) {
        die('Could not connect: ' . mysql_error());
    }
    mysql_select_db("iefishtank_120", $link);

    $result = mysql_query('select * from results order by ts DESC;');
    if (!$result) {
            die('Invalid query: ' . mysql_error());
    }
    print "<table border='1'>\n";
    print "<tr style='vertical-align: top'>";
    print "<th width='5%'>Test ID</th>";
    print "<th width='15%'>Created</th>";
    print "<th width='10%'>IP Addr</th>";
    print "<th width='35%'>User-Agent</th>";
    print "<th width='10%'>Resolution</th>";
    print "<th width='5%'># of Runs</th>";
    print "<th width='5%'># of Fish</th>";
    print "<th width='10%'>Mean (fps)</th>";
    print "<th width='10%'>Frames</th>";
    print "</tr>\n";
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        print "<tr style='vertical-align: top'>";
        $set   = explode(",",  $row['ds']);
        $mean  = 0;
        $runCount = 0;
        $total = 0;
        $validResults = array();
        foreach ( $set as $settime ) {
            if ( is_numeric( $settime ) ) {
                $total += $settime;
                $runCount++;
                array_push($validResults, $settime);
            }
        }
        $mean = sprintf("%0.2f", ( $total / $runCount));
        $stddev = sprintf("%0.2f", getStdDev($mean, $validResults));

        print "<td>" . $row['id'] . "</td>";
        print "<td>" . $row['ts'] . "</td>";
        print "<td>" . $row['ip'] . "</td>";
        print "<td>" . $row['ua'] . "</td>";
        print "<td>" . $row['w'] . "x" . $row['h'] . "</td>";
        print "<td>$runCount</td>";
        print "<td>" . $row['fish'] . "</td>";
        print "<td>$mean</td>";
        print "<td>" . $row['frames'] . "</td>";
        print "</tr>\n";
    }
    print "</table>\n";
    mysql_free_result($result);
    mysql_close($link);
?>
