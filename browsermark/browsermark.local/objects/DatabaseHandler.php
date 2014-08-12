<?php

/**
 * Database Handler
 *
 * Is responsible of writing data in database
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 * @see http://www.php.net/mysqli
 **/

/**
 * Database Handler class
 * @package Browsermark
 */
class DatabaseHandler extends mysqli
{
    /**
     * Constructor
     *
     * Extends {@link http://php.net/mysqli mysqli} class by creating database connection (if needed
     *
     * @return \mysqli
     */
    public function __construct()
    {
        if (class_exists('mysqli'))
        {
            // Ensure DB is enabled
            if ($GLOBALS['DB'])
            {
                // Initialize new mysqli object
                parent::__construct($GLOBALS['DB_HOST'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS'], $GLOBALS['DB_NAME'], $GLOBALS['DB_PORT']);
                if ($this->connect_error)
                {
                    // Something went wrong, disable database
                    $GLOBALS['DB'] = false;

                    // Trigger error
                    if ($GLOBALS['DEBUG'])
                    {
                        $sError = __METHOD__ . ': Database disabled, reason; ' . $this->connect_error;
                        $GLOBALS['ERRORS'][] = new ErrorException($sError, 0, E_USER_WARNING, __FILE__, __LINE__);
                    }
                }
                $this->set_charset("utf8");
            }
        }
    }

    /**
     * Prepare SQL query
     *
     * @param string $sQuery Query that needs to prepared
     * @return bool|mysqli_stmt Return mysqli_stmt or false if failed
     */
    public function prepare($sQuery)
    {
        if (class_exists('mysqli') && $GLOBALS['DB'])
        {
            return parent::prepare($sQuery);
        }
        return false;
    }

    /**
     * Wakeup method
     */
    public function __wakeup()
    {
        self::__construct();
    }
}

?>