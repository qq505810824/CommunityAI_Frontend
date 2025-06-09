import { useModalContext } from '@/context/modal-context';
import { useAccountOperations } from '@/hooks/useAccountData';
import { CalendarModel } from '@/hooks/useCalendarData';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { IconButton, Tooltip } from '@mui/joy';
import { Share2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ViewProps {
    product?: CalendarModel;
}

export default function OperationView(props: ViewProps) {
    const { product } = props;
    const router = useRouter();
    const [collect, setCollect] = useState(product?.is_collected || false);
    const [focus, setFocus] = useState(false);
    const isLogin = localStorage?.getItem('email') || '';
    const { collectCalendarById } = useAccountOperations();
    const { setShowShareQRcode } = useModalContext();

    useEffect(() => {
        setCollect(product?.is_collected || false);
    }, [product?.is_collected]);

    const handleCollect = async () => {
        if (!isLogin) {
            router.push(`/signin?redirect=${window.location.href}`);
            return;
        }
        setCollect(!collect);
        const userId = localStorage?.getItem('user_id');
        if (!userId || !product?.id) return;

        const res = await collectCalendarById(product.id, userId);
        // if (res.success) {
        //     setCollect(res.action === 'collect');
        // }
    };

    const handleClickShare = () => {
        setShowShareQRcode({
            payload: {
                link: `https://hkcalendar.vercel.app/share/calendars/${product?.id}`,
                name: product?.name
            }
        });
    };

    return (
        <>
            <div className="flex   flex-row items-center justify-end  space-x-2">
                <Tooltip title={'收藏'} placement="top">
                    <IconButton onClick={handleCollect}>
                        {collect && <StarIcon sx={{ width: '20px', color: 'red' }} />}
                        {!collect && <StarBorderOutlinedIcon sx={{ width: '20px' }} />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'分享'} placement="top">
                    <IconButton onClick={handleClickShare}>
                        <Share2Icon
                            className=" text-[#f97316] text-md hover:text-orange-600 cursor-pointer w-[20px]"
                            onClick={handleClickShare}
                        />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    );
}
