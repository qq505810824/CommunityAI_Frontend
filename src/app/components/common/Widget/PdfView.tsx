'use client';

import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
export default function PdfView(props: { content: string }) {
    const { content } = props;

    function isGoogleDriveLink(url: string) {
        return /drive\.google\.com/.test(url);
    }

    // 判断是否为 Google Drive 链接
    if (isGoogleDriveLink(content)) {
        const match = content.match(/\/d\/([a-zA-Z0-9_-]+)/);
        const fileId = match ? match[1] : '';
        const embedUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : content;

        return (
            <iframe
                src={embedUrl}
                width="100%"
                height="600px"
                allow="autoplay"
                style={{ border: 'none' }}
                title="Google Drive PDF"
            />
        );
    }

    // 判断是否为移动端
    const isMobile = useMemo(
        () =>
            typeof window !== 'undefined' &&
            /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),
        []
    );

    // 移动端用 Google Docs Viewer
    // if (isMobile) {
    //     const googleViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(content)}`;
    //     return (
    //         <iframe
    //             src={googleViewer}
    //             width="100%"
    //             height="842px"
    //             style={{ border: 'none' }}
    //             title="PDF Viewer"
    //         />
    //     );
    // }
    const isPdf = content.toLowerCase().endsWith('.pdf') || content.toLowerCase().includes('.pdf');

    if (!isPdf) {
        return (
            <img src={content} className="mb-2 mx-auto w-full rounded-lg border" alt="Preview" />
        );
    }

    // 监听容器宽度变化，实现自适应
    useEffect(() => {
        function updateWidth() {
            if (containerRef.current) {
                setPageWidth(containerRef.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(true)

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setLoading(false)
        setNumPages(numPages);
        setPageNumber(1); // 每次加载新文档时重置到第一页
    }

    const goToPrevPage = () => setPageNumber((prev) => Math.max(1, prev - 1));
    const goToNextPage = () =>
        setPageNumber((prev) => (numPages ? Math.min(numPages, prev + 1) : prev));
    const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
    const resetZoom = () => setScale(1);
    // PC端用 object
    return (
        <div ref={containerRef} className="w-full relative overflow-auto mb-2">
            <Document
                className='min-h-[250px]'
                file={`/api/proxy-pdf?url=${encodeURIComponent(content)}`}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadStart={() => { setLoading(true) }}
                onLoadError={(error) => (
                    <div className="text-red-500 text-center">PDF fail: {error.message}</div>
                )}
            >
                <Page pageNumber={pageNumber} width={pageWidth ? pageWidth * scale : undefined} />
            </Document>
            {!loading &&
                <div className=" absolute top-2 right-2 z-30 space-x-2 flex flex-row items-center">
                    <button
                        onClick={zoomOut}
                        disabled={scale <= 0.5}
                        className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 flex items-center"
                        title="缩小"
                    >
                        <MagnifyingGlassMinusIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={resetZoom}
                        className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                        title="重置"
                    >
                        重置
                    </button>
                    <button
                        onClick={zoomIn}
                        disabled={scale >= 3}
                        className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 flex items-center"
                        title="放大"
                    >
                        <MagnifyingGlassPlusIcon className="w-5 h-5" />
                    </button>
                </div>
            }
            {!loading &&
                <div className=" absolute bottom-1 z-30  w-full">
                    <div className="flex items-center justify-center space-x-2">
                        <button
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                            className={`px-2 py-1 text-sm rounded ${pageNumber <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            上一頁
                        </button>
                        <span>
                            Page {pageNumber} of {numPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={!numPages || pageNumber >= numPages}
                            className={`px-2 py-1 text-sm rounded ${!numPages || pageNumber >= numPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            下一頁
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
