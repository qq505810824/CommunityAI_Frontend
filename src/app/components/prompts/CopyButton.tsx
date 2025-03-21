import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { IconButton, Tooltip } from '@mui/joy';
import copy from 'copy-to-clipboard';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface ViewProps {
    content?: string;
    callback?: () => void;
}

export default function CopyButton(props: ViewProps) {
    const { content, callback } = props;

    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = (e: any) => {
        e.stopPropagation();
        copy(content || '');
        setCopySuccess(true);
        callback && callback();
        setTimeout(() => {
            setCopySuccess(false);
        }, 1500); // 2 秒后隐藏提示
    };

    return (
        <>
            <Tooltip title={copySuccess ? '复制成功' : '复制'} placement="top">
                <IconButton
                    onClick={handleCopy}
                    disabled={copySuccess}>

                    {copySuccess ? <Check className="stroke-emerald-500" size={16} strokeWidth={2} aria-hidden="true" /> :
                        <ContentCopyOutlinedIcon sx={{ width: '18px' }} />}
                </IconButton>
            </Tooltip>
        </>
    );
}
