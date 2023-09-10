import React from 'react';
import GridOfIcons from './GridOfIcons';


const Tab1 = () => {
    const fileData = [
        { label: 'File1', preview: "pdf.png" },
        { label: 'File2', preview: "pdf.png" },
        { label: 'File3', preview: "pdf.png" },
        { label: 'File4', preview: "pdf.png" },
        { label: 'File5', preview: "pdf.png" },
        { label: 'File6', preview: "pdf.png" },
        { label: 'File7', preview: "pdf.png" },
        { label: 'File8', preview: "pdf.png" },
        { label: 'File9', preview: "pdf.png" },
        { label: 'File10', preview: "pdf.png" },
        { label: 'File11', preview: "pdf.png" },
        { label: 'File12', preview: "pdf.png" },

        // ... add as many files as you want
    ];
    return (
        <div className="App">
            <div className="wrapper">
                <GridOfIcons files={fileData} />
            </div>
        </div>
    );
}

export default Tab1;
