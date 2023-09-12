import React, { useState, useEffect } from 'react';

const ListComponent = ({ files = [], onSelectPDF }) => {
    const [items, setItems] = useState(files);

    useEffect(() => {
        setItems(files);
    }, [files]);



    const handleItemClick = (name) => {
        if (onSelectPDF) {
            onSelectPDF(name);
        }
        console.log(`Item with name ${name} clicked.`);
    }

    const handleDelete = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    }

    const handleCheckboxChange = (id) => {
        const updatedItems = items.map(item => {
            if (item.id === id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setItems(updatedItems);
    }

    return (
        <div>
            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        <span
                            onClick={() => handleItemClick(item.name)}
                            style={{ flex: 1, cursor: 'pointer', margin: '0 10px' }}
                        >
                            {item.name}
                        </span>
                        <button onClick={() => handleDelete(item.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListComponent;
