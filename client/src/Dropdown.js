import React from 'react';

const Dropdown = ({ position, onClose }) => {
    // Inline styles for positioning based on cursor click
    const style = {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        backgroundColor: 'white',
        border: '1px solid gray',
        zIndex: 1000, // Make sure it's above other elements
        display: 'flex',
        flexDirection: 'column', // aligns items vertically
        alignItems: 'center', // centers items horizontally
        gap: '5px' // adds space between items
    };

    return (
        <div style={style}>
            <button onClick={onClose}>View PDF</button>
            <button onClick={onClose}>Change Comprehension</button>
            <input type="range" min="1" max="100" />
        </div>
    );
}

export default Dropdown;