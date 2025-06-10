import { CalendarModel } from '@/hooks/useCalendarData';
import { useEffect, useRef } from 'react';

interface ViewProps {
    product?: CalendarModel;
}

export default function ReferenceFormView(props: ViewProps) {
    const { product } = props;

    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        function handleResize() {
            const iframe = iframeRef.current;
            if (iframe && iframe.contentWindow) {
                try {
                    const doc = iframe.contentWindow.document;
                    const height = doc.body.scrollHeight;
                    iframe.style.height = height + 'px';
                } catch (e) {
                    // 跨域會報錯，忽略 

                }
            }
        }
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener('load', handleResize);
        }
        return () => {
            if (iframe) {
                iframe.removeEventListener('load', handleResize);
            }
        };
    }, [product?.form_url]);

    return (
        <>
            {product?.form_url && (
                <div className="  my-4">
                    <p className="text-md font-semibold">報名表單:</p>
                    <iframe
                        ref={iframeRef}
                        src={product?.form_url}
                        width="100%"
                        height="800"
                    >
                        正在加載...
                    </iframe>
                </div>
            )}
        </>
    );
}
