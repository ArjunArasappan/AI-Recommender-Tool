import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Tab1 from './Tab1';
import Tab4 from './Tab4';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const [username, setUsername] = useState('');

    const hasPrompted = useRef(false);
    
    useEffect(() => {
        if (!hasPrompted.current) {
            const enteredUsername = prompt("Please enter your username:");
            if (enteredUsername) {
                setUsername(enteredUsername);
                hasPrompted.current = true; // Mark that the user has been prompted
            }
        }
    }, []);

    const styles = {
        tabContainer: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            gap: '10px'
        },
        tabButton: {
            background: 'none',
            border: '1px solid #007BFF',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background 0.3s'
        },
        activeTabButton: {
            background: '#007BFF',
            color: 'white',
        },
        logoAndTextContainer: {
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: '10px',
            left: '10px',
            gap: '10px'
        },
        logoStyle: {
            width: '100px',
            height: 'auto'
        },
        shelfTextStyle: {
            fontSize: '3rem',
            fontFamily: '"Arial", sans-serif',
            fontWeight: 'bold',
            color: '#007BFF'
        }
    }

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={styles.logoAndTextContainer}>
                <img src="/shelve.png" alt="Shelf Logo" style={styles.logoStyle} />
                <span style={styles.shelfTextStyle}>Shelve</span>
            </div>
            <div style={styles.tabContainer}>
                <button
                    style={{ ...styles.tabButton, ...(activeTab === 'tab1' && styles.activeTabButton) }}
                    onClick={() => setActiveTab('tab1')}
                >
                    Search
                </button>
                <button
                    style={{ ...styles.tabButton, ...(activeTab === 'tab4' && styles.activeTabButton) }}
                    onClick={() => setActiveTab('tab4')}
                >
                    Read
                </button>
            </div>
            <div style={{ padding: '50px' }}>
                {username ? (
                    <>
                        {activeTab === 'tab1' && <Tab1 username={username} />}
                        {activeTab === 'tab4' && <Tab4 username={username} />}
                    </>
                ) : (
                    <p>Waiting for username...</p>
                )}
            </div>
        </div>
    );
}

export default Tabs;
