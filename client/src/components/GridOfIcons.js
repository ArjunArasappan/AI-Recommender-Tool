import React from 'react';
import FileIcon from './FileIcon/FileIcon';
import './FileIcon/FileIcon.css';

const GridOfIcons = ({ files = [], onSelectPDF }) => {
    return (
        <div className="icon-grid">
            {files.map((file, index) => (
                <FileIcon key={index} label={file.label} preview={file.preview} onSelectPDF={onSelectPDF} />
            ))}
        </div>
    );
}

export default GridOfIcons;