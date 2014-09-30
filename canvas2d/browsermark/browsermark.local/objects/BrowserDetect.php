<?php

/**
 * Browser Detect
 *
 * Detect browser and other related parts from user agent string
 *
 * @version 2.0.1
 * @package Browsermark
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware Oy
 **/

/**
 * Browser Detect class
 * @package Browsermark
 */
class BrowserDetect
{
    /**
     * @public string userAgent User-agent string without any modifications
     **/
    public $userAgent;
    /**
     * @public string layoutEngine Layout engine name (Gecko, KHTML, NetFront, Presto, Trident, Webkit)
     **/
    public $layoutEngine = 'Unknown';
    /**
     * @public int layoutMajor Layout engine major version
     **/
    public $layoutMajor = 0;
    /**
     * @public int layoutMinor Layout engine minor version
     **/
    public $layoutMinor = 0;
        /**
     * @public int layoutBuild Layout engine build number
     **/
    public $layoutBuild = 0;
        /**
     * @public int layoutRevision Layout engine revision number
     **/
    public $layoutRevision = 0;
        /**
     * @public string layoutVersion Layout engine version
     **/
    public $layoutVersion = '';
    /**
     * @public string browser Browser name
     **/
    public $browser = 'Unknown';
    /**
     * @public int browserMajor Browser major version
     **/
    public $browserMajor = 0;
    /**
     * @public int browserMinor Browser minor version
     **/
    public $browserMinor = 0;
        /**
     * @public int browserBuild Browser build number
     **/
    public $browserBuild = 0;
        /**
     * @public int browserRevision Browser revision number
     **/
    public $browserRevision = 0;
        /**
     * @public string browserVersion Browser version
     **/
    public $browserVersion = '';
    /**
     * @public os Operating system name
     **/
    public $os = 'Unknown';
    /**
     * @public int osMajor OS major version
     **/
    public $osMajor = 0;
    /**
     * @public int osMinor OS minor version
     **/
    public $osMinor = 0;
    /**
     * @public int osBuild OS build number
     **/
    public $osBuild = 0;
    /**
     * @public int osRevision OS revision number
     **/
    public $osRevision = 0;
    /**
     * @public string osVersion OS version
     **/
    public $osVersion = '';
    /**
     * @public deviceName Device name
     **/
    public $deviceName = null;
    /**
     * @public string category Category name (Desktop, Tablet or Phone)
     **/
    public $category = 'Unknown';

    /**
     * @public int categoryId Category ID
     */
    public $categoryId = 1;

    /**
     * Constructor
     *
     * Constructor method that detect layout engine, browser, os, possible device name and category from user-agent string
     *
     * @return \BrowserDetect
     */
    public function __construct()
    {
        // Generate array of layout engines and browsers. Key contain way how to detect layout engine and subarray contain way to retrieve version and list of browsers
        // In browsers key contain way to detect browser and value contain way to retrieve version
        $aEnginesAndBrowsers = array(
            "WebKit/" => array(
                "version" => "WebKit\/",
                "browsers" => array(
                    "Arora/" => "Arora\/",
                    "Komodo_Dragon/" => "Komodo_Dragon\/",
                    "Dooble/" => "Dooble\/",
                    "iCab/" => "iCab\/",
                    "Lunascape/" => "Lunascape\/",
                    "Maxthon/" => "Maxthon\/",
                    "Midori/" => "Midori\/",
                    "Shiira/" => "Shiira\/",
                    "Bolt/" => "Bolt\/",
                    "Teashark/" => "Teashark\/",
                    "Tizen" => "Tizen\s",
                    "BlackBerry" => "Version\/",
                    "BB10;" => "Version\/",
                    "OPR/" => "OPR\/",
                    "Puffin/" => "Puffin\/",
                    "Chrome/" => "Chrome\/",
                    "Android" => "Version\/",
                    "KFTT" => "Silk\/",
                    "KFOT" => "Silk\/",
                    "Silk/" => "Silk\/",
                    "Kindle/" => "Kindle\/",
                    "Skyfire/" => "Version\/",
                    "Safari/" => "Version\/",
                ),
            ),
            "Gecko/" => array(
                "version" => "rv\:",
                "browsers" => array(
                    "Camino/" => "Camino\/",
                    "K-Meleon/" => "K-Meleon\/",
                    "Lunascape/" => "Lunascape\/",
                    "SeaMonkey/" => "SeaMonkey\/",
                    "Sailfish Browser/" => "Sailfish Browser\/",
                    "SailfishBrowser/" => "SailfishBrowser\/",
                    "Firefox/" => "Firefox\/",
                ),
            ),
            "Trident/" => array(
                "version" => "Trident\/",
                "browsers" => array(
                    "Lunascape/" => "Lunascape\/",
                    "Maxthon/" => "Maxthon\/",
                    "MSIE" => "MSIE\s",
                    "Trident/7.0" => "rv\:",
                ),
            ),
            "Presto/" => array(
                "version" => "Presto\/",
                "browsers" => array(
                    "Opera Mini/" => "Version\/",
                    "Opera/" => "Version\/",
                ),
            ),
            "NetFront/" => array(
                "version" => "NetFront\/",
                "browsers" => array(
                    "Kindle/" => "Kindle\/",
                    "NetFront/" => "NetFront\/",
                ),
            ),
            "KHTML/" => array(
                "version" => "KHTML\/",
                "browsers" => array(
                    "Konqueror/" => "Konqueror\/",
                ),
            ),
        );

        $this->userAgent =  (isset($_SERVER['HTTP_USER_AGENT'])) ? $_SERVER['HTTP_USER_AGENT'] : '';
        // Fake?
        if (isset($GLOBALS['FULL']) && (isset($_GET['UA']) || (isset($_SESSION['UserAgent']))))
        {
            $this->userAgent = (isset($_GET['UA'])) ? urldecode($_GET['UA']) : $_SESSION['UserAgent'];
        }

        // Start to loop engines
        foreach ($aEnginesAndBrowsers as $sEngine => $aDetails)
        {
            if ($sEngineVersion = $this->_getVersion($sEngine, $aDetails['version']))
            {
                // Engine found, set name
                $this->layoutEngine = $this->_beautifyName($sEngine);
                // Save version info
                $this->_saveVersion($sEngineVersion, 'layout');
                $this->layoutVersion = $sEngineVersion;

                // Loop through browsers
                foreach ($aDetails['browsers'] as $sBrowser => $sVersion)
                {
                    if ($sBrowserVersion = $this->_getVersion($sBrowser, $sVersion))
                    {
                        // Browser found, set name
                        $this->browser = $this->_beautifyName($sBrowser);
                        // Save version info
                        $this->_saveVersion($sBrowserVersion, 'browser');
                        $this->browserVersion = $sBrowserVersion;

                        // By default category is Desktop
                        $this->category = 'Desktop';
                        $this->categoryId = 2;

                        // Test _isTablet and _isPhone and make needed modifications
                        if ($this->_isTablet())
                        {
                            // Device is tablet, change category
                            $this->category = 'Tablet';
                            $this->categoryId = 3;
                        }
                        else if ($this->_isPhone())
                        {
                            // Device is phone, change category and add word "Mobile" front of browser name
                            $this->category = 'Phone';
                            $this->categoryId = 4;
                            $this->browser = $this->_beautifyName("Mobile " . $this->browser);
                        }

                        // Break out from both loops since layout engine and browser is already detected
                        break 2;
                    }
                }

                // If browser is not detected, break out from primary loop since layout engine was detected
                break;
            }

        }

        // Finally try to detect OS and device name
        $this->_detectOS();
        if ($sDevice = $this->_detectDevice())
        {
            $this->deviceName = $sDevice;
        }

        // If skyfire, don't trust OS nor category details
        if ($this->browser == 'Skyfire')
        {
            $this->os = 'Unknown';
            $this->osMajor = 0;
            $this->osMinor = 0;
            $this->osBuild = 0;
            $this->osRevision = 0;
            $this->osVersion = '';
        }
    }

