import React, { useState } from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <div>
            <div>
                <button onClick={() => setActiveTab('tab1')}>Tab 1</button>
                <button onClick={() => setActiveTab('tab2')}>Tab 2</button>
                <button onClick={() => setActiveTab('tab3')}>Tab 3</button>
            </div>
            {activeTab === 'tab1' && <Tab1 />}
            {activeTab === 'tab2' && <Tab2 />}
            {activeTab === 'tab3' && <Tab3 />}
        </div>
    );
}

export default Tabs;
