<?php

class MasterScripts
{
    public function __construct()
    {
        $GLOBALS['OB'][__CLASS__] = 'obHandle';
    }
    public function obHandle($sContent)
    {
        // Generate master scripts
        $sMasterScripts = '<script type="text/javascript"  src="/js/' . $_SESSION['VERSION'] . '/jquery.min.js"></script>';
        $sMasterScripts .= '<script type="text/javascript"  src="/js/' . $_SESSION['VERSION'] . '/jquery-ui.min.js"></script>';
        $sMasterScripts .= '<script type="text/javascript"  src="/js/' . $_SESSION['VERSION'] . '/swfobject.js"></script>';

        // Handlebars will be only in /tests/2.1
        if (mb_stristr($GLOBALS['PATH']['dirname'], 'tests/2.1') || mb_stristr($GLOBALS['PATH']['basename'], '2.1'))
        {
            $sMasterScripts .= '<script type="text/javascript"  src="/js/' . $_SESSION['VERSION'] . '/handlebars.js"></script>';
        }

        // Open sans
        $sMasterScripts .= '<link href="/css/open-sans.css" rel="stylesheet" type="text/css">';
        return str_replace('</title>', "</title>\n{$sMasterScripts}", $sContent);

    }
}