import { useState, useEffect, useRef } from 'react';
// import * as pdfjs from 'pdfjs-dist/es5/build/pdf';
import * as pdfjs from 'pdfjs-dist/build/pdf';


const usePdfRenderer = (pdfUrl) => {
    const [isLoading, setIsLoading] = useState(false);
    const canvasRef = useRef(null);
    const renderTaskRef = useRef(null);
    const isLoadingRef = useRef(true); // Using a ref so that the async function can access its latest value


    useEffect(() => {
        const fetchPdf = async () => {
            // if (isLoadingRef.current) {
            //     setIsLoading(true);
            // }

            const loadingTask = pdfjs.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);  // Get the first page

            const scale = canvasRef.current.width / page.getViewport({ scale: 1 }).width;
            const viewport = page.getViewport({ scale: scale });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            if (renderTaskRef.current) {
                renderTaskRef.current.cancel();
            }

            renderTaskRef.current = page.render(renderContext);

            try {
                await renderTaskRef.current.promise;
                if (isLoadingRef.current) {
                    setIsLoading(false);
                }
            } catch (error) {
                if (error.name !== 'RenderingCancelledException' && isLoadingRef.current) {
                    console.error('PDF render error:', error);
                }
            }
        };

        fetchPdf();

        return () => {
            isLoadingRef.current = false;
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel();
            }
        };
    }, [pdfUrl]);

    return { canvasRef, isLoading };
};

export default usePdfRenderer;
