import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [data, setData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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
        const formData = new FormData();
        formData.append('pdf', selectedFile);
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    const styles = {
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
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
            <div style={{ flex: 1, paddingRight: '20px' }}>
                <h2>Research Paper Uploader</h2>
                
                <div>
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

                <div style={{ marginTop: '20px' }}>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept=".pdf"
                        style={{...styles.input, display: 'block', marginBottom: '10px'}} 
                    />
                    <button onClick={handleFileSubmit} style={styles.button}>
                        Upload PDF
                    </button>
                </div>
            </div>
            
            <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ccc' }}>
            <h2>Results:</h2>
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
    );
}

export default App;
