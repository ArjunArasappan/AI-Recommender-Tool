import React, { useState } from 'react';
import './TextBoxList.css'; // Import the CSS

const TextBoxList = () => {
    const [textList, setTextList] = useState(['']);

    const handleAddTextBox = () => {
        setTextList(prevList => [...prevList, '']);
    }

    const handleRemoveTextBox = (index) => {
        setTextList(prevList => prevList.filter((_, i) => i !== index));
    }

    const handleTextChange = (index, event) => {
        const newTextList = [...textList];
        newTextList[index] = event.target.value;
        setTextList(newTextList);
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
            <button onClick={handleAddTextBox}>Add Text Box</button>
        </div>
    );
}

export default TextBoxList;
