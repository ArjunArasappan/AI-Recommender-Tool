import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';

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



    return (
        <div>
            <div>
                <button onClick={() => setActiveTab('tab1')}>Tab 1</button>
                <button onClick={() => setActiveTab('tab2')}>Tab 2</button>
                <button onClick={() => setActiveTab('tab3')}>Tab 3</button>
                <button onClick={() => setActiveTab('tab4')}>Tab 4</button>
            </div>
            {activeTab === 'tab1' && <Tab1 />}
            {activeTab === 'tab2' && <Tab2 />}
            {activeTab === 'tab3' && <Tab3 />}
            {activeTab === 'tab4' && <Tab4 />}
        </div>
    );
}

export default Tabs;