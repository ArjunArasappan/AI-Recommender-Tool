import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';
import './FileIcon.css';

const FileIcon = ({ label = 'File', preview }) => {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState(null);
    const containerRef = useRef(null); // Reference to the file container

    const style = {
        backgroundImage: preview ? `url(${preview})` : undefined,
        border: isHighlighted ? '2px solid blue' : 'none' // Highlighting with a blue border for this example.
    };

    const handleClick = (event) => {
        setIsHighlighted(!isHighlighted);

        if (!dropdownPosition) {
            setDropdownPosition({
                x: event.clientX,
                y: event.clientY
            });
        } else {
            setDropdownPosition(null);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsHighlighted(false);
                setDropdownPosition(null);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [dropdownPosition]);

    return (
        <div className="file-container" onClick={handleClick} ref={containerRef}>
            <div className="file-icon" style={style}></div>
            <div className="file-label">{label}</div>
            {dropdownPosition &&
                <Dropdown
                    position={dropdownPosition}
                    onClose={() => setDropdownPosition(null)}
                />}
        </div>
    );
}

export default FileIcon;
