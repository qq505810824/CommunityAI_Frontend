import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const BackButton = () => {
    const router = useRouter();
    const { t } = useTranslation(); // 使用 useTranslation

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <div
                className="flex flex-row items-center text-sm text-blue-500 cursor-pointer "
                onClick={() => {
                    router.back();
                }}
            >
                <ChevronLeftIcon className="w-6 h-6" />
                {t('common.operation.back')}
            </div>
        </Box>
    );
};
export default BackButton;
