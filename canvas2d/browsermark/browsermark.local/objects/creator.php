<?php

/**
 * Objects creator
 *
 * Initialize all objects found under /objects and place them under $GLOBALS
 *
 * @version 2.0
 * @package Configuration
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

// Fetch objects
$aObjects = glob(dirname(__FILE__) . "/*.php");

// Loop through objects and initialize or link (if statistic object) those under $GLOBALS
foreach ($aObjects as $sObject)
{
    // Skip self
    if ($sObject != __FILE__)
    {
        /**
         * Require object file
         */
        require_once($sObject);

        // Remove unnecessary parts
        $sObject = str_replace(array(dirname(__FILE__) . "/", ".php"), '', $sObject);

        // Ensure naming conventions: class name should be same as filename exluding .php
        if (class_exists($sObject))
        {
            // Check if object have __construct method
            if (method_exists($sObject, '__construct'))
            {
                // If session contains serialized object, use it instead. Otherwise create new
                if (isset($_SESSION[$sObject]))
                {
                    $GLOBALS[$sObject] = unserialize($_SESSION[$sObject]);
                }
                else
                {
                    // Object have constructor, create new object
                    $GLOBALS[$sObject] = new $sObject();
                }
            }
        }
    }
}

?>