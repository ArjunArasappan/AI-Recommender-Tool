import React, { useState } from 'react';

const TextBoxList = () => {
    const [textList, setTextList] = useState(['']); // Initially contains one empty string for a single text box.

    const handleAddTextBox = () => {
        setTextList(prevList => [...prevList, '']); // Add another empty string for a new text box.
    }

    const handleRemoveTextBox = (index) => {
        setTextList(prevList => prevList.filter((_, i) => i !== index)); // Remove the text box by filtering out its index.
    }

    const handleTextChange = (index, event) => {
        const newTextList = [...textList];
        newTextList[index] = event.target.value;
        setTextList(newTextList); // Update the specific textbox value.
    }

    return (
        <div>
            {textList.map((text, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={text}
                        onChange={event => handleTextChange(index, event)}
                    />
                    <button onClick={() => handleRemoveTextBox(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddTextBox}>Add Text Box</button>
        </div>
    );
}

export default TextBoxList;
