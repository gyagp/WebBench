<?php
// Ensure we have result id and given name
if (isset($_POST['given_name'], $_POST['results_id']) && !empty($_POST['given_name']) && !empty($_POST['results_id']))
{
    // Save details
    $sQuery = "SELECT result_meta_id FROM result_summaries WHERE result_summary_id = ?";
    if ($stmt = $GLOBALS['DatabaseHandler']->prepare($sQuery))
    {
        $iResultId = (int) $_POST['results_id'];
        $stmt->bind_param('i', $iResultId);
        $stmt->execute();
        $stmt->bind_result($iMetaId);
        $stmt->fetch();
        if ($stmt->prepare("UPDATE result_meta SET given_name = ? WHERE result_meta_id = ? AND valid = 0 AND given_name IS NULL LIMIT 1"))
        {
            $stmt->bind_param('si', $_POST['given_name'], $iMetaId);
            $stmt->execute();
            $sCompare = '';

            // If Power Board connector found, submit result
            if (isset($GLOBALS['PowerboardConnector']))
            {
                if ($sURL = $GLOBALS['PowerboardConnector']->submit($_POST['given_name']))
                {
                    $sCompare = "<a href=\"{$sURL}\" id=\"pb_compare\" target=\"_blank\">Compare results</a>";
                }
            }
            print <<<THANKYOU
{$sCompare}
THANKYOU;

        }
    }
}

?>