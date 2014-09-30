<?php

/**
 * Export Handler
 *
 * Control data export. Currently only CSV is supported
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * Export Handler class
 * @package Browsermark
 */
class ExportHandler
{
    /**
     * Constructor
     *
     * Initialize ExportHandler
     */
    public function __construct()
    {

    }

    /**
     * Export selected results page as CSV
     *
     * @return void
     */
    public function exportCSV($bNotResult = false)
    {
        // Ensure data is found
        if (isset($_SESSION['exportData']['details']))
        {
            $_SESSION['exportData']['details'] = ($bNotResult) ? $_SESSION['exportData']['details'] : 'result-' . $_SESSION['exportData']['details'];
            // Output download headers
            header("Cache-Control: no-cache");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename={$_SESSION['exportData']['details']}.csv");
            header("Content-Type: text/csv");
            header("Content-Transfer-Encoding: binary");

            // Output instructions
            echo "sep=,\n";

            // Output column titles
            echo '"' . implode('","', $_SESSION['exportData']['titles']) . '"';

            // Output data
            foreach ($_SESSION['exportData']['data'] as $aData)
            {
                echo "\n\"" . implode('","', $aData) . '"';
            }
        }
    }
}

?>