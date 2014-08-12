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
                    <ul class="footer_navi">
                        <?php
                        // Available pages and required rights
                        $aPages = array(
                            "dashboard" => $GLOBALS['USER_LEVELS']['client'],
                            "account" => $GLOBALS['USER_LEVELS']['client'],
                            "datamining" => $GLOBALS['USER_LEVELS']['client'],
                            "results" => $GLOBALS['USER_LEVELS']['admin'],
                            "users" => $GLOBALS['USER_LEVELS']['admin'],
                        );
                        //var_dump($GLOBALS['PATH']);
                        foreach ($aPages as $sPage => $iLevel)
                        {
                            if ($_SESSION['login']['rights'] >= $iLevel)
                            {
                                $sSelected = ($GLOBALS['PATH']['basename'] == $sPage) ? ' class="current-page-item"' : '';
                                $sURL = ($sPage == 'dashboard') ? '/dashboard' : "/dashboard/{$sPage}";
                                $sName = mb_convert_case($sPage, MB_CASE_TITLE);
                                echo "<li{$sSelected}><a href=\"{$sURL}\">{$sName}</a></li>\n";
                            }
                        }
                        ?>                            <li style="width: 199px"><a href="/login?logout">Logout</a></li>
                    </ul>
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