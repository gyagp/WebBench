<?php
    $columns = array("id" => "Test ID", "ts" => "Created",
                     "ip" => "IP Addr", "ua" => "User-Agent",
                     "w" => "Width", "h" => "Height",
                     "mean" => "Average Score");
    $link = mysql_connect('localhost', 'root', 'intel0');
    if (!$link) {
        die('Could not connect: ' . mysql_error());
    }
    mysql_select_db("iefishtank_120", $link);

    $ip        = mysql_real_escape_string($_SERVER['REMOTE_ADDR']);
    $ua        = mysql_real_escape_string($_SERVER['HTTP_USER_AGENT']);
    $width     = mysql_real_escape_string($_GET['width']);
    $height    = mysql_real_escape_string($_GET['height']);
    $resultSet = mysql_real_escape_string($_GET['results']);
    $fish      = mysql_real_escape_string($_GET['fish']);
    $frames    = mysql_real_escape_string($_GET['frames']);
    if ($resultSet) {
        $isql  = "insert into results (ip, ua, w, h, ds, fish, frames) ";
        $isql .= " values('$ip','$ua','$width','$height','$resultSet','$fish', '$frames')";
        $insert = mysql_query($isql);
        # results (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ts
        #    TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ip VARCHAR(16), ua
        #    VARCHAR(2048), w INT, h INT, ds VARCHAR(512) NOT NULL);
        if ( ! $insert ) {
            print "Failed Inserting Row: $isql<br />";
        }
    }
    mysql_close($link);
    header('Location: results.php')
?>
