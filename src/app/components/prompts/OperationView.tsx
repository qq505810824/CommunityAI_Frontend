import { PromptModel } from '@/hooks/usePromptData';
import { FavoriteSharp } from '@mui/icons-material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { IconButton, Tooltip } from '@mui/joy';
import { useState } from 'react';
import CopyButton from './CopyButton';

interface ViewProps {
    prompt?: PromptModel;
}

export default function OperationView(props: ViewProps) {
    const { prompt } = props;

    const [collect, setCollect] = useState(false);
    const [focus, setFocus] = useState(false);
    const isLogin = localStorage?.getItem('user_id') || '';

    const handleCollect = () => {
        setCollect(!collect);
        console.log('isLogin', isLogin);
    };

    const handleFocus = () => {
        setFocus(!focus);
    };

    const handleShare = () => {};

    return (
        <>
            <div className="flex flex-row items-center justify-end gap-2">
                <Tooltip title={'点赞'} placement="top">
                    <IconButton onClick={handleFocus}>
                        {focus && <FavoriteSharp sx={{ width: '18px', color: 'red' }} />}
                        {!focus && <FavoriteBorderOutlinedIcon sx={{ width: '18px' }} />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={'收藏'} placement="top">
                    <IconButton onClick={handleCollect}>
                        {collect && <StarIcon sx={{ width: '18px', color: 'red' }} />}
                        {!collect && <StarBorderOutlinedIcon sx={{ width: '18px' }} />}
                    </IconButton>
                </Tooltip>
                <CopyButton content={prompt?.prompt} />
                <Tooltip title={'分享'} placement="top">
                    <IconButton>
                        <ShareOutlinedIcon sx={{ width: '18px' }} />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    );
}