    /**
     * Get Version
     *
     * This method have two phases: first it checks that UA string contain sCheck, if yes then it try to retrieve version number after sVersion
     *
     * @private
     * @param string sCheck String that is checked
     * @param string sVersion Regexp-formatted string that will fit in regexp "/{$sVersion}([0-9\.]+)/"
     * @return mixed Return version if found, if only check was found return true, otherwise false
     **/
    private function _getVersion($sCheck, $sVersion)
    {
        // First ensure that check is found
        if (mb_stristr($this->userAgent, $sCheck))
        {
            // Found, try to get version number
            if (preg_match("/{$sVersion}([0-9\.\_]+)/", $this->userAgent, $aVersion))
            {
                if (isset($aVersion[1]))
                {
                    // Before returning version number, replace possible underscores with dots
                    return str_replace('_', '.', $aVersion[1]);
                }
            }
            return true;
        }
        return false;
    }

    /**
     * Beautify Name
     *
     * Remove unwanted characters from name and change underscores to spaces. After that return beautified name based on changed value
     *
     * @private
     * @param string sName Name that is beautified
     * @return string Beautified name
     **/
    private function _beautifyName($sName)
    {
        $aFind = array("/", "_");
        $aRepl = array("", " ");
        $sName = str_replace($aFind, $aRepl, $sName);

        // We have few special cases which are checked here
        switch($sName)
        {
            case "MSIE":
            case "Trident7.0":                  return "Internet Explorer";         break;
            case "Mobile Internet Explorer":    return "Internet Explorer Mobile";  break;
            case "Chrome":                      return 'Google Chrome';             break;
            case "Firefox":                     return 'Mozilla Firefox';           break;
            case "Mobile Mozilla Firefox":      return 'Firefox for Mobile';        break;
            case "Mobile Sailfish Browser":
            case "Mobile SailfishBrowser":      return "Sailfish Browser";          break;
            case "Mobile BB10;":
            case "Mobile BlackBerry":           return 'BlackBerry';                break;
            case "Android":
            case "Mobile Google Android":       return 'Android Browser';           break;
            case "Mobile Tizen":                return 'Tizen Browser';             break;
            case "Mobile Opera Mini":           return 'Opera Mini';                break;
            case "Mobile Opera":                return 'Opera Mobile';              break;
            case "KFTT":                        return 'Kindle Fire HD';            break;
            case "KFOT":
            case "Silk":                        return 'Kindle Fire';               break;
            case "OPR":                         return 'Opera Next';                break;
            default:                            return $sName;                      break;
        }
    }

    /**
     * Save Version
     *
     * Takes string like Minor.Major.Build.Revision and saves it values in their own variables.
     *
     * @private
     * @param string sVersion Version number (like "1", "1.2", "1.2.3" or "1.2.3.4")
     * @param string sType Version number type (currently only "layout" and "browser" supported
     * @return void
     **/
    private function _saveVersion($sVersion, $sType)
    {
        // Ensure version number is not true
        if ($sVersion !== true)
        {
            $aParts = explode('.',     $sVersion);
            $sVer = "{$sType}Version";
            $this->$sVer = $sVersion;
            if (isset($aParts[0]))
            {
                $sMajor = "{$sType}Major";
                $this->$sMajor = $aParts[0];
            }
            if (isset($aParts[1]))
            {
                $sMinor = "{$sType}Minor";
                $this->$sMinor = $aParts[1];
            }
            if (isset($aParts[2]))
            {
                $sBuild = "{$sType}Build";
                $this->$sBuild = $aParts[2];
            }
            if (isset($aParts[3]))
            {
                $sRevision = "{$sType}Revision";
                $this->$sRevision = $aParts[3];
            }
        }
    }

    /**
     * Is Tablet
     *
     * Check if device is tablet. This method must be ran before method _isPhone
     *
     * @private
     * @return bool Returns true if device is tablet, otherwise false
     **/
    private function _isTablet()
    {
        // Test 1: UA contains word Tablet
        if (mb_stristr($this->userAgent, 'Tablet'))
        {
            return true;
        }
        // Test 2: UA contains word iPad;
        else if (mb_stristr($this->userAgent, 'iPad;'))
        {
            return true;
        }
        // Test 3: Browser have word "Kindle"
        else if (mb_stristr($this->browser, 'Kindle'))
        {
            return true;
        }
        // Test 4: User Agent have " KFFT " or " KFOT "
        else if (mb_strstr($this->userAgent, " KFTT ") || mb_strstr($this->userAgent, " KFOT "))
        {
            return true;
        }
        // Test 5: UA ends to "AT" or "IT" and browser is Puffin
        else if ((mb_substr($this->userAgent, -2) == 'AT' || mb_substr($this->userAgent, -2) == 'IT') && $this->browser == 'Puffin')
        {
            return true;
        }
        // Test 6: UA contains word Android but not word Mobile
        else if (mb_stristr($this->userAgent, 'Android') && !mb_stristr($this->userAgent, 'Mobile') && !mb_stristr($this->userAgent, 'Opera Mobi'))
        {
            return true;
        }

        // Not tablet
        return false;

    }

    /**
     * Is Phone
     *
     * Check if device is phone. This method must be ran after method _isTablet
     *
     * @private
     * @return bool Returns true if device is phone, otherwise false
     **/
    private function _isPhone()
    {
        // Test 1: UA contains words Opera Mobi
        if (mb_stristr($this->userAgent, 'Opera Mobi'))
        {
            return true;
        }
        // Test 2: UA contains word Mobile but not words Opera Mobile
        else if (mb_stristr($this->userAgent, 'Mobile') && !mb_stristr($this->userAgent, 'Opera Mobile'))
        {
            return true;
        }
        // Test 3: UA contains word iPhone;
        else if (mb_stristr($this->userAgent, 'iPhone;'))
        {
            return true;
        }
        // Test 4: UA contains word Fennec/
        else if (mb_stristr($this->userAgent, 'Fennec/'))
        {
            return true;
        }
        // Test 5: If browser is Skyfire
        if ($this->browser == 'Skyfire')
        {
            return true;
        }
        // Test 6: UA ends to "AP" or "IP" or "M" and browser is Puffin
        else if ((mb_substr($this->userAgent, -2) == 'AP' || mb_substr($this->userAgent, -2) == 'IP' || mb_substr($this->userAgent, -1) == 'M') && $this->browser == 'Puffin')
        {
            return true;
        }
        // Not phone
        return false;

    }

