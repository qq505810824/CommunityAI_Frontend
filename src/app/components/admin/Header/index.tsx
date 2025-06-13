import { useAppContext } from '@/context/app-context';
import { toggleSidebar } from '@/utils/utils';
import MenuIcon from '@mui/icons-material/Menu';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MenuButton from './MenuButton';

export default function Header() {
    const router = useRouter();
    const { userProfile } = useAppContext();
    const supabase = createClientComponentClient();
    const logout = async () => {
        localStorage.setItem('account', '');
        localStorage?.setItem('user_id', '');
        localStorage?.setItem('admin_authorization', '');
        const res = await supabase.auth.signOut();
        router.push(`/admin/login?redirect=${window.location.href}`);
    };

    return (
        <Sheet
            sx={{
                display: { xs: 'flex', md: 'flex' },
                alignItems: 'center',
                justifyContent: { xs: 'space-between', md: 'flex-end' },
                // position: 'fixed',
                // top: 0,
                // width: '100vw',
                height: 'var(--Header-height)',
                zIndex: 9995,
                p: 2,
                gap: 1,
                borderBottom: '1px solid',
                borderColor: 'background.level1',
                boxShadow: 'sm'
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Header-height': '52px'
                        // [theme.breakpoints.up('md')]: {
                        //     '--Header-height': '0px'
                        // }
                    }
                })}
            />
            <IconButton
                onClick={() => toggleSidebar()}
                variant="outlined"
                color="neutral"
                size="sm"
                sx={{
                    display: { xs: 'flex', md: 'none' }
                }}
            >
                <MenuIcon />
            </IconButton>
            <div className="flex   items-center">
                {userProfile?.id != '' ? (
                    <div className="flex justify-end items-center col-span-3 md:col-span-4">
                        <MenuButton email={userProfile?.email} logout={logout} />
                    </div>
                ) : (
                    <div className="flex flex-row gap-8 items-center justify-end col-span-3">
                        <Link
                            href={`/admin/login?redirect=${window.location.href}`}
                            className="text-purple-900 hover:underline"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </Sheet>
    );
}
