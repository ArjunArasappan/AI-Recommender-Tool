import React from 'react';
import FileIcon from './FileIcon';
import FileGrid from './FileGrid';

const Tab1 = () => {
    const files = [
        { url: 'Files/1508.05143.pdf', label: 'File 1' },
        { url: 'Files/fendo-09-00440.pdf', label: 'File 2' },
    ]

    return (
        <div>
            <FileGrid files={files} />
        </div>
    )
    // return <div>
    //     <FileIcon pdfUrl="1508.05143.pdf" label="Document" />
    // </div>;
}

export default Tab1;
