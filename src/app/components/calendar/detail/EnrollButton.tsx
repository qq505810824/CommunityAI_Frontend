import { useModalContext } from '@/context/modal-context';
import { CalendarModel } from '@/hooks/useCalendarData';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Button } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product?: CalendarModel;
    enrollUrl?: string
}

export default function EnrollButton(props: ViewProps) {
    const { product, enrollUrl } = props;
    const router = useRouter()
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        router.push(enrollUrl || `/calendar/${product?.id}/enroll`);
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
    }
    return (
        <>
            {product?.form_url && (
                <Button
                    size='sm'
                    sx={{
                        bgcolor: '#f97316',
                        ":hover": {
                            bgcolor: '#ea580c',
                        }
                    }}
                    startDecorator={<ArrowForwardOutlinedIcon />}
                    onClick={handleClick}
                >
                    立即報名
                </Button>
            )
            }
        </>
    );
}
