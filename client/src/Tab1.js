import React, { useState } from 'react';
import axios from 'axios';
import ResearchPanel from './ResearchPanel';

const Tab1 = ({ username }) => {
    const [input, setInput] = useState('');
    const [data, setData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);  // New state
    const [submissionCount, setSubmissionCount] = useState(0);


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTextSubmit = async () => {
        try {
            const prefix = "research papers on";
            let prompt = prefix + input;
            const response = await axios.post('http://127.0.0.1:5000/api/request', {
                'userInput': prompt,
                'username': username
            });
            setData(response.data);
            // Increment the submission count
            setSubmissionCount(prevCount => prevCount + 1);
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
        formData.append('username', username);

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.data.success) {
                setUploadedFiles([...uploadedFiles, selectedFile.name]);
            }
            setData(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }


    const styles = {
        container: {
            background: '#f7f9fc',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 4px 15px rgba(0,0,0,0.1)'
        },
        button: {
            padding: '10px 20px',
            background: '#007BFF',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            transition: 'background 0.3s',
            marginTop: '10px'
        },
        input: {
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ddd',
        },
        heading: {
            borderBottom: '3px solid #007BFF',
            paddingBottom: '10px',
            marginBottom: '20px',
        }
    }

    return (
        <div style={{ display: 'flex', position: 'relative', padding: '50px' }}>

            <div style={{ flex: 1, paddingRight: '20px', ...styles.container }}>
                <h2 style={styles.heading}>Search Scholarly Articles & Papers</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter your research topic"
                        style={styles.input}
                    />
                    <button onClick={handleTextSubmit} style={styles.button}>
                        Submit Text
                    </button>
                </div>

                <h2 style={{ marginTop: '60px', ...styles.heading }}>Results:</h2>
                <div style={{ height: '400px', overflowY: 'auto', marginTop: '20px' }}>
                    {Array.isArray(data) && data.map((item, index) => (
                        <ResearchPanel key={index} item={item} index={index} username={username} />
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, paddingLeft: '20px', ...styles.container }}>
                <h2 style={{ ...styles.heading }}>Paper submission</h2>
                <div style={{ marginTop: '20px' }}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        style={{ ...styles.input, display: 'block', marginBottom: '10px' }}
                    />
                    <button onClick={handleFileSubmit} style={styles.button}>
                        Upload PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Tab1;