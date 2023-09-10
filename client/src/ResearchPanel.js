import React, { useState } from 'react';
import './styles.css'

function ResearchPanel({ item, index }) {
    const [buttonState, setButtonState] = useState({
        color: '#007BFF', 
        text: 'Wacky Button', 
        disabled: false
    });

    const handleWackyButtonClick = async () => {
        if (item.url.slice(-4) === ".pdf") {
            try {
                // Upload to Google Cloud Storage
                console.log("worked!")
    
                setButtonState({ color: 'green', text: 'Upload Succeeded', disabled: true });
            } catch (error) {
                console.error("Error uploading to Google Cloud:", error);
                setButtonState({ color: 'red', text: 'Upload Failed', disabled: true });
            }
        }
        else{
            setButtonState({ color: 'red', text: 'Upload Failed', disabled: true });
        }
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
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>Read More</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
    );
}

export default ResearchPanel;