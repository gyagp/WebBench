<!DOCTYPE html>
<?php

$sTitle = (isset($sTitle)) ? ' - ' . $sTitle : '';
$sOgDescription = (isset($sOgDescription)) ? '<meta property="og:description" content="' . $sOgDescription . '">' : '';

$sBodyClass = ($GLOBALS['PATH']['basename'] == '') ? 'front-page' : $GLOBALS['PATH']['basename'];

print <<<HEADER
<html>
    <head>
        <meta    charset="utf-8">
        <meta    name="viewport"    content="width=1024">
        <meta property="og:image" content="{$GLOBALS['HOST']}/images/brand_for_fb.png">
        {$sOgDescription}
        <title>Browsermark {$sTitle}</title>
    </head>

    <body class="{$sBodyClass}">
        <!-- Wrapper -->
        <div id="wrapper">
            <!-- Header -->
            <div id="header-wrapper">
                <div id="header" class="group">
                    <!-- Logo -->
                    <div id="logo">
                        <a href="/">
                            <img src="/images/logo.png" alt="Rightware" />
                        </a>
                    </div>
                    <!-- /Logo -->

                    <!-- Versioning -->
                    <!--div id="version">

                    </div-->
                    <!-- /Versioning -->


                    <!-- Brand -->
                    <div id="brand">
                        <a href="/">
                            <img src="/images/brand.png" alt="Browsermark" />
                        </a>
                    </div>
                    <!-- /Brand -->

                    <!-- Some -->
                    <div id="header-some">
                        <ul>
                            <li>
                                <a href="/">
                                    <img src="/images/some_twitter.png" alt="Twitter">
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/images/some_linkedin.png" alt="LinkedIn">
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/images/some_facebook.png" alt="Facebook">
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <img src="/images/some_youtube.png" alt="YouTube">
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- /Some -->
                </div>
            </div>
            <!-- /Header -->
            <!-- Exposure -->
            <div id="exposure">
                <!-- Content Wrapper -->
                <div id="content-wrapper">

HEADER;



print <<<CONTENT
                    <!-- Content -->
                    <div id="content">

CONTENT;

?>