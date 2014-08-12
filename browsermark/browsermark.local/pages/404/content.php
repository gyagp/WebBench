<?php

if (mb_stristr($_SERVER['REQUEST_URI'], '/browsermark'))
{
    header('Location: http://browsermark.rightware.com');
}

print <<<CONTENT
        <p>Page {$GLOBALS['PATH']['fullname']} was not found.</p>

CONTENT;

?>