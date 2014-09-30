<!DOCTYPE html>
<?php

// If came to test without going through front page, redirect back
if (!isset($_SESSION['validity']) && isset($_REQUEST['autorun']) && $GLOBALS['LoginModel']->hasLoggedIn())
{
    // Raise the flag so result is not saved
    $_SESSION['validity'] = 0;
    $_SESSION['autorun'] = true;
}
else if (!isset($_SESSION['validity']))
{
    header("Location: {$GLOBALS['HOST']}");
}

$sTitle = " - Rocking and rolling, please wait";

print <<<HEADER
<html>
    <head>
        <meta    charset="utf-8">
        <meta    name="viewport"    content="width=1024">
        <meta http-equiv="refresh" content="600;URL='{$GLOBALS['HOST']}/results'">
        <title>Browsermark{$sTitle}</title>
    </head>

    <body>
        <!-- Wrapper -->
        <div id="wrapper">
            <!-- Header -->
            <div id="header-wrapper">
                <div id="header">
                    <!-- Logo -->
                    <div id="logo">
                        <a href="/">
                            <img src="/images/logo.png" alt="Rightware" />
                        </a>
                    </div>
                    <!-- /Logo -->
                    <!-- Versioning -->
                    <!--div id="version">
                        <a href="/">
                            {$_SESSION['VERSION']}
                        </a>
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
                    </div>
                    <!-- /Some -->
                </div>
            </div>
            <!-- /Header -->
            <!-- Exposure -->
            <div id="exposure">
                <!-- Content Wrapper -->
                <div id="content-wrapper">
                    <!-- Content -->
                    <div id="content">

HEADER;

?>