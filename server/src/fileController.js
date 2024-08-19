const Document = require('./Document');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const cheerio = require('cheerio');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const juice = require('juice');
const HTMLtoDOCX = require('html-to-docx')
const  { inline } = require('@css-inline/css-inline');
//const  HTMLtoDOCX = require('html-docx-js');



exports.convertedFile = async (req, res) => {
    try {
      console.log("convertedFile");
      const fileName = req.file.originalname;
      const content = req.body.content;
      const modifiedContent = req.body.content;
      const newTemplate = new Document({
        fileName,
        content,
        modifiedContent,
         });
         //console.log(content);
      await newTemplate.save();
      res.json(newTemplate);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred during conversion.");
    }
  };

exports.viewDocument = async (req, res) => {
    try {
      
        const document = await Document.findById(req.params.id);
        // Check if document exists
        if (!document) {
          return res.status(404).json({ message: 'Document not found' });
        }
        
    // Export and update document content
       document.content = await exportTemplate(document);

    // Send response
    res.json(document);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during conversion.");
    }
  };
exports.downloadDocument = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Find the document by ID
        const document = await Document.findById(id);
        if (!document) {
          return res.status(404).send("Document not found");
        }
    
        // Export and update document content
        document.content = await exportTemplate(document);
        const content = document.content;
     // Load content with cheerio
        const $ = cheerio.load(content);
       
       // const styledHTML= inline(content);
       // const styledHTML =await juice($.html());
        // console.log($.html());
        // Convert HTML content from pt to px if necessary
        const convertedToPx = convertPtToPxInHtml(content);
    
      
        const finalHtml=await convertInlineStyles(convertedToPx)
        document.modifiedContent = finalHtml;
        document.save();
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(finalHtml);
          // Convert HTML to DOCX buffer
        const buffer = await convertHTMLToDocxBuffer(finalHtml);
      
    
        // Set headers and send response
        res.setHeader('Content-Type', 'application/vnd.ms-word');
        res.setHeader('Content-Disposition', `attachment; filename="${document.fileName || 'converted'}"`);
        res.send(buffer);
      } catch (error) {
        // Log error and send appropriate response
        console.error('Error during document download:', error);
        res.status(500).send("An error occurred during the download.");
      }
};
 

async function exportTemplate(document) {
    try {
      // Validate input
      if (!document) {
        throw new Error('Document not found');
      }
  
      // Load HTML content
      const { content } = document;
      const $ = cheerio.load(content);
 
      $('td').each(function() {
        const $this = $(this);
        if ($this.css('background') === 'inherit') {
          $this.css('background', '');
        }
        if ($this.css('background-color') === 'inherit') {
          $this.css('background-color', '');
        }
      });
  
      // Return updated HTML
      return $.html();
    } catch (error) {
      console.error('An error occurred during the export:', error.message);
      throw new Error('An error occurred during the export.');
    }
  }

  
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

  
const convertHTMLToDocxBuffer = async (htmlString) => {
    try {
    
      /*   htmlString=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Table</title>
   </head>
<body>
    <table>
        <tr>
            <th style="border: 1pt solid black;">Heading 1</th>
            <th style="border: 1pt solid black;">Heading 2</th>
            <th style="border: 1pt solid black;">Heading 3</th>
        </tr>
        <tr>
            <td style="border: 1pt solid black;">Row 1, Column 1</td>
            <td style="border: 1pt solid black;">Row 1, Column 2</td>
            <td style="border: 1pt solid black;">Row 1, Column 3</td>
        </tr>
        <tr>
            <td style="border: 1pt solid black;">Row 2, Column 1</td>
            <td style="border: 1pt solid black;">Row 2, Column 2</td>
            <td style="border: 1pt solid black;">Row 2, Column 3</td>
        </tr>
        <tr>
            <td style="border: 1pt solid black;">Row 3, Column 1</td>
            <td style="border: 1pt solid black;">Row 3, Column 2</td>
            <td style="border: 1pt solid black;">Row 3, Column 3</td>
        </tr>
    </table>
</body>
</html>

` */
     
  console.log(htmlString);
    const fileBuffer = await HTMLtoDOCX(htmlString, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
      });
      
      return fileBuffer;
    } catch (error) {
      console.error('Error converting CSS to shorthand:', error);
      throw error;
    }
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
    const parentWidth =  700;
$('table').each(function() {
  const $table = $(this);
  
  // Convert table width
 // const parentWidth = $table.parent().css('width').match(/([\d.]+)px/);
  
  if (parentWidth) {
    const parentWidthPx = parseFloat(parentWidth);
    console.log('@217',parentWidthPx)
    convertWidth($table, parentWidthPx);

    // Convert tr and td widths within the table
    $table.find('tr').each(function() {
      const $tr = $(this);
      convertWidth($tr, parentWidthPx);
      
      $tr.find('td').each(function() {
        const $td = $(this);
        convertWidth($td, parentWidthPx);
      });
    });
  }
});/*
$('table, tr, td').each(function() {
  // Get the width attribute or inline style
  const width = $(this).attr('width') || $(this).css('width');
  
  // Check if the width is specified in percentages
  if (width && width.includes('%')) {
      // Remove the width attribute
      $(this).removeAttr('width');

      // Alternatively, you could also remove inline style width
      $(this).css('width', '');
  }
});
  */

$('table, tr, td').each(function() {
  // Get the width attribute or inline style
  const width = $(this).attr('width') || $(this).css('width');
  
  // Check if the width is specified in percentages
  if (width && width.includes('auto')) {
      // Remove the width attribute
      $(this).removeAttr('width');

      // Alternatively, you could also remove inline style width
      $(this).css('width', '');
  }
});
    $("td").each(function() {
      if ($(this).css("display") === "none") {
          $(this).remove();
      }
    });
  
    return $.html();
  }
  
// Helper function to convert percentage to pixels
function convertWidth(element, parentWidthPx) {
  // Match width percentage in the style attribute
  const widthStyle = element.attr('style').match(/width:\s*([\d.]+)%/);

  if (widthStyle) {
    // Convert the width percentage to a float
    const widthPercent = parseFloat(widthStyle[1]);
    console.log(widthPercent);

    // Calculate the width in pixels based on the parent width
    const elementWidthPx = (widthPercent / 100) * parentWidthPx;
    console.log(elementWidthPx);
    // Replace the width percentage with the calculated pixel width in the style
    const newStyle = element.attr('style').replace(/width:\s*[\d.]+%/, `width: ${elementWidthPx}px`);
    element.attr('style', newStyle);
  }
}