    /**
     * Detect OS
     *
     * Detect most common mobile OSs, Mac OS X versions, Mac OS & Macintosh, Windowses from XP to Windows 8 and 11 most common Linux Distros
     *
     * @private
     * @return void Value can be retrieved via BrowserDetect::os
     **/
    private function _detectOS()
    {
        $aOSs = array(
            "Android" => array("Android", "Android\s"),
            "iPhone;" => array("iOS", "CPU\siPhone\sOS\s"),
            "iPad;" => array("iOS", "CPU\sOS\s"),
            "iPod;" => array("iOS", "CPU\sOS\s"),
            "Windows Phone" => array("Windows Phone", "Windows\sPhone\sOS\s"),
            "BlackBerry" => array("BlackBerry", "BlackBerry\s"),
            "BB10;" => array("BlackBerry", "Version\/"),
            "Sailfish" => array("Sailfish OS", "Sailfish\/"),
            "Mac OS X 10_0" => array("Mac OS X Cheetah", "Mac\sOS\sX\s"),
            "Mac OS X 10_1" => array("Mac OS X Puma", "Mac\sOS\sX\s"),
            "Mac OS X 10_2" => array("Mac OS X Jaquar", "Mac\sOS\sX\s"),
            "Mac OS X 10_3" => array("Mac OS X Panther", "Mac\sOS\sX\s"),
            "Mac OS X 10_4" => array("Mac OS X Tiger", "Mac\sOS\sX\s"),
            "Mac OS X 10_5" => array("Mac OS X Leopard", "Mac\sOS\sX\s"),
            "Mac OS X 10_6" => array("Mac OS X Snow Leopard", "Mac\sOS\sX\s"),
            "Mac OS X 10_7" => array("Mac OS X Lion", "Mac\sOS\sX\s"),
            "Mac OS X 10_8" => array("Mac OS X Mountain Lion", "Mac\sOS\sX\s"),
            "Mac OS X 10_9" => array("Mac OS X Mavericks", "Mac\sOS\sX\s"),
            // Since some browsers use underscore with mac version and some browsers use dot, we have to check both
            "Mac OS X 10.0" => array("Mac OS X Cheetah", "Mac\sOS\sX\s"),
            "Mac OS X 10.1" => array("Mac OS X Puma", "Mac\sOS\sX\s"),
            "Mac OS X 10.2" => array("Mac OS X Jaquar", "Mac\sOS\sX\s"),
            "Mac OS X 10.3" => array("Mac OS X Panther", "Mac\sOS\sX\s"),
            "Mac OS X 10.4" => array("Mac OS X Tiger", "Mac\sOS\sX\s"),
            "Mac OS X 10.5" => array("Mac OS X Leopard", "Mac\sOS\sX\s"),
            "Mac OS X 10.6" => array("Mac OS X Snow Leopard", "Mac\sOS\sX\s"),
            "Mac OS X 10.7" => array("Mac OS X Lion", "Mac\sOS\sX\s"),
            "Mac OS X 10.8" => array("Mac OS X Mountain Lion", "Mac\sOS\sX\s"),
            "Mac OS X 10.8" => array("Mac OS X Mavericks", "Mac\sOS\sX\s"),
            "Mac OS X" => array("Mac OS X", "Mac\sOS\sX\s"),
            "Mac OS" => array("Mac OS", "Mac\sOS\s"),
            "Macintosh" => array("Macintosh", "Macintosh\s"),
            "Windows NT 6.3" => array("Windows 8.1", "Windows\sNT\s"),
            "Windows NT 6.2" => array("Windows 8", "Windows\sNT\s"),
            "Windows NT 6.1" => array("Windows 7", "Windows\sNT\s"),
            "Windows NT 6.0" => array("Windows Vista", "Windows\sNT\s"),
            "Windows NT 5.2" => array("Windows XP Professional", "Windows\sNT\s"),
            "Windows NT 5.1" => array("Windows XP", "Windows\sNT\s"),
            "Windows" => array("Windows", "Windows\s"),
            "Linux Mint" => array("Linux Mint", "Linux\sMint\/"),
            "Ubuntu" => array("Ubuntu", "Ubuntu\/"),
            "Fedora" => array("Fedora", "Fedora\/"),
            "Debian" => array("Debian GNU/Linux", "\(Debian\-"),
            "SUSE" => array("Open SUSE", "SUSE\/"),
            "Arch Linux" => array("Arch Linux", null),
            "PCLinuxOS" => array("PCLinuxOS", "PCLinuxOS\/"),
            "CentOS" => array("CentOS", "CentOS\/"),
            "Mageia" => array("Mageia", "Mageia\/"),
            "Slackware" => array("Slackware Linux", "Slackware\/"),
            "FreeBSD" => array("FreeBSD", null),
            "CrOS" => array("Cr OS Linux", null),
            "Linux" => array("Linux", null),
        );

        // Loop through OSs if browser is not Puffin
        if ($this->browser != 'Puffin')
        {
            foreach ($aOSs as $sCheck => $aOS)
            {
                if (mb_stristr($this->userAgent, $sCheck))
                {
                    $this->os = $aOS[0];
                    // Try to get version
                    if ($aOS[1] != null && $sVersion = $this->_getVersion($sCheck, $aOS[1]))
                    {
                        $this->osVersion = $sVersion;
                        // If Windows, display Windows NT in version number
                        if (mb_stristr($sCheck, 'Windows'))
                        {
                            $sVersion = 'Windows NT ' . $sVersion;
                        }
                        $this->_saveVersion($sVersion, 'os');
                    }
                    // Break out from foreach to prevent further checks
                    break;
                }
            }
        }
        // Puffin have own, unique way to define OS
        else
        {
            // IP = iPhone, IT = iPad, AP = Android phone, AT = Android tablet
            if (mb_substr($this->userAgent, -2) == 'IP' || mb_substr($this->userAgent, -2) == 'IT')
            {
                $this->os = 'iOS';
            }
            else if (mb_substr($this->userAgent, -2) == 'AP' || mb_substr($this->userAgent, -2) == 'AT')
            {
                $this->os = 'Android';
            }
        }
        // If OS is still empty in this phase, test for Firefox OS: it have firefox + mobile but no OS information
        if ($this->os == 'Unknown')
        {
            if (mb_stristr($this->userAgent, 'firefox') && mb_stristr($this->userAgent, 'mobile'))
            {
                $this->os = 'Firefox OS';
                $this->osVersion = 0;
            }
        }
    }

