import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListComponent from './ListComponent';
import TextBoxList from './components/TextBoxList';

const Tab4 = ({ username }) => {
    const [allUploadedFiles, setAllUploadedFiles] = useState([]);
    const [selectedPDFURL, setSelectedPDFURL] = useState('');


    const fetchAllUploadedFiles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/retrieve', {
                params: {
                    username
                }
            });
            setAllUploadedFiles(response.data);
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
        }
    };

    useEffect(() => {
        fetchAllUploadedFiles();
    }, []);

    const fileData = allUploadedFiles.map((file, index) => (
        { id: index, name: file, selected: false }
    ));

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>

            <div style={{ flex: 1, paddingRight: '20px', background: '#f4f4f8', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Your Lists & Texts</h3>
                <ListComponent files={fileData} />
                <TextBoxList />
            </div>

            <div style={{ flex: 2, paddingLeft: '20px', background: '#f4f4f8', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Uploaded PDFs</h3>
                {allUploadedFiles.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <select
                            style={{
                                padding: '10px',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                marginBottom: '10px'
                            }}
                            onChange={(e) => {
                                const pdfURL = `http://127.0.0.1:5000/api/retrieve/${e.target.value}?username=${username}`;
                                setSelectedPDFURL(pdfURL);
                            }}
                        >
                            <option value="">-- Select a PDF --</option>
                            {allUploadedFiles.map((file, index) => (
                                <option key={index} value={file}>
                                    {file}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div style={{ marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    {selectedPDFURL && (
                        <iframe
                            title="PDF viewer"
                            src={selectedPDFURL}
                            width="100%"
                            height="500px"
                            style={{ border: 'none', borderRadius: '5px' }}
                        ></iframe>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tab4;