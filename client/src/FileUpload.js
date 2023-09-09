import React, { useState } from 'react'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core';

export const FileUpload = () => {

    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // for onchange event
    const [selectPdfFile, setSelectPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');

    // for submit event
    const [viewPdf, setViewPdf] = useState(null);

    // onchange event
    const fileObj = ['application/pdf'];
    const handleFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileObj.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setSelectPdfFile(e.target.result);
                    setPdfFileError('');
                }
            }
            else {
                setSelectPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        }
        else {
            alert('select pdf file');
        }
    }

    // form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectPdfFile !== null) {
            setViewPdf(selectPdfFile);
        }
        else {
            setViewPdf(null);
        }
    }

    return (
        <div className='container'>
            <h1> Upload a pdf file</h1>

            <br></br>

            <form className='form-group' onSubmit={handleSubmit}>
                <input type="file" className='form-control'
                    required onChange={handleFileChange}
                />
                {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                <br></br>
                <button type="submit" className='btn btn-success btn-lg'>
                    UPLOAD
                </button>
            </form>
            <br></br>
            <h4>View PDF</h4>
            <div className='pdf-container'>
                {/* show pdf conditionally (if we have one)  */}
                {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                    <Viewer fileUrl={viewPdf}
                        plugins={[defaultLayoutPluginInstance]} />
                </Worker></>}

                {/* if we dont have pdf or viewPdf state is null */}
                {!viewPdf && <>No pdf file choosen </>}
            </div>

        </div>
    )
}

export default FileUpload