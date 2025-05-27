import { useMemo } from 'react';

export default function PdfView(props: { content: string }) {
    const { content } = props;

    function isGoogleDriveLink(url: string) {
        return /drive\.google\.com/.test(url);
    }

    // 判断是否为 Google Drive 链接
    if (isGoogleDriveLink(content)) {
        const match = content.match(/\/d\/([a-zA-Z0-9_-]+)/);
        const fileId = match ? match[1] : '';
        const embedUrl = fileId
            ? `https://drive.google.com/file/d/${fileId}/preview`
            : content;

        return (
            <iframe
                src={embedUrl}
                width="100%"
                height="842px"
                allow="autoplay"
                style={{ border: 'none' }}
                title="Google Drive PDF"
            />
        );
    }

    // 判断是否为移动端
    const isMobile = useMemo(
        () => typeof window !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),
        []
    );

    // 移动端用 Google Docs Viewer
    if (isMobile) {
        const googleViewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(content)}`;
        return (
            <iframe
                src={googleViewer}
                width="100%"
                height="842px"
                style={{ border: 'none' }}
                title="PDF Viewer"
            />
        );
    }

    // PC端用 object
    return (
        <div className="w-full relative overflow-auto" style={{ height: '842px' }}>
            <object
                className="object-center object-cover w-full h-full flex justify-center items-center"
                type="application/pdf"
                data={content + '#toolbar=0&navpanes=0&scrollbar=0'}
                width="100%"
                height="100%"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
                    alt="PDF file icon"
                    className="w-full"
                />
            </object>
        </div>
    );
}