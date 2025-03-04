'use client';

import { useAppDetailContext } from '@/app/(commonLayout)/demo/[id]/detail-context';
import { useModalContext } from '@/context/modal-context';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import BackButton from '../base/back';
import Button from '../base/button';
import { useDemoContext } from './context';
import TableView from './list/table';

interface ViewProps {
    data?: any;
}

const DemoView = ({}: ViewProps) => {
    const router = useRouter();
    const { appData, handleAddModel } = useDemoContext();
    const { appData: pp } = useAppDetailContext();
    const { setInputNameModal } = useModalContext();
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
                    Home{pp}-{appData?.name}
                </Typography>
                <Button
                    type="primary"
                    className={' px-4 py-1 text-sm'}
                    onClick={() => {
                        // router.push(`/home/create`)
                        // handleAddModel()
                        // setVisible(true)
                        setInputNameModal({
                            payload: {
                                name: 'name o'
                            },
                            onSaveCallback(newPayload) {
                                console.log('newPayload', newPayload);
                            }
                        });
                    }}
                >
                    <PlusIcon className="w-4" /> Add
                </Button>
            </Box>
            <TableView />
            {/* <OrderTable rows={datas} handleDeleteSchema={handleDeleteSchema} />
                        <OrderList rows={datas} handleDeleteSchema={handleDeleteSchema} /> */}
        </>
    );
};

export default DemoView;
