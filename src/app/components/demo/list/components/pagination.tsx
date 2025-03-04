'use client';

import PaginationView from '@/app/components/common/Widget/PaginationView';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import { iconButtonClasses } from '@mui/joy/IconButton';

const PaginationMain = () => {
    return (
        <>
            <PaginationView meta={undefined} params={undefined} pathname={undefined} />
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                >
                    <label>Next</label>
                </Button>
            </Box>
        </>
    );
};
export default PaginationMain;