    /**
     * Detect Device
     *
     * Detect device name from tablets and from phones when OS is Windows Phone, Android or BlackBerry. If OS is iOS this will return either iPhone 4S or iPad 3
     *
     * @private
     * @return mixed Return device name or false if detection failed
     **/
    private function _detectDevice()
    {
        $sDevice = false;

        // Only if device is tablet or phone
        if ($this->category == 'Phone' || $this->category == 'Tablet')
        {
            // Every mobile OS have bit different way of representing device name, but all of them place these details inside first () separated by ;
            $aDetails = explode('(', $this->userAgent, 2);
            $aDetails = explode(')', $aDetails[1], 2);
            $aDetails = explode(';', $aDetails[0]);
            $aDetails = array_reverse($aDetails);
            // Opera * nor Firefox for Mobile nor Skyfire do not show device name
            if (isset($aDetails[0]) && !mb_stristr($this->browser, 'Opera') && $this->browser != 'Mobile Skyfire')
            {
                $sCompareOS = (mb_stristr($this->os, 'Mac OS')) ? 'Macintosh' : $this->os;
                switch($sCompareOS)
                {
                    case "Windows Phone":
                        // Windows Phone place device manufacturer on second last spot and device name on last spot inside first () separated by ;
                        if (isset($aDetails[1]))
                        {
                            $sDevice = trim(mb_convert_case($aDetails[1], MB_CASE_TITLE));
                            $sDevice .= ' ' . trim($aDetails[0]);
                        }
                        else
                        {
                            $sDevice = trim($aDetails[0]);
                        }
                        break;
                    case "Android":
                    case "Linux":
                    case "Macintosh":
                        // Android, Linux and Macintosh place device details on last spot inside first () separated by ;
                        $sDevice = trim($aDetails[0]);
                        // Except in monochrome Kindle where we return Kindle/major.minor
                        if ($this->browser == 'Kindle')
                        {
                            $sDevice = 'Kindle/' . $this->browserMajor . '.' . $this->browserMinor;
                        }
                        if (mb_stristr($sDevice, 'cyanogenmod'))
                        {
                            // Cyanogenmod place itself on last spot so we take second last spot instead
                            $sDevice = trim($aDetails[1]);
                        }
                        break;
                    case "iOS":
                        // iOS do not spoof good details on UA string so if iPhone we offer iPhone 5 and if iPad we offer iPad 3
                        /*if (in_array('iPhone', $aDetails))
                        {
                            $sDevice = 'iPhone 5';
                        }
                        else if (in_array('iPad', $aDetails))
                        {
                            $sDevice = 'iPad 3';
                        }*/
                        $sDevice = 'Unknown';
                        break;
                    case "BlackBerry":
                        // BlackBerry place device details on second last spot inside first () separated by ;
                        if (isset($aDetails[1]))
                        {
                            $sDevice = trim($aDetails[1]);
                            // BB10 => BlackBerry 10
                            $sDevice = ($sDevice == 'BB10') ? 'BlackBerry 10 ' . $aDetails[0] : $sDevice;
                        }
                        break;
                    // Mozilla/5.0 (Linux; U; Jolla; Sailfish; Mobile; rv:20.0) Gecko/20.0 Firefox/20.0 Sailfish Browser/1.0 like Safari/535.19
                    // Mozilla/5.0 (Maemo; Linux; U; Jolla; Sailfish; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0 SailfishBrowser/1.0 like Safari/538.1
                    case "Sailfish OS":
                    case "Maemo":
                        // Detail is in [3]
                        $sDevice = trim($aDetails[3]);
                        break;
                }
            }
            else
            {
                $sDevice = 'Unknown';
            }
        }

        if ($this->browser == 'Puffin')
        {
            // Puffin does not expose device name
            $sDevice = 'Unknown';
        }
        // Lastly ensure device is not like 'en-us' or 'rv:*'
        if (preg_match('/^\w{2,3}-\w{2,3}$/i', $sDevice) || mb_stristr($sDevice, 'rv:'))
        {
            $sDevice = 'Unknown';
        }

        return $sDevice;

    }

}

?>