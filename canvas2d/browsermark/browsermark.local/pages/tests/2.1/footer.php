<?php

$sSpanStyle = '';
if (isset($_REQUEST['t']))
{
    // Adjust span width
    $sSpanStyle = ' style="width: ' . $_REQUEST['t'] . 'px"';
}

$sPreload = '';

// Get all webgl test images
$aWegGLImages = glob('{' .
    $GLOBALS['ROOT'] . '/public_html/images/*Test.png,' .
    $GLOBALS['ROOT'] . '/public_html/images/running.gif,' .
    $GLOBALS['ROOT'] . '/public_html/images/three_papers.svg}',
GLOB_BRACE);
foreach($aWegGLImages as $sImage)
{
    // Remove path
    $sImage = str_replace($GLOBALS['ROOT'] . '/public_html', '', $sImage);
    $sPreload .= "\n\t\t\t<img src=\"{$sImage}\">";
}

print <<<FOOTER
                    </div>
                    <!-- /Content -->
                </div>
                <!-- /Content Wrapper -->
                <!-- /Footer Shadow -->
               <!-- Footer -->
                <div id="footer" class="group">
                    <!-- Footer content -->
	                    <div id="footer-content">
	                    	<div id="footerLogo">
	                        	<img src="/images/newLogoFooter.png" alt="Rightware">
	                   		 </div>
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
        <!-- Preloader -->
        <div id="preload-images" style="display: none">{$sPreload}
        </div>
        <!-- /Preloader -->
    </body>
</html>
FOOTER;

?>