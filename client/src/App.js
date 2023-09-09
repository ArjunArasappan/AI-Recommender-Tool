import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';

import './App.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFile(acceptedFiles[0]);
    },
    accept: 'application/pdf'
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="App">
      <div className="header">PDF Viewer</div>

      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag & drop your PDF here, or <span className="clickable">click to select one</span></p>
      </div>

      {file && <div className="pdf-container">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} renderAnnotationLayer={false} />
          ))}
        </Document>
      </div>}
    </div>
  );
}

export default App;