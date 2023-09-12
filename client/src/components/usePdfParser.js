// usePdfParser.js
import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { pdfjsWorker } from 'pdfjs-dist/webpack';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const usePdfParser = () => {
    const [parsedText, setParsedText] = useState('');

    const parsePdf = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const pdf = await pdfjs.getDocument({ data }).promise;

            const page = await pdf.getPage(1);
            const content = await page.getTextContent();

            const words = content.items.map(item => item.str);
            const first100Words = words.slice(0, 100).join(' ');
            setParsedText(first100Words);
        };
        reader.readAsArrayBuffer(file);
    };

    return [parsedText, parsePdf];
};

export default usePdfParser;
