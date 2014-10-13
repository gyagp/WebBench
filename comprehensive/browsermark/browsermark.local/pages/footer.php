<?php
$aPages = array(
    "/" => "Main page",
    "http://results.rightware.com/browsermark/" => "Leaderboard",
    //"/isp" => "ISP info",
    "/about" => "About",
    "/disclaimer" => "Disclaimer",
);
$sFooterNavi = '';
foreach($aPages as $sURL => $sName)
{
    $sCurrent = ((mb_strlen($GLOBALS['PATH']['dirname']) > 1 && $GLOBALS['PATH']['dirname'] == $sURL) || $GLOBALS['PATH']['dirname'] . $GLOBALS['PATH']['basename'] == $sURL)
        ? ' class="current-page-item"'
        : '';
    $sFooterNavi .= "<li{$sCurrent}><a href=\"{$sURL}\">{$sName}</li>";
}

// If database is available
if ($GLOBALS['DB'])
{
    // If user has logged in, show link to dashboard
    if ($GLOBALS['LoginModel']->hasLoggedIn())
    {
        if ($_SESSION['login']['rights'] == $GLOBALS['USER_LEVELS']['visitor'])
        {
            $sFooterNavi .= '<li><a href="/login?logout">Logout</a></li>';
        }
        else
        {
            $sFooterNavi .= '<li><a href="/dashboard">Dashboard</a></li>';
        }
    }
    // Otherwise show copyright
    else
    {
        $sFooterNavi .= '<li><a href="http://www.rightware.com">&copy; Rightware Ltd.</a></li>';
    }
}

print <<<FOOTER
                    </div>
                    <!-- /Content -->
                </div>
                <!-- /Content Wrapper -->
                <!-- Footer Shadow -->
                <div id="footer-shadow"></div>
                <!-- /Footer Shadow -->
                <!-- Footer -->
                <div id="footer" class="group">
                    <!-- Footer content -->
                    <div id="footer-content">
                        <div id="footerLogo">
                            <img src="/images/newLogoFooter.png" alt="Rightware">
                        </div>
                        <ul class="footer_navi">{$sFooterNavi}</ul>
                        <ul class="crumb_path">
                            <li><a href="/">Home</a></li>
                        </ul>
	                    <hr>
                    	<div class="footer-left"><a href="/privacy-policy">Privacy Policy</a></div>
                    	<div class="footer-right">Copyright © Rightware. All rights reserved.</div>
                    </div>
                    <!-- /Footer content -->
                </div>
                <!-- /Footer -->
            </div>
            <!-- /Exposure -->
        </div>
        <!-- /Wrapper -->
    </body>
</html>
FOOTER;

?>