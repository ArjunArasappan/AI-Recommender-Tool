import React, { useState } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Convert selected file to URL and set it
    const fileUrl = URL.createObjectURL(selectedFile);
    setPdfUrl(fileUrl);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      // Assume the API endpoint is 'http://localhost:5000/upload'
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button onClick={handleUpload}>Upload PDF</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {pdfUrl && (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
      </div>
    </div>
  );
}

export default App;
