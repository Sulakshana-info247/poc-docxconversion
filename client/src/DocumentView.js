import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

function DocumentView(props) {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const id = props.id || paramId;
  const [editorContent, setEditorContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (id) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/view-documents/${id}`
          );
          const result = await response.json();
          setEditorContent(result.content);
          setFileName(result.fileName);
        } catch (error) {
          console.log("Failed to fetch document", error);
        }
      }
    };

    fetchDocument();
  }, [id]);

  /* useEffect(() => {
  
    if (editorRef.current && editorContent) {
      console.log(editorContent)
      const contentDiv = editorRef.current;
      const parser = new DOMParser();
      const doc = parser.parseFromString(editorContent, 'text/html');
  
      // Get all tables and images
      const tables = doc.querySelectorAll('table');
      const images = doc.querySelectorAll('img');
  
      // Function to handle hover effect
      const addHighlight = (e) => {
        alert("In addHightLight")
        e.target.style.border = '5px solid yellow';
      };
  
      const removeHighlight = (e) => {
        e.target.style.border = '';
      };
  
      // Function to add ID to the clicked element
      const addId = (e) => {
        alert("Add")
        const newId = prompt('Enter a new ID for this element:', e.target.id || '');
        if (newId) {
          e.target.id = newId;
        }
      };
  
      // Attach event listeners
      [...tables, ...images].forEach((element) => {
        console.log(element)
        element.addEventListener('mouseover', addHighlight);
        element.addEventListener('mouseout', removeHighlight);
        element.addEventListener('click', addId);
      });
  
      // Set the updated HTML back to the div
     // editorRef.current.innerHTML = doc.body.innerHTML;
    }
  }, [editorContent]);
    */
/* 
  useEffect(() => {
    if (editorRef.current) {
      const contentDiv = editorRef.current;
      const parser = new DOMParser();
      const doc = parser.parseFromString(editorContent, 'text/html');
      
      // Set the parsed HTML into the content div
      contentDiv.innerHTML = doc.body.innerHTML;

         // Function to find the closest table element
         const findParentTable = (element) => {
          return element.closest('table');
        };
  

      // Function to handle hover effect
      const addHighlight = (e) => {
       if(e.target.tagName === 'TD') {
              const table = findParentTable(e.target);
              table.style.cursor = 'cell'; 
        }
        if ( e.target.tagName === 'IMG') {
          e.target.style.cursor = 'cell';
        }
      };

      const removeHighlight = (e) => {
        if(e.target.tagName === 'TD') {
          const table = findParentTable(e.target);
          table.style.cursor = '';
    }
        if ( e.target.tagName === 'IMG') {
          e.target.style.cursor = '';
        }
      };

      // Function to add ID to the clicked element
      const addId = (e) => {
        if (e.target.tagName === 'TABLE' || e.target.tagName === 'IMG') {
          const newId = prompt('Enter a new ID for this element:', e.target.id || '');
          if (newId) {
            e.target.id = newId;
          }
        }
      };

      // Function to add event listeners to tables and images
      const attachEventListeners = (element) => {
        if (element.tagName === 'TABLE' || element.tagName === 'IMG') {
          element.addEventListener('mouseover', addHighlight);
          element.addEventListener('mouseout', removeHighlight);
          element.addEventListener('click', addId);
        }
      };

      // Attach event listeners to existing tables and images
      const tables = contentDiv.querySelectorAll('table');
      const images = contentDiv.querySelectorAll('img');
      [...tables, ...images].forEach(attachEventListeners);

      // Set up a MutationObserver to detect new elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.tagName === 'TABLE' || node.tagName === 'IMG') {
              attachEventListeners(node);
            }
            // If the node is a parent container, check its children
            if (node.querySelectorAll) {
              const newTables = node.querySelectorAll('table');
              const newImages = node.querySelectorAll('img');
              [...newTables, ...newImages].forEach(attachEventListeners);
            }
          });
        });
      });

      // Start observing the content div for child additions
      observer.observe(contentDiv, { childList: true, subtree: true });

      // Clean up observer and event listeners on unmount
      return () => {
        observer.disconnect();
        [...tables, ...images].forEach((element) => {
          element.removeEventListener('mouseover', addHighlight);
          element.removeEventListener('mouseout', removeHighlight);
          element.removeEventListener('click', addId);
        });
      };
    }
  }, [editorContent]);
 */


  const handleSave = async () => {
    setIsEdit(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/update-content/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editorRef.current.innerHTML,
          }),
        }
      );
      if (response) {
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Failed to save updated document content", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/download/${id}`,
        null,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName.trim()}`);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleInput = (e) => {
    setEditorContent(e.currentTarget.innerHTML);
  };

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-1/2 p-4 flex flex-col">
          <div 
            ref={editorRef}
            contentEditable
            dangerouslySetInnerHTML={{ __html: editorContent }}
            className="border p-4 bg-white shadow-sm rounded-lg flex-grow"
            style={{ height: "500px", overflow: "auto" }}
          >
           
          </div>
       </div>
       {/* <div className="w-1/2 p-4 flex flex-col " >
          <div
            ref={editorRef}
            contentEditable
            className="border p-4 bg-white shadow-sm rounded-lg flex-grow hidden"
            style={{ height: "500px", overflow: "auto" }}
          >
            {editorContent}
          </div>
       
      </div> */}
      </div>

      <div >
        <button
          onClick={handleExport}
          disabled={isEdit}
          className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download
        </button>

        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
  
    </>
  );
}

export default DocumentView;
