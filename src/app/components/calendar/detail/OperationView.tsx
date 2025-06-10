import { useAppContext } from '@/context/app-context';
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
    const { collectCalendarById } = useAccountOperations();
    const { setShowShareQRcode } = useModalContext();
    const { user_id, userProfile } = useAppContext();

    useEffect(() => {
        if (product) setCollect(product?.is_collected || false);
    }, [product]);

    const showCollectView = () => {
        return user_id !== '';
    };

    const handleCollect = async () => {
        if (!userProfile?.id) {
            router.push(`/signin?redirect=${window.location.href}`);
            return;
        }
        setCollect(!collect);
        if (!userProfile?.id || !product?.id) return;

        const res = await collectCalendarById(product.id, userProfile?.id);
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
                {showCollectView() && (
                    <Tooltip title={!collect ? '收藏' : '取消收藏'} placement="top">
                        <IconButton onClick={handleCollect}>
                            {collect && <StarIcon sx={{ width: '20px', color: 'red' }} />}
                            {!collect && <StarBorderOutlinedIcon sx={{ width: '20px' }} />}
                        </IconButton>
                    </Tooltip>
                )}
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
