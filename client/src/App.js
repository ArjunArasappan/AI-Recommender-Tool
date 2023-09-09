import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [data, setData] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/request', { userInput: input });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default App;