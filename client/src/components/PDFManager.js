import React, { useState } from 'react';

const PDFManager = ({ children }) => {
    const [selectedPDFURL, setSelectedPDFURL] = useState('');

    // This function will handle setting the PDF URL
    const handleSelectPDF = (filename) => {
        const pdfURL = `http://127.0.0.1:5000/api/retrieve/${filename}`;
        setSelectedPDFURL(pdfURL);
    };

    return (
        <>
            {children(handleSelectPDF)}
            {selectedPDFURL && (
                <iframe
                    src={selectedPDFURL}
                    width="100%"
                    height="500px"
                    style={{ border: '1px solid #ddd', borderRadius: '5px' }}
                ></iframe>
            )}
        </>
    );
}

export default PDFManager;
