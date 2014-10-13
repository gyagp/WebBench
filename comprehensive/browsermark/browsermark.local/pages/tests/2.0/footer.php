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
    $GLOBALS['ROOT'] . '/public_html/images/running.gif}',
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
                <div id="footer">
                    <!-- Footer content -->
                    <div id="footer-content">
                        <p>Remaining time: <span id="remaining_time"{$sSpanStyle}>4 minutes</span></p>
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