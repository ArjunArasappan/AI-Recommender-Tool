
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PDFManager from './components/PDFManager';
import TextBoxList from './components/TextBoxList'; // Assuming TextBoxList is in the same directory


const Tab2 = ({ username = "test" }) => {
    console.log(username);
    const [allUploadedFiles, setAllUploadedFiles] = useState([]);
    const [input, setInput] = useState('');


    const fetchAllUploadedFiles = async () => {
        console.log("yehaw")
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
        { label: file, preview: "pdf.png" }
    ))

    // ];
    return (
        <div style={{ display: 'flex', position: 'relative', padding: '50px' }}>
            {/* Search and Upload section */}
            <div style={{ flex: 1, paddingRight: '20px', marginTop: '20px' }}>
                <h2>Search Scholarly Articles & Papers</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '70px' }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Enter your research topic"
                        style={styles.input}
                    />
                    <button onClick={handleTextSubmit} style={{ ...styles.button, marginTop: '10px' }}>
                        Submit Text
                    </button>
                </div>

                <h2 style={{ marginTop: '100px' }}>Results:</h2>
                <div style={{ height: '400px', overflowY: 'auto', marginTop: '20px' }}>
                    {Array.isArray(data) && data.map((item, index) => (
                        <div key={index} style={{ padding: '20px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px', boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ marginBottom: '10px' }}>{item.title}</h3>
                            <p><strong>Author:</strong> {item.author}</p>
                            <p><strong>Published Date:</strong> {item.published_date}</p>
                            <p><strong>Score:</strong> {item.score.toFixed(2)}</p>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Read More</a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload section */}
            <div style={{ flex: 1, paddingRight: '20px', marginTop: '20px' }}>
                <h2>Paper submission</h2>
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

export default Tab2;