<?php

require_once('fpdf/fpdf.php');

class PdfExport
{
    var $FPDF;

    public function __construct()
    {
        // Construct
        $this->FPDF = new FPDF();
        //$this->FPDF->SetMargins(0, 0, 0, 0);
        $this->FPDF->AddFont('Open Sans');
        $this->FPDF->SetFont('Open Sans');
    }

    public function newPage()
    {
        // Add page 1
        $this->FPDF->AddPage();

        // Watermark
        $this->FPDF->SetTextColor(250, 250, 250);
        $this->FPDF->SetFontSize(100);
        $this->FPDF->RotatedText(40, 275, 'R I G H T W A R E', 55);

        // Logo
        $this->FPDF->Image('images/logo-inverted.png', 10, 10);

        // Brand
        $this->FPDF->Image('images/brand.png', 105, 5);

        // Version
        $this->FPDF->SetFontSize(24);
        $this->FPDF->SetTextColor(115, 115, 115);
        $this->FPDF->Text(104, 25, '2.0');

        // Header Link
        $this->FPDF->SetFontSize(12);
        $this->FPDF->SetTextColor(0, 163, 255);
        $this->FPDF->SetXY(9, 26);
        $this->FPDF->Write(1, 'browsermark.rightware.com', 'http://browsermark.rightware.com');

        // Date
        $this->FPDF->SetTextColor(0, 0, 0);
        $this->FPDF->Text(160, 28, date('Y-m-d H:i:s'));

        // Header Line
        $this->FPDF->Line(10, 30, 200, 30);

        // Footer line
        $this->FPDF->Line(10, 280, 200, 280);

        // Footer Link
        $this->FPDF->SetFontSize(8);
        $this->FPDF->SetTextColor(115, 115, 115);
        $this->FPDF->Text(10, 287, 'WWW.RIGHTWARE.COM');

        // Address
        $this->FPDF->Text(58, 285, "RIGHTWARE OY, NIITTYKATU 6");
        $this->FPDF->Text(58, 290, "FIN-02200 ESPOO, FINLAND");

        // Telephone & Fax
        $this->FPDF->Text(116, 285, "Tel: +358-9-855-4322");
        $this->FPDF->Text(116, 290, "Fax: +358-9-855-4323");

        // VAT No
        $this->FPDF->Text(174, 287, "VAT NO: 2307199-5");

        // Standard format & start position
        $this->FPDF->SetFontSize(12);
        $this->FPDF->SetTextColor(0, 0, 0);
        $this->FPDF->SetXY(10, 33);
    }

    public function outputPDF()
    {
        $this->FPDF->Output();
    }
}
?>