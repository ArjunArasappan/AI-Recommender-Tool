import React, { useState, useEffect } from 'react';
import GridOfIcons from './components/GridOfIcons';
import axios from 'axios';
import PDFManager from './components/PDFManager';
import TextBoxList from './components/TextBoxList'; // Assuming TextBoxList is in the same directory


const Tab1 = () => {
    const [allUploadedFiles, setAllUploadedFiles] = useState([]);

    const fetchAllUploadedFiles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/retrieve');
            setAllUploadedFiles(response.data);
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
        }
    };

    useEffect(() => {
        fetchAllUploadedFiles();
    }, []);

    const fileData = allUploadedFiles.map((file, index) => (
        { label: file, preview: "pdf.png" }
    ))

    return (
        <div className="App">
            <div className="wrapper">
                <PDFManager>
                    {(handleSelectPDF) => (
                        <GridOfIcons files={fileData} onSelectPDF={handleSelectPDF} />
                    )}
                </PDFManager>
            </div>
            <div className="text-box-list-wrapper">
                <TextBoxList />
            </div>
        </div>
    );

}

export default Tab1;