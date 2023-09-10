import { React, useState, useEffect } from 'react';
import TextBoxList from './components/TextBoxList'; // Assuming TextBoxList is in the same directory
import ListComponent from './ListComponent';
import axios from 'axios';


function Tab4() {
    const [allUploadedFiles, setAllUploadedFiles] = useState([]);

    const fetchAllUploadedFiles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/retrieve');
            setAllUploadedFiles(response.data);
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
        }
    };


    useEffect(() => {
        fetchAllUploadedFiles();

    }, []);

    const fileData = allUploadedFiles.map((file, index) => (
        { id: index, name: file, selected: false }
    ))

    return (
        <div>
            <ListComponent files={fileData} />
            <TextBoxList />

        </div>

    );
}

export default Tab4;