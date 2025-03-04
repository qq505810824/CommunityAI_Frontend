'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, Button, Typography } from '@mui/joy';
import BackButton from '../../base/back';

const DetailView = () => {
    return (
        <>
            <BackButton />
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}
            >
                <Typography level="h2" component="h1">
                    Home
                </Typography>
                <Button
                    type="primary"
                    className={' px-4 py-1 text-sm'}
                    onClick={() => {
                        // router.push(`/home/create`)
                        // handleAddModel()
                        // setVisible(true)
                    }}
                >
                    <PlusIcon className="w-4" /> Add
                </Button>
            </Box>
            <label>detail</label>
        </>
    );
};

export default DetailView;
