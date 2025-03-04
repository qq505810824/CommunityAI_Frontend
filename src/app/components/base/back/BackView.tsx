'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../button';

interface ViewProps {
    title?: string;
    onClick?: any;

    loading?: boolean;
    rightButtonText?: string;
    rightButtonClick?: any;
}

const useScreenOrientation = () => {
    const [orientation, setOrientation] = useState('portrait');

    useEffect(() => {
        const handleOrientationChange = () => {
            const isPortrait = window.matchMedia('(orientation: portrait)').matches;
            setOrientation(isPortrait ? 'portrait' : 'landscape');
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        handleOrientationChange(); // 初次檢查

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    return orientation;
};

export default function BackView(props: ViewProps) {
    const { t } = useTranslation(); // 使用 useTranslation
    const { title, onClick, rightButtonText, rightButtonClick, loading } = props;
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };
    const orientation = useScreenOrientation();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1,
                    justifyContent: 'space-between'
                }}
            >
                <div
                    className="flex flex-row cursor-pointer text-blue-500 hover:text-bleu-700"
                    onClick={onClick ? onClick : handleBack}
                >
                    <ChevronLeftIcon className="w-4" />
                    <span className="ml-2">{title || t('common.operation.back')}</span>
                </div>
                {rightButtonClick && (
                    <Button
                        onClick={rightButtonClick}
                        loading={loading}
                        type="primary"
                        className="h-8"
                    >
                        {rightButtonText || 'Save'}
                    </Button>
                    // <button
                    //     onClick={rightButtonClick}
                    //     className=" bg-blue-500 text-white sm:px-2 sm:py-1 px-4 py-1  rounded hover:bg-blue-700 transition"
                    // >
                    //     {rightButtonText || 'Save'}
                    // </button>
                )}
            </Box>
        </>
    );
}
