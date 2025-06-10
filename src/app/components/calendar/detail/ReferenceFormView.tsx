import { useAppContext } from '@/context/app-context';
import { useAccountOperations } from '@/hooks/useAccountData';
import { CalendarModel } from '@/hooks/useCalendarData';
import { useEffect, useRef } from 'react';

interface ViewProps {
    product?: CalendarModel;
}

export default function ReferenceFormView(props: ViewProps) {
    const { product } = props;

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { user_id } = useAppContext()
    const { enrollCalendarById } = useAccountOperations()

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

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            // 可加 event.origin 校验安全性
            if (event.data && event.data.type === 'form_submit_success') {
                // 这里就是表单提交成功的回调
                // alert('表单提交成功！');

                handleEnrollSuccess(event.data)
                // 你可以做任何后续处理
            }
        }
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleEnrollSuccess = async (data: any) => {
        // console.log('event.data', data);
        const res = await enrollCalendarById({
            account_id: user_id,
            calendar_id: product?.id,
            meta: data,
            source: 'konnect_ai',
            status: 'pedding'
        })
    }
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
