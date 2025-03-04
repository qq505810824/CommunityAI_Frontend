import Button from '@/app/components/base/button';
import IconButton from '@mui/joy/IconButton';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LogoutButton() {
    const router = useRouter();
    const { t } = useTranslation(); // 使用 useTranslation

    const handleLogout = () => {
        localStorage.removeItem('authorization');
        localStorage.removeItem('email');
        document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        router.push('/signin');
    };

    return (
        <>
            <IconButton size="sm" variant="plain" color="neutral" onClick={handleLogout}>
                <Button type="warning">{t('common.button.logout')}</Button> {/* 使用翻譯 */}
            </IconButton>
        </>
    );
}
