<?php

require_once(dirname(__FILE__) . '/ispModel.php');

if (!$GLOBALS['LoginModel']->hasLoggedIn())
{
    header("Location: {$GLOBALS['HOST']}");
    exit;
}

// Initialize resultsModel
$_SESSION['ISPModel'] = new ISPModel();

if ($_SESSION['ISPModel']->error == true)
{
    if ($GLOBALS['PATH']['basename'] == 'isp')
    {
        // Generate ISP list
        $GLOBALS['PreProcessor']->generate(array('content.php' => '/isp/isp_list.php'));
    }
    else if (mb_strlen($GLOBALS['PATH']['basename']) == 2 && $_SESSION['ISPModel']->checkCountry($GLOBALS['PATH']['basename']))
    {
        // Generate ISP list based on selected country
        $GLOBALS['PreProcessor']->generate(array('content.php' => '/isp/isp_list.php'));
    }
    else
    {
        // Generate 404
        $GLOBALS['PreProcessor']->generate();
    }
}
else
{
    // Generate content
    $GLOBALS['PreProcessor']->generate(array('content.php' => '/isp/template.php'));
}

?>