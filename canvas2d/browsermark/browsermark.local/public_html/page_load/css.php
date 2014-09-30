<?php

header('Content-type: text/css');

if (isset($_GET['rand']))
{
    print <<<CSS
body
{
    font-size: 1em;
}

h3.dostuff-{$_GET['rand']}
{
    color: #fff;
}

img
{
    border: 2px dotted #c0c0c0;
    padding: 2em;
    background: rgba(127,255,0,0.5) !important;
}

p:first-letter
{
    font-size: 3em;
}

CSS;
}

?>