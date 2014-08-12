<?php

// Require master configuration
require_once(dirname(__FILE__) . '/../configuration.php');

// Add first page
$GLOBALS['PdfExport']->newPage();

// Add content
$GLOBALS['PdfExport']->FPDF->Text(10, 40, "Results Count:");
$GLOBALS['PdfExport']->FPDF->Text(40, 40, "6002 Benchmarks");
$GLOBALS['PdfExport']->FPDF->Text(40, 45, "3211 Desktops (53.5%)");
$GLOBALS['PdfExport']->FPDF->Text(100, 45, "517 Tablets (8.6%)");
$GLOBALS['PdfExport']->FPDF->Text(160, 45, "2274 Phones (37.9%)");
$GLOBALS['PdfExport']->FPDF->Text(10, 55, "Time Frame:");
$GLOBALS['PdfExport']->FPDF->Text(40, 55, "2012-11-19 - 2012-11-22");

$GLOBALS['PdfExport']->FPDF->SetFontSize(18);
$GLOBALS['PdfExport']->FPDF->Text(10, 70, "TOP 10 by Popularity");
$GLOBALS['PdfExport']->FPDF->SetFontSize(14);
$GLOBALS['PdfExport']->FPDF->Text(10, 86, "Browsers");
$GLOBALS['PdfExport']->FPDF->Text(85, 86, "Engines");
$GLOBALS['PdfExport']->FPDF->Text(140, 86, "OSs");
$GLOBALS['PdfExport']->FPDF->Text(10, 154, "ISPs");
$GLOBALS['PdfExport']->FPDF->SetFontSize(10);
$GLOBALS['PdfExport']->FPDF->Text(122, 154, "Min.");
$GLOBALS['PdfExport']->FPDF->Text(144, 154, "Max.");
$GLOBALS['PdfExport']->FPDF->Text(165, 154, "Avg.");
$GLOBALS['PdfExport']->FPDF->Text(182, 154, "Variance");

$GLOBALS['PdfExport']->FPDF->SetXY(9, 88);
$GLOBALS['PdfExport']->FPDF->MultiCell(55, 5, "Google Chrome 23.0\nMozilla Firefox 18.0\nInternet Explorer 10.0\nAndroid Browser 4.0\nSafari Mobile 6.0\nInternet Explorer Mobile 10.0\nSafari 6.0\nOpera 12.10\nKindle Fire 2.3\nGoogle Chrome 25.0", 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(60, 88);
$GLOBALS['PdfExport']->FPDF->MultiCell(15, 5, "13.2%\n10.1%\n8.8%\n8.5%\n6.7%\n6.1%\n5.2%\n1.7%\n0.9%\n0.2%", 0, 'R');

$GLOBALS['PdfExport']->FPDF->SetXY(84, 88);
$GLOBALS['PdfExport']->FPDF->MultiCell(55, 5, "Webkit 537.3\nTrident 4.0\nGecko 18.0\nTrident 5.0\nWebkit 533.3\nWebkit 537.11\nPresto 2.10\nWebkit 536.26\nWebkit 534.46\nPresto 2.0", 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(110, 88);
$GLOBALS['PdfExport']->FPDF->MultiCell(15, 5, "13.2%\n10.1%\n8.8%\n8.5%\n6.7%\n6.1%\n5.2%\n1.7%\n0.9%\n0.2%", 0, 'R');

$GLOBALS['PdfExport']->FPDF->SetXY(139, 88);
$GLOBALS['PdfExport']->FPDF->MultiCell(55, 5, "Windows 7\nWindows 8\nMac OS X Mountain Lion\nAndroid 4.1\niOS 6.0\niOS 5.5\nWindows XP\nWindows Phone 8.0\nMac OS X Snow Leopard\nWindows Phone 7.5", 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(180, 88);
$GLOBALS['PdfExport']->FPDF->MultiCell(15, 5, "13.2%\n10.1%\n8.8%\n8.5%\n6.7%\n6.1%\n5.2%\n1.7%\n0.9%\n0.2%", 0, 'R');

$GLOBALS['PdfExport']->FPDF->SetXY(9, 156);
$GLOBALS['PdfExport']->FPDF->MultiCell(105, 5, "Verizon Online Llc (US)\nVodafone Omnitel N.v. (IT)\nAt&t Internet Services (US)\nBt Broadband (UK)\nComcast Business Communications Llc (US)\nDynamic Distribution Ip's For Broadband Services (RU)\nFrontier Communications Of America Inc. (US)\nElisa Oyj (FI)\nHong Kong Broadband Network Ltd (HK)\nNorth-West Branch Of Ojsc Megafon Network. (RU)", 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(100, 156);
$GLOBALS['PdfExport']->FPDF->MultiCell(15, 5, "13.2%\n10.1%\n8.8%\n8.5%\n6.7%\n6.1%\n5.2%\n1.7%\n0.9%\n0.2%", 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(112, 156);
$GLOBALS['PdfExport']->FPDF->MultiCell(23, 5, "1.2 Mbit/s\n0.6 Mbit/s\n1.4 Mbit/s\n1.9 Mbit/s\n0.4 Mbit/s\n2.0 Mbit/s\n5.9 Mbit/s\n1.8 Mbit/s\n2.1 Mbit/s\n4.0 Mbit/s", 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(134, 156);
$GLOBALS['PdfExport']->FPDF->MultiCell(23, 5, "11.2 Mbit/s\n10.6 Mbit/s\n11.4 Mbit/s\n11.9 Mbit/s\n10.4 Mbit/s\n12.0 Mbit/s\n15.9 Mbit/s\n11.8 Mbit/s\n12.1 Mbit/s\n14.0 Mbit/s", 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(156, 156);
$GLOBALS['PdfExport']->FPDF->MultiCell(23, 5, "11.2 Mbit/s\n0.6 Mbit/s\n11.4 Mbit/s\n1.9 Mbit/s\n10.4 Mbit/s\n2.0 Mbit/s\n15.9 Mbit/s\n1.8 Mbit/s\n12.1 Mbit/s\n4.0 Mbit/s", 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(175, 156);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 5, "88.2%\n65.5%\n91.4%\n82.6%\n66.6%\n31.4%\n75.0%\n81.9%\n92.4%\n78.0%", 0, 'R');

$GLOBALS['PdfExport']->FPDF->SetFontSize(14);
$GLOBALS['PdfExport']->FPDF->Text(10, 222, "Devices");
$GLOBALS['PdfExport']->FPDF->SetFontSize(10);
$GLOBALS['PdfExport']->FPDF->Text(144, 222, "Min.");
$GLOBALS['PdfExport']->FPDF->Text(165, 222, "Max.");
$GLOBALS['PdfExport']->FPDF->Text(185, 222, "Avg.");

$GLOBALS['PdfExport']->FPDF->SetXY(9, 224);
$GLOBALS['PdfExport']->FPDF->MultiCell(115, 5, "iPhone 5\nSGH-T889V Build/JRO03C\niPhone 4\nGT-I9300 Build/JRO3C\niPad 3\nNexus 10 Build/JOP40C \niPhone 4S\niPad 4\nSGH-T889V Build/JRO03C\nGT-I9100 Build/IMM76D", 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(119, 224);
$GLOBALS['PdfExport']->FPDF->MultiCell(15, 5, "13.2%\n10.1%\n8.8%\n8.5%\n6.7%\n6.1%\n5.2%\n1.7%\n0.9%\n0.2%", 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(129, 224);
$GLOBALS['PdfExport']->FPDF->MultiCell(23, 5, "2232\n1899\n2144\n1607\n2401\n2222\n2892\n1912\n2323\n1904", 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(151, 224);
$GLOBALS['PdfExport']->FPDF->MultiCell(23, 5, "2232\n1899\n2144\n1607\n2401\n2222\n2892\n1912\n2323\n1904", 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(170, 224);
$GLOBALS['PdfExport']->FPDF->MultiCell(23, 5, "2232\n1899\n2144\n1607\n2401\n2222\n2892\n1912\n2323\n1904", 0, 'R');

// Page 2: TOP 50 Desktops
$GLOBALS['PdfExport']->newPage();

$GLOBALS['PdfExport']->FPDF->SetFontSize(18);
$GLOBALS['PdfExport']->FPDF->Text(10, 40, "TOP 50 Desktops by Median");
$GLOBALS['PdfExport']->FPDF->SetFontSize(10);
$GLOBALS['PdfExport']->FPDF->Text(131, 40, "Min.");
$GLOBALS['PdfExport']->FPDF->Text(151, 40, "Max.");
$GLOBALS['PdfExport']->FPDF->Text(169, 40, "Median");

$sDesktops = '';
$sMin = '';
$sMax = '';
$sMedian = '';

for ($i = 1; $i < 51; $i++)
{

    $sDesktops .= sprintf("%02d. Operating System Z with Browser Y.X \n", $i);
    $iMin = rand(3000,4000);
    $iMax = rand(4000,5000);
    $iMedian = floor(($iMin + $iMax) / 2);
    $sMin .= "{$iMin}\n";
    $sMax .= "{$iMax}\n";
    $sMedian .= "{$iMedian}\n";
}

$GLOBALS['PdfExport']->FPDF->SetXY(9, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(115, 4.5, $sDesktops, 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(120, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMin, 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(140, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMax, 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(160, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMedian, 0, 'R');

// Page 3: TOP 50 Tablets
$GLOBALS['PdfExport']->newPage();

$GLOBALS['PdfExport']->FPDF->SetFontSize(18);
$GLOBALS['PdfExport']->FPDF->Text(10, 40, "TOP 50 Tablets by Median");
$GLOBALS['PdfExport']->FPDF->SetFontSize(10);
$GLOBALS['PdfExport']->FPDF->Text(131, 40, "Min.");
$GLOBALS['PdfExport']->FPDF->Text(151, 40, "Max.");
$GLOBALS['PdfExport']->FPDF->Text(169, 40, "Median");

$sDesktops = '';
$sMin = '';
$sMax = '';
$sMedian = '';

for ($i = 1; $i < 51; $i++)
{

    $sDesktops .= sprintf("%02d. Tablet Z with Browser Y.X\n", $i);
    $iMin = rand(1000,2000);
    $iMax = rand(1500,2500);
    $iMedian = floor(($iMin + $iMax) / 2);
    $sMin .= "{$iMin}\n";
    $sMax .= "{$iMax}\n";
    $sMedian .= "{$iMedian}\n";
}

$GLOBALS['PdfExport']->FPDF->SetXY(9, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(115, 4.5, $sDesktops, 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(120, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMin, 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(140, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMax, 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(160, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMedian, 0, 'R');

// Page 4: TOP 50 Phones
$GLOBALS['PdfExport']->newPage();

$GLOBALS['PdfExport']->FPDF->SetFontSize(18);
$GLOBALS['PdfExport']->FPDF->Text(10, 40, "TOP 50 Phones by Median");
$GLOBALS['PdfExport']->FPDF->SetFontSize(10);
$GLOBALS['PdfExport']->FPDF->Text(131, 40, "Min.");
$GLOBALS['PdfExport']->FPDF->Text(151, 40, "Max.");
$GLOBALS['PdfExport']->FPDF->Text(169, 40, "Median");

$sDesktops = '';
$sMin = '';
$sMax = '';
$sMedian = '';

for ($i = 1; $i < 51; $i++)
{

    $sDesktops .= sprintf("%02d. Phone Z with Browser Y.X\n", $i);
    $iMin = rand(1500,2000);
    $iMax = rand(2000,3000);
    $iMedian = floor(($iMin + $iMax) / 2);
    $sMin .= "{$iMin}\n";
    $sMax .= "{$iMax}\n";
    $sMedian .= "{$iMedian}\n";
}

$GLOBALS['PdfExport']->FPDF->SetXY(9, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(115, 4.5, $sDesktops, 0, 'L');
$GLOBALS['PdfExport']->FPDF->SetXY(120, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMin, 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(140, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMax, 0, 'R');
$GLOBALS['PdfExport']->FPDF->SetXY(160, 45);
$GLOBALS['PdfExport']->FPDF->MultiCell(20, 4.5, $sMedian, 0, 'R');

$GLOBALS['PdfExport']->outputPDF();

?>