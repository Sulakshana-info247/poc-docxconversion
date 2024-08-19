const HTMLtoDOCX = require('html-to-docx')
const fs = require('fs');
const cheerio = require('cheerio');
const juice = require('juice');


const htmlString =`<!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table with Row and Column Spans</title>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 5px;
            text-align: center;
        }
    </style>
</head>
<body>
     <table class="first-row first-col no-vband" style="width: 517.5pt; margin-left: auto; margin-right: auto; cursor: cell;">
      <colgroup>
        <col style="width: 45pt;">
        <col style="width: 188.8pt;">
        <col style="width: 56.75pt;">
        <col style=\"width: 70.95pt;\">
        <col style=\"width: 78pt;\">
        <col style=\"width: 78pt;\">
      </colgroup>
      <tbody>
        <tr style=\"text-align: center;\">
          <td style=\"width: 45pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">Sy. No</span>
            </p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">Name(s) of the Vendor(s)</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">Extent owned</span>
            </p>
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">(in Gts)</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">Extent entrusted</span>
            </p>
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\"> (in Gts)</span>
            </p>
          </td>
          <td style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">DAGPA No.</span>
            </p>
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">&amp; Date</span>
            </p>
          </td>
          <td style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">Registered at</span>
            </p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td rowspan=\"2\" style=\"width: 45pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">27/P</span>
            </p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mrs. CHERUKURU BHASKARA JYOTHI</span>
            </p>
          </td>
          <td rowspan=\"2\" style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">20</span>
            </p>
          </td>
          <td rowspan=\"2\" style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">20</span>
            </p>
          </td>
          <td rowspan=\"2\" style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">436 / 2023 10.01.2023</span>
            </p>
          </td>
          <td rowspan=\"2\" style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">SRO Gandipet</span>
            </p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. CHERUKURU ARAVIND BABU</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"width: 45pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">27/P</span>
            </p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. NAGARAJAN VISWANATHAN</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">10</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">10</span>
            </p>
          </td>
          <td style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">437 / 2023 10.01.2023</span>
            </p>
          </td>
          <td style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">SRO Gandipet</span>
            </p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td rowspan=\"12\" style=\"width: 45pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">27/P, 28/P, 29/P, 30/P, 54/P, 67/P, 68/P &amp; 69/P</span>
            </p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. L. SAMBASIVA RAO (Vendor hereunder)</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">127.3</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">127.3</span>
            </p>
          </td>
          <td rowspan=\"12\" style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">617 / 2023</span>
            </p>
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">18.01.2023</span>
            </p>
          </td>
          <td rowspan=\"12\" style=\"width: 78pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">SRO Gandipet</span>
            </p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. K. RANGA RAO</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">80</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">80</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. T V SAMBASIVA RAO</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">20</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">20</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mrs. K. LATHA RANI</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">17</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">17</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. K. SIDDARTHA</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">20</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">20</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mrs. N. SOWJANYA</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">80</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">80</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mrs. K. RISHITHA REDDY</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">19.6</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">19.6</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. D. RAGHAVA REDDY</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">3.3</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">3.3</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mrs. D. SUPRAJA</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">3.2</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">3.2</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mr. D. SREEDHAR REDDY</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">3.5</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">3.5</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"height: 13.25pt; text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mrs. K. PADMA PRIYA</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">10.4</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">10.4</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"text-align: center;\">
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"width: 188.8pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">Mrs. PEDDI REDDY MADHAVI</span>
            </p>
          </td>
          <td style=\"width: 56.75pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">9</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; font-weight: normal; min-height: 10pt; font-size: 10pt;\">9</span>
            </p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
          <td style=\"display: none; width: auto; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
        <tr style=\"height: 18.2pt; text-align: center;\">
          <td colspan=\"3\" style=\"width: 290.55pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">GRAND TOTAL</span>
            </p>
          </td>
          <td style=\"width: 70.95pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p class=\"docx_normalweb\" style=\"text-align: center;\">
              <span class=\"docx_strong\" style=\"font-family: &quot;Bookman Old Style&quot;; min-height: 10pt; font-size: 10pt;\">423.30</span>
            </p>
          </td>
          <td colspan=\"2\" style=\"width: 156pt; border-width: 0.75pt; border-style: solid; border-color: black; vertical-align: middle; padding: 0.75pt;\">
            <p></p>
          </td>
        </tr>
      </tbody>
    </table>
</body></html>`


const newString=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table with Row and Column Spans</title>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 5px;
            text-align: center;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <th colspan="3">Header spanning 3 columns</th>
        </tr>
        <tr>
            <td rowspan="2">Cell spanning 2 rows</td>
            <td>Regular cell</td>
            <td>Regular cell</td>
        </tr>
        <tr>
            <td colspan="2">Cell spanning 2 columns</td>
        </tr>
        <tr>
            <td>Regular cell</td>
            <td rowspan="2" colspan="2">Cell spanning 2 rows and 2 columns</td>
        </tr>
        <tr>
            <td>Regular cell</td>
        </tr>
    </table>
</body>
</html>`

 
const ptToPx = (pt) => {
    if(pt <1 && pt>0) pt=1;
    const inPx= Math.round(pt * 1.3333); 
   // console.log(pt,":::::",inPx);
    return inPx;// Conversion factor
  };
  
  const convertPtToPxInStyle = (style) => {
    return style.replace(/(\d+(\.\d+)?)\s*pt/g, (match, p1) => {
      const pxValue = (p1 <1 && p1>0) ? 1.5 : ptToPx(parseInt(p1));
      return `${pxValue}px`;
    });
  };

const convertPtToPxInHtml = (html) => {
    const $ = cheerio.load(html);
  
    // Iterate over all elements with a style attribute
    $('[style]').each((index, element) => {
      const $element = $(element);
      const style = $element.attr('style');
      const updatedStyle = convertPtToPxInStyle(style);
      $element.attr('style', updatedStyle);
    });
  
    return $.html();
  };

  
  async function convertInlineStyles(html) {
    const $ = cheerio.load(html);
    const elementsWithStyle = $('[style]');
  
    for (let i = 0; i < elementsWithStyle.length; i++) {
      const element = elementsWithStyle[i];
      const originalStyle = $(element).attr('style');
      if (originalStyle) {
        try {
          const shorthandStyle = await convertToShorthand(originalStyle);
          $(element).attr('style', shorthandStyle);
        } catch (error) {
          console.error(`Error converting style for element at index ${i}:`, error);
        }
      }
    }
  

        $("td").each(function() {
            if ($(this).css("display") === "none") {
                $(this).remove();
            }
        });

    return $.html();
  }
  function convertToShorthand(style) {
    let shorthandStyle = style;
  
    // Object to keep track of border components
    const borderComponents = {
      width: null,
      style: null,
      color: null,
    };
  
    // Track border components
    shorthandStyle = shorthandStyle.replace(/border-(width|style|color):\s*([^;]+);?/g, (match, type, value) => {
      borderComponents[type] = value;
      return '';
    });
  
    // Combine border components into shorthand property
    if (borderComponents.width || borderComponents.style || borderComponents.color) {
      let borderValue = '';
      if (borderComponents.width) borderValue += `${borderComponents.width} `;
      if (borderComponents.style) borderValue += `${borderComponents.style} `;
      if (borderComponents.color) borderValue += `${borderComponents.color}`;
  
      shorthandStyle += `border: ${borderValue};`;
    }
  
    // Convert margin
    shorthandStyle = shorthandStyle.replace(/margin-(top|right|bottom|left):\s*([^;]+);?/g, (match, side, value) => {
      return '';
    }).replace(/margin:\s*([^;]+);?/g, (match, values) => {
      const valuesArray = values.split(/\s+/);
      if (valuesArray.length === 1) return `margin: ${valuesArray[0]};`;
      if (valuesArray.length === 2) return `margin: ${valuesArray[0]} ${valuesArray[1]};`;
      if (valuesArray.length === 3) return `margin: ${valuesArray[0]} ${valuesArray[1]} ${valuesArray[2]};`;
      if (valuesArray.length === 4) return `margin: ${valuesArray[0]} ${valuesArray[1]} ${valuesArray[2]} ${valuesArray[3]};`;
      return match;
    });
  
    // Convert padding
    shorthandStyle = shorthandStyle.replace(/padding-(top|right|bottom|left):\s*([^;]+);?/g, (match, side, value) => {
      return '';
    }).replace(/padding:\s*([^;]+);?/g, (match, values) => {
      const valuesArray = values.split(/\s+/);
      if (valuesArray.length === 1) return `padding: ${valuesArray[0]};`;
      if (valuesArray.length === 2) return `padding: ${valuesArray[0]} ${valuesArray[1]};`;
      if (valuesArray.length === 3) return `padding: ${valuesArray[0]} ${valuesArray[1]} ${valuesArray[2]};`;
      if (valuesArray.length === 4) return `padding: ${valuesArray[0]} ${valuesArray[1]} ${valuesArray[2]} ${valuesArray[3]};`;
      return match;
    });
    //console.log(shorthandStyle);
    return shorthandStyle;
  }
      
const convertHTMLToDocxBuffer = async (newString) => {
    try {
        const $ = cheerio.load(newString);
       
        // const styledHTML= inline(content);
        const styledHTML =await juice($.html());
         // console.log($.html());
         // Convert HTML content from pt to px if necessary
         const convertedToPx = convertPtToPxInHtml(styledHTML);
     console.log("Done @ 611")
       
         const finalHtml=await convertInlineStyles(convertedToPx)
         console.log("Done @ 612" ,finalHtml)
    const fileBuffer = await HTMLtoDOCX(finalHtml, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
      });
      
     
    const filePath ='./test.docx'
    fs.writeFileSync(filePath, fileBuffer);
    } catch (error) {
      console.error('Error converting CSS to shorthand:', error);
      throw error;
    }
  }
  

  convertHTMLToDocxBuffer(htmlString);