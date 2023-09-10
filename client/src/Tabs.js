import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [username, setUsername] = useState('');

    const hasPrompted = useRef(false);
    useEffect(() => {
        if (!hasPrompted.current) {
            const enteredUsername = prompt("Please enter your username:");
            setUsername(enteredUsername);
            hasPrompted.current = true; // Set the ref to true so we know we've prompted already
        }
    }, [username]);

    const tabStyle = {
        cursor: 'pointer',
        padding: '10px 20px',
        border: 'none',
        background: 'none',
        fontSize: '16px',
        borderBottom: '2px solid transparent',
        marginRight: '10px'
    };

    const activeTabStyle = {
        ...tabStyle,
        borderBottom: '2px solid #007BFF'
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
                <button 
                    style={activeTab === 'tab1' ? activeTabStyle : tabStyle} 
                    onClick={() => setActiveTab('tab1')}
                >
                    Tab 1
                </button>
                <button 
                    style={activeTab === 'tab2' ? activeTabStyle : tabStyle} 
                    onClick={() => setActiveTab('tab2')}
                >
                    Tab 2
                </button>
                <button 
                    style={activeTab === 'tab3' ? activeTabStyle : tabStyle} 
                    onClick={() => setActiveTab('tab3')}
                >
                    Tab 3
                </button>
            </div>
            {activeTab === 'tab1' && <Tab1 username={username} />}
            {activeTab === 'tab2' && <Tab2 username={username} />}
            {activeTab === 'tab3' && <Tab3 username={username} />}
        </div>
    );
}

export default Tabs;

