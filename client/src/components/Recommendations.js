import React, { useState, useEffect } from 'react';

import axios from 'axios';

import ResearchPanel from '../ResearchPanel';





const Recommendations = ({ username, links }) => {

    const [recommendedResults, setRecommendedResults] = useState([]);

    const [allUploadedFiles, setAllUploadedFiles] = useState([]);

    console.log(username)
    console.log("hifdsahi")


    const fetchAllUploadedFiles = async () => {

        try {
            console.log(1)
            console.log(username)
            const response = await axios.get('http://127.0.0.1:5000/api/retrieve', {
                params: {
                    username
                }
            });
            console.log(response);
            console.log(2);

            setAllUploadedFiles(response.data);
            // Assuming that you want recommendations based on the recently uploaded files

            if (response.data.length > 0) {
                console.log(3);
                fetchRecommendations(response.data);

            }
        } catch (error) {
            console.error("Error fetching uploaded files:", error);
        }
    };
    useEffect(() => {
        fetchAllUploadedFiles();
    }, []);



    const fetchRecommendations = async (uploadedFiles) => {

        try {

            const response = await axios.post('http://127.0.0.1:5000/api/recommend', {

                links: uploadedFiles.slice(0, 3) // We'll send the first 3 file links or less for recommendations

            });

            console.log({

                links: uploadedFiles.slice(0, 3) // We'll send the first 3 file links or less for recommendations

            })

            setRecommendedResults(response.data);

        } catch (error) {

            console.error("Error fetching recommendations:", error);

        }

    };



    const styles = {

        container: {

            background: '#f7f9fc',

            padding: '30px',

            borderRadius: '10px',

            boxShadow: '0px 4px 15px rgba(0,0,0,0.1)'

        },

        button: {

            padding: '10px 20px',

            background: '#007BFF',

            border: 'none',

            borderRadius: '5px',

            color: 'white',

            cursor: 'pointer',

            transition: 'background 0.3s',

            marginTop: '10px'

        },

        input: {

            padding: '10px',

            width: '100%',

            borderRadius: '5px',

            border: '1px solid #ddd',

        },

        heading: {

            borderBottom: '3px solid #007BFF',

            paddingBottom: '10px',

            marginBottom: '20px',

        }

    };



    return (

        <div>

            <div style={{ height: '400px', overflowY: 'auto', marginTop: '20px' }}>

                {Array.isArray(recommendedResults) && recommendedResults.map((item, index) => (

                    <ResearchPanel key={index} item={item} index={index} />

                ))}

            </div>

        </div>

    );

};



export default Recommendations;