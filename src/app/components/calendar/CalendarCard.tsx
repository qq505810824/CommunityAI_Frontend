import { useModalContext } from '@/context/modal-context';
import { CalendarModel } from '@/hooks/useCalendarData';
import { formatK } from '@/utils/stringUtil';
import { CalendarIcon } from '@heroicons/react/24/outline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: CalendarModel;
}

export default function CalendarCard(props: ViewProps) {
    const { product } = props;
    const router = useRouter();
    const { setShowConfirmDelete } = useModalContext();

    const handleClick = () => {
        const storedEmail = localStorage.getItem('user_email') || '';
        if (storedEmail === '') {
            setShowConfirmDelete({
                payload: {
                    title: '溫馨提示',
                    content: '免費註冊以瀏覽全部內容，立即註冊或登入。',
                    confirmText: '註冊/登入',
                    cancelText: '取消'
                },
                onSaveCallback: () => {
                    router.push('/signin?redirect=' + window.location.href);
                },
                onCancelCallback() {}
            });
            //
        } else {
            router.push(`/calendar/${product.id}`);
        }
    };

    return (
        <>
            <div
                className="border rounded-md space-y-2 hover:shadow-lg cursor-pointer bg-white"
                onClick={handleClick}
            >
                <div className="w-full h-[250px]">
                    <img
                        src={product.image_url}
                        className="w-full h-full object-cover rounded-t-3xlmd"
                        alt=""
                    />
                </div>
                <div className="p-2">
                    <div className="flex flex-row space-x-2 justify-between ">
                        <div className="space-y-2 word-break">
                            <p
                                className="text-md font-bold"
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 2,
                                    height: '3em' // 根据行高设置最大高度
                                }}
                            >
                                {product.name}
                            </p>
                            <div className="text-sm text-orange-500 flex flex-row items-center">
                                <CalendarIcon className="w-4 mr-2" />
                                {product.from_date} - {product.to_date}
                            </div>
                            <p
                                className="text-sm text-gray-400"
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 2,
                                    height: '3em' // 根据行高设置最大高度
                                }}
                            >
                                {product.description.replace(/<[^>]*>/g, '')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row   my-1 justify-between items-center">
                        <label className="text-sm font-semibold text-orange-600">
                            {product.status}
                        </label>
                        <Typography
                            startDecorator={<RemoveRedEyeOutlinedIcon sx={{ width: 14 }} />}
                            sx={{
                                color: 'gray',
                                fontSize: 14
                            }}
                        >
                            {formatK(product?.view_count || 0)}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
}
