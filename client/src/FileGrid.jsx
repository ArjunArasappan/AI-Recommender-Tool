import React from 'react';
import FileIcon from './FileIcon'; // Assuming FileIcon is in the same directory

const FileGrid = ({ files }) => {
    return (
        <div className="file-grid">
            {files.map((file, index) => (
                <FileIcon key={index} pdfUrl={file.url} label={file.label} />
            ))}
        </div>
    );
};

export default FileGrid;
