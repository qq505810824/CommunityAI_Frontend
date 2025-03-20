import { useAccontOperations } from '@/hooks/useAccountData';
import { PromptModel, usePromptOperations } from '@/hooks/usePromptData';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton, Tooltip } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CopyButton from './CopyButton';

interface ViewProps {
    prompt?: PromptModel;
}

export default function OperationView(props: ViewProps) {
    const { prompt } = props;
    const router = useRouter();
    const [collect, setCollect] = useState(prompt?.is_collected || false);
    const [focus, setFocus] = useState(false);
    const isLogin = localStorage?.getItem('user_id') || '';
    const { updatePrompt } = usePromptOperations();
    const { collectPromptById } = useAccontOperations();

    useEffect(() => {
        // 当 prompt 数据更新时，更新收藏状态
        // console.log(prompt);

        setCollect(prompt?.is_collected || false);
    }, [prompt?.is_collected]);

    const handleCollect = async () => {
        if (!isLogin) {
            router.push(`/login?redirect=${window.location.href}`);
            return;
        }
        setCollect(!collect);
        const userId = localStorage?.getItem('user_id');
        if (!userId || !prompt?.id) return;

        const res = await collectPromptById(prompt.id, userId);
        // if (res.success) {
        //     setCollect(res.action === 'collect');
        // }
    };

    const handleFocus = async () => {
        setFocus(!focus);
        if (prompt?.id) {
            const res = await updatePrompt(prompt?.id, {
                focus: !focus ? 1 : 0
            });
            console.log('res', res);
        }
    };

    const handleCopy = async () => {
        console.log('copy');
        if (prompt?.id) {
            const res = await updatePrompt(prompt?.id, {
                copy: 1
            });
            console.log('res', res);
        }
    };

    const handleShare = () => { };

    return (
        <>
            <div className="flex flex-row items-center justify-end gap-2">
                <Tooltip title={'点赞'} placement="top">
                    <IconButton onClick={handleFocus}>
                        {focus && <ThumbUpAltIcon sx={{ width: '18px', color: 'red' }} />}
                        {!focus && <ThumbUpOffAltIcon sx={{ width: '18px' }} />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'收藏'} placement="top">
                    <IconButton onClick={handleCollect}>
                        {collect && <StarIcon sx={{ width: '18px', color: 'red' }} />}
                        {!collect && <StarBorderOutlinedIcon sx={{ width: '18px' }} />}
                    </IconButton>
                </Tooltip>
                <CopyButton content={prompt?.prompt} callback={handleCopy} />
                <Tooltip title={'分享'} placement="top">
                    <IconButton onClick={handleShare}>
                        <ShareOutlinedIcon sx={{ width: '18px' }} />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    );
}
