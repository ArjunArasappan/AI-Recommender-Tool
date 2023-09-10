import React, { useState, useEffect } from 'react';
import ResearchPanel from './ResearchPanel';
import axios from 'axios';
import './styles.css'

function App() {
    const [input, setInput] = useState('');
    const [data, setData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [allUploadedFiles, setAllUploadedFiles] = useState([]);
    const [selectedPDFURL, setSelectedPDFURL] = useState('');


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTextSubmit = async () => {
        try {
            const prefix = "research papers on";
            let prompt = prefix + input;
            const response = await axios.post('http://127.0.0.1:5000/api/request', { userInput: prompt });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleFileSubmit = async () => {
        if (!selectedFile) {
            alert("Please select a file before uploading!");
            return;
        }
    
        const formData = new FormData();
        formData.append('pdf', selectedFile);
        formData.append('id', selectedFile.name); // assuming filename as ID for simplicity
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.data.success) {
                setUploadedFiles([...uploadedFiles, selectedFile.name]);
                fetchAllUploadedFiles();  // Fetch updated list after successful upload
            }
            setData(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

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


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
            <div style={{ flex: 1, paddingRight: '20px' }}>
                <h2>Search Scholarly Articles & Papers</h2>
                
                <div>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        placeholder="Enter your research topic"
                        className='app-input'
                    />
                    <button onClick={handleTextSubmit} className='app-button'>
                        Submit Text
                    </button>
                </div>

                <h2>Paper submission</h2>

                <div style={{ marginTop: '20px' }}>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept=".pdf"
                        className='app-input'
                        style={{display: 'block', marginBottom: '10px'}} 
                    />
                    <button onClick={handleFileSubmit} className='app-button'>
                        Upload PDF
                    </button>
                </div>

                <h2>All Uploaded Papers:</h2>
                <ul>
                    {allUploadedFiles.map((file, index) => (
                        <li key={index}>{file}</li>
                    ))}
                </ul>
            </div>
            
            <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}>
            <h2>Uploaded PDFs</h2>
            {allUploadedFiles.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <select 
                        className='app-input'
                        onChange={(e) => {
                            const pdfURL = `http://127.0.0.1:5000/api/retrieve/${e.target.value}`;
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
            {selectedPDFURL && (
                <iframe 
                    src={selectedPDFURL}
                    width="100%" 
                    height="500px" 
                    style={{ border: '1px solid #ddd', borderRadius: '5px' }}
                ></iframe>
            )}


                
                <h2>Results:</h2>
                {Array.isArray(data) && data.map((item, index) => (
                    <ResearchPanel key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}

export default App;