const puppeteer = require('puppeteer');
const Document = require('./Document');
const mongoose = require('mongoose');

const generateTemplateThumbnail = async () => {
    // Launch the browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Template</title>
</head>
<body>
    <h1>This is Sample Template</h1>
    <p>
        Automating document generation from templates streamlines the creation process, reducing manual effort and minimizing errors. 
        It allows for consistent formatting across all documents, ensuring uniformity in style and structure. 
        By leveraging predefined templates, users can quickly generate documents tailored to specific needs. 
        This automation saves time and enhances productivity by eliminating repetitive tasks. 
        Additionally, it offers flexibility to customize documents while maintaining the overall template integrity.
    </p>
</body>
</html>`
    // Set the HTML content
    const htmlContent = content;

    await page.setContent(htmlContent);

    await page.setViewport({ width: 250, height: 100 });
   // Apply a zoom-out effect using CSS transform
    const scaleFactor = 0.3; // Adjust this to fit the content into the thumbnail size
   await page.evaluate((scaleFactor) => {
       document.body.style.transform = `scale(${scaleFactor})`;
       document.body.style.transformOrigin = 'top left';
       document.body.style.width = `${100 / scaleFactor}%`; // Ensure content fits the scaled viewport
   }, scaleFactor); 

    // Capture the screenshot as a Base64 string
    await page.screenshot({ path: 'thumbnail.png', fullPage: true });
    // Close the browser
    await browser.close();
    // console.log(base64String);
     console.log("Base64 Generated")
};
generateTemplateThumbnail();