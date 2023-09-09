// PdfViewerWithAnnotations.js

import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AnnotationOverlay from './AnnotationOverlay'; // Create this component separately

// Enable PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewerWithAnnotations() {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);

    useEffect(() => {
        if (file) {
            setNumPages(null); // Reset numPages when a new PDF is loaded
        }
    }, [file]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handleChange(event) {
        const newFile = event.target.files[0];
        if (newFile) {
            setFile(URL.createObjectURL(newFile));
            setAnnotations([]); // Clear annotations when a new PDF is selected
        }
    }

    function addAnnotation(annotation) {
        setAnnotations((prevAnnotations) => [
            ...prevAnnotations,
            { page: selectedPage, ...annotation },
        ]);
    }

    return (
        <div>
            <input type="file" onChange={handleChange} accept=".pdf" />
            {file && (
                <>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page
                            pageNumber={selectedPage}
                            onClick={({ pageX, pageY }) => {
                                // Add your annotation logic here, e.g., a simple text annotation
                                const annotationText = prompt('Enter your annotation:');
                                if (annotationText) {
                                    addAnnotation({ x: pageX, y: pageY, text: annotationText });
                                }
                            }}
                        />
                    </Document>
                    <AnnotationOverlay
                        annotations={annotations.filter((annotation) => annotation.page === selectedPage)}
                    />
                    <div>
                        <span>Page:</span>
                        <input
                            type="number"
                            min={1}
                            max={numPages}
                            value={selectedPage}
                            onChange={(e) => setSelectedPage(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <PDFDownloadLink
                            document={<AnnotationOverlay annotations={annotations} />}
                            fileName="annotations.pdf"
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? 'Loading document...' : 'Download Annotations PDF'
                            }
                        </PDFDownloadLink>
                    </div>
                </>
            )}
        </div>
    );
}

export default PdfViewerWithAnnotations;
