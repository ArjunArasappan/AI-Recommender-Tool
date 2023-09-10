import React, { useState } from 'react';
import './styles.css'
import axios from 'axios';

function ResearchPanel({ item, index, onWackyButtonClick }) {
    const [buttonState, setButtonState] = useState({
        color: '#007BFF', 
        text: 'Upload PDF', 
        disabled: false
    });

    const handleWackyButtonClick = async () => {
        // console.log(item.url)
        if (item.url.slice(-4) === ".pdf" || item.url.includes("arxiv")) {
            try {
                if (item.url.includes("arxiv")){
                    item.url = item.url.replace("/abs/", "/pdf/")
                    if (item.url.slice(-4) !== ".pdf"){
                        item.url = item.url + ".pdf"
                    }
                }
                // console.log(item.url + "|AFTER")
                // Fetch the PDF from the Flask endpoint
                const response = await axios.post('http://127.0.0.1:5000/fetch-pdf', { pdf_url: item.url }, { responseType: 'blob' });
            
                const formData = new FormData();
                formData.append('pdf', response.data, item.url); 

                // Upload the modified PDF to the Flask backend
                const uploadResponse = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
    
                if (uploadResponse.data.success) {
                    setButtonState({ color: 'green', text: 'Upload Succeeded', disabled: true });
                    const test3 = await axios.post('http://127.0.0.1:5000/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                    if (onWackyButtonClick) {
                        onWackyButtonClick();
                    }
                } else {
                    setButtonState({ color: 'red', text: 'Please Upload Manually', disabled: true });
                    console.error(uploadResponse.data.message);
                }
    
            } catch (error) {
                console.error("Error processing and uploading PDF:", error);
                setButtonState({ color: 'red', text: 'Please Upload Manually', disabled: true });
            }
        }
        else{
            setButtonState({ color: 'red', text: 'Please Upload Manually', disabled: true });
        }

        // const test = await axios.post('http://127.0.0.1:5000/explain-jargon', { "jargon": "Contrastive pretraining", "paragraph": "There is increasing adoption of artificial intelligence in drug discovery. However, existing works use machine learning to mainly utilize the chemical structures of molecules yet ignore the vast textual knowledge available in chemistry. Incorporatingtextual knowledge enables us to realize new drug design objectives, adapt to text-based instructions, and predict complexbiological activities. We present a multi-modal molecule structure-text model, MoleculeSTM, by jointly learning molecule’schemical structures and textual descriptions via a contrastive learning strategy. To train MoleculeSTM, we construct thelargest multi-modal dataset to date, namely PubChemSTM, with over 280K chemical structure-text pairs. To demonstratethe effectiveness and utility of MoleculeSTM, we design two challenging zero-shot tasks based on text instructions,including structure-text retrieval and molecule editing. MoleculeSTM possesses two main properties: open vocabulary andcompositionality via natural language. In experiments, MoleculeSTM obtains the state-of-the-art generalization ability to novelbiochemical concepts across various benchmarks." });
        // const test2 = await axios.post('http://127.0.0.1:5000/api/recommend', { "links":[]})
    };

    return (
        <div key={index} style={{ 
            padding: '20px', 
            marginBottom: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '5px', 
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
        }}>
            <div style={{ marginBottom: '10px' }}>
                <h3>{item.title}</h3>
                <p><strong>Author:</strong> {item.author}</p>
                <p><strong>Published Date:</strong> {item.published_date}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Read More</a>
                </div>
                <div>
                    <button 
                        onClick={() => handleWackyButtonClick(item, setButtonState)} 
                        className='app-button'
                        style={{background: buttonState.color }}
                        disabled={buttonState.disabled}
                    >
                        {buttonState.text}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResearchPanel;