// PDFManager.js
import React, { useState } from 'react';
import './PDFManager.css'; // Import the CSS styles

const PDFManager = ({ children }) => {
    const [selectedPDFURL, setSelectedPDFURL] = useState('');

    const handleSelectPDF = (filename) => {
        const pdfURL = `http://127.0.0.1:5000/api/retrieve/${filename}`;
        setSelectedPDFURL(pdfURL);
    };

    const handleClosePDF = () => {
        setSelectedPDFURL('');
    };

    return (
        <div className="pdf-manager-container">
            {children(handleSelectPDF)}
            {selectedPDFURL && (
                <div className="pdf-overlay">
                    <button className="close-btn" onClick={handleClosePDF}>X</button>
                    <iframe
                        src={selectedPDFURL}
                        width="100%"
                        height="100%"
                        style={{ border: '1px solid #ddd', borderRadius: '5px' }}
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default PDFManager;
