import React, { useState,useRef } from 'react';
import axios from 'axios';
import * as docx from 'docx-preview';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [conversionStatus, setConversionStatus] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

  };

  
  const handleSelectDocument = (docId) => {
    navigate(`/document/${docId}`);
  };

  
  const convertFiled = async (content, file) => {
    setConversionStatus('Converting...');
    const formData = new FormData();
    formData.append('docxFile', file);
    formData.append('content', content);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/converted`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result._id);
        handleSelectDocument(result._id);
        setConversionStatus(`Conversion successful! Content: ${result.content}`);
      } else {
        setConversionStatus('Conversion failed. Please try again.');
      }
    } catch (error) {
      setConversionStatus('An error occurred during conversion.');
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onGetFile(file);
    }
  };
  const onGetFile = async (file) => {
    setFile(file);

    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear previous content

  //  const options = { inWrapper: true, ignoreWidth: false, ignoreHeight: false, ignoreLastRenderedPageBreak: false };
 const options= {
    className: "docx", //class name/prefix for default and document style classes
    inWrapper:  true, //enables rendering of wrapper around document content
    ignoreWidth:  false, //disables rendering width of page
    ignoreHeight:  false, //disables rendering height of page
    ignoreFonts:  false, //disables fonts rendering
    breakPages:  true, //enables page breaking on page breaks
    ignoreLastRenderedPageBreak:  true, //disables page breaking on lastRenderedPageBreak elements
    experimental:  false, //enables experimental features (tab stops calculation)
    trimXmlDeclaration:  true, //if true, xml declaration will be removed from xml documents before parsing
    useBase64URL: true, //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
    renderChanges: false, //enables experimental rendering of document changes (inserions/deletions)
    renderHeaders: true, //enables headers rendering
    renderFooters: true, //enables footers rendering
    renderFootnotes: true, //enables footnotes rendering
    renderEndnotes: true, //enables endnotes rendering
    renderComments: true, //enables experimental comments rendering
    debug: false, //enables additional logging
}

    try {
        await docx.renderAsync(file, container, null, options);
        console.log('docx: finished');
        console.log(container.innerHTML);

        // Convert all image elements to Base64
        const images = container.querySelectorAll('img');
     /* if(images.length>0){
        for (let img of images) {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const reader = new FileReader();
            
            reader.onloadend = () => {
                // Convert the image to a JPEG data URL
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const image = new Image();
                
                image.onload = () => {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0);
                    img.src = canvas.toDataURL('image/png');
                    
                    // Call convertFiled after all images are converted
                    if ([...images].every(image => image.src.startsWith('data:image/png'))) {
                        convertFiled(container.innerHTML, file);
                    }
                };
                
                image.src = reader.result;
            };
            
            reader.readAsDataURL(blob);
        }

      }else{ convertFiled(container.innerHTML, file);}*/
        
      convertFiled(container.innerHTML, file);
        // Ensure the container height matches the document height for pagination
        const pages = container.querySelectorAll('.docx-page');
        if (pages.length > 0) {
            const totalHeight = Array.from(pages).reduce((height, page) => height + page.scrollHeight, 0);
            container.style.height = `${totalHeight}px`;
        }
    } catch (error) {
        console.error('docx rendering error:', error);
    }
};


  return (
    <div>
      <h2>Upload a Document</h2>
      <div className="text-center py-10 relative w-full mb-10" >
          <input
            type="file"
            name="docxFile"
            accept=".docx, .pdf"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 cursor-pointer border border-gray-300 shadow-lg shadow-white"
          />
          <button className="mt-2 px-4 py-2 text-white rounded hover:bg-blue-700 justify-between">
            <FaUpload className="m-6 mb-1 text-white" /><span>Upload</span>
          </button>
        </div>
      <div
        id="container"
        style={{
          overflowY: 'auto',
          border: '1px solid #ccc',
          marginTop: '20px',
          padding: '20px',
          position: 'relative',
          display: 'none',
        }}
        ref={contentRef}
      ></div>
    </div>
  );
};

export default FileUpload;
