import React, { useRef, useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import './FileIcon.css';
import usePdfRenderer from './PdfRenderer.js';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';

const getFileNameFromUrl = (url) => {
    return url.split('/').pop();
}

const FileIcon = ({ label = "File", pdfUrl }) => {
    const { canvasRef, isLoading } = usePdfRenderer(pdfUrl);
    const renderTaskRef = useRef(null); // to store the rendering task
    const fileName = getFileNameFromUrl(pdfUrl);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : null}
            <canvas ref={canvasRef}></canvas>
            <p>{fileName}</p>
        </div>
    );
}

export default FileIcon;
