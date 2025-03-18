import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { IconButton, Tooltip } from '@mui/joy';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

interface ViewProps {
    content?: string
}

export default function CopyButton(props: ViewProps) {
    const { content } = props;

    const [copySuccess, setCopySuccess] = useState(false);


    const handleCopy = (e: any) => {
        e.stopPropagation();
        copy(content || '');
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 1000); // 2 秒后隐藏提示
    };

    return (
        <>

            <Tooltip
                title={copySuccess ? '复制成功' : '复制'}
                placement="top"
            >
                <IconButton onClick={handleCopy}>
                    <ContentCopyOutlinedIcon sx={{ width: '18px' }} />
                </IconButton>
            </Tooltip>
        </>
    );
}
