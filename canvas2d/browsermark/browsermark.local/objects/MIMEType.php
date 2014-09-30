<?php

/**
 * MIME Type
 *
 * Detect file MIME Type
 *
 * @version 2.0
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * MIME Type class
 * @package Browsermark
 */
class MIMEType
{

    /**
     * Detect filetype for headers. If filetype is .gz, script automatically assume that filetype is javascript
     *
     * @param $sExtension Extension that is checked
     * @return string Return filetype or text/html if failed
     */
    public static function detect($sExtension)
    {
        if ($sExtension == 'gz')
        {
            return 'application/javascript';
        }

        // Get list of mime types
        $aMimeTypes = file(dirname(__FILE__) . '/../mime/mime.types');

        // Loop through array and try to find first occurrence of \t{$sExtension} from line that do not start with #
        foreach($aMimeTypes as $sMimeType)
        {
            if (mb_substr($sMimeType, 0, 1) != '#')
            {
                if (preg_match("/\s{$sExtension}/", $sMimeType))
                {
                    return trim(mb_substr($sMimeType, 0, mb_strpos($sMimeType, "\t")));
                }
            }
        }

        // Not found, return text/html
        return 'text/html';

    }

}

?>