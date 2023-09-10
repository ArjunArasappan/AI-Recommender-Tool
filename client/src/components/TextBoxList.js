// TextBoxList.js
import React, { useState } from 'react';
import usePdfParser from './usePdfParser';
import './TextBoxList.css';

const TextBoxList = () => {
    const [textList, setTextList] = useState(['']);
    const [parsedText, parsePdf] = usePdfParser();

    const handleAddTextBox = (text = '') => {
        setTextList(prevList => [...prevList, text]);
    }

    const handleRemoveTextBox = (index) => {
        setTextList(prevList => prevList.filter((_, i) => i !== index));
    }

    const handleTextChange = (index, event) => {
        const newTextList = [...textList];
        newTextList[index] = event.target.value;
        setTextList(newTextList);
    }

    const handlePDFUpload = async (event) => {
        const uploadedFile = event.target.files[0];
        if (!uploadedFile) return;

        await parsePdf(uploadedFile);
        handleAddTextBox(parsedText);
    }

    return (
        <div>
            {textList.map((text, index) => (
                <div className="text-box-wrapper" key={index}>
                    <input
                        type="text"
                        value={text}
                        onChange={event => handleTextChange(index, event)}
                        className="text-box-input"
                    />
                    <span
                        className="remove-text-btn"
                        onClick={() => handleRemoveTextBox(index)}
                    >x</span>
                </div>
            ))}
            <div>
                <button onClick={() => handleAddTextBox()}>Add Text Box</button>
                <input type="file" onChange={handlePDFUpload} accept=".pdf" />
            </div>
        </div>
    );
}

export default TextBoxList;
