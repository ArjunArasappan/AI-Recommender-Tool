import React from 'react';
import FileIcon from './FileIcon';
import './FileIcon.css';

const GridOfIcons = ({ files = [] }) => {
    return (
        <div className="icon-grid">
            {files.map((file, index) => (
                <FileIcon key={index} label={file.label} preview={file.preview} />
            ))}
        </div>
    );
}

export default GridOfIcons;
