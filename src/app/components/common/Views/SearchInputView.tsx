import useAlert from '@/hooks/useAlert';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, IconButton, Input } from '@mui/joy';
import { useRef, useState } from 'react';
interface ViewProps {
    handleSearch: any;
    loading?: boolean;
    className?: any;
    sx?: any
    placeholder?: string;
}

export default function SearchInputView(props: ViewProps) {
    const { handleSearch, loading, className, sx, placeholder } = props;
    const { setAlert } = useAlert();
    const [content, setContent] = useState('');
    const textInputRef = useRef<HTMLInputElement>(null);

    const verify = () => {
        if (textInputRef.current == null) return;
        const text = textInputRef.current.value;
        // if (content.trim() == '') {
        //     setAlert({ title: '提示', content: '請輸入內容' });
        //     return;
        // } else {
        //     handleSearch(content);
        // }
        handleSearch(content);
    };
    const onKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            verify();
        }
    };

    return (
        <>
            {/* <Sheet
                // className="SearchAndFilters-mobile"
                sx={{
                    backgroundColor: 'transparent',
                    display: { xs: 'flex', sm: 'flex' }
                }}
            > */}
            <Input
                ref={textInputRef}
                size="md"
                placeholder={placeholder || "Search"}
                type={'search'}
                className={className}
                startDecorator={<SearchIcon />}
                endDecorator={loading && <CircularProgress size="sm" />}
                sx={{ flexGrow: 1, ...sx }}
                onKeyUp={onKeyUp}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
            <IconButton
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => {
                    verify();
                }}
                sx={{
                    display: { xs: 'none', sm: 'none' }
                }}
            >
                <SearchIcon />
            </IconButton>
            {/* </Sheet> */}
        </>
    );
}
