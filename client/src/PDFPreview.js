import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

function PDFPreview({ pdfFile }) {
    return (
        <div className="pdf-container">
            <Document file={pdfFile} renderMode="canvas">
                <Page pageNumber={1} width={150} />
            </Document>
            <span className="pdf-name">{pdfFile.name}</span>
        </div>
    );
}

export default PDFPreview;
