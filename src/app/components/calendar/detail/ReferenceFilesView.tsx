import { useAppContext } from '@/context/app-context';
import { useModalContext } from '@/context/modal-context';
import { CalendarModel } from '@/hooks/useCalendarData';
import { useRouter } from 'next/navigation';
import PdfView from '../../common/Widget/PdfView';

interface ViewProps {
    product?: CalendarModel;
    isShare?: boolean;
}

export default function ReferenceFilesView(props: ViewProps) {
    const { product, isShare } = props;
    const { user_id } = useAppContext();
    const { setShowConfirmDelete } = useModalContext();
    const router = useRouter();

    const showFilesView = () => {
        return user_id !== '' || isShare;
    };

    const tipView = () => {
        return (
            <>
                <div className="w-full flex flex-col justify-center items-center min-h-[250px] border-2 border-dashed space-y-2">
                    <p className=" text-gray-500 text-sm">
                        免費註冊以瀏覽全部內容，立即註冊或登入。
                    </p>
                    <button
                        type="button"
                        className=" bg-[#f97316] hover:bg-orange-600 rounded-md text-sm text-white px-2 py-1"
                        onClick={handleClick}
                    >
                        註冊/登入
                    </button>
                </div>
            </>
        );
    };

    const handleClick = () => {
        router.push('/signin?redirect=' + window.location.href);
        // if (user_id === '') {
        //     setShowConfirmDelete({
        //         payload: {
        //             title: '溫馨提示',
        //             content: '免費註冊以瀏覽全部內容，立即註冊或登入。',
        //             confirmText: '註冊/登入',
        //             cancelText: '取消'
        //         },
        //         onSaveCallback: () => {
        //             router.push('/signin?redirect=' + window.location.href);
        //         },
        //         onCancelCallback() {}
        //     });
        // }
    };

    return (
        <>
            {product?.files_url && (
                <div className="my-4">
                    <p className="text-md font-semibold">相關文件:</p>
                    {showFilesView() ? (
                        <>
                            {product?.files_url
                                ?.split(',')
                                .map((url, index) => <PdfView key={index} content={url} />)}
                        </>
                    ) : (
                        tipView()
                    )}
                </div>
            )}
        </>
    );
}
