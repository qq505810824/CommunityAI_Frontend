import { useAppContext } from '@/context/app-context';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Box, Divider, Dropdown, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toggleSidebar } from '../../../utils/utils';

export default function HeaderView() {
    const { userProfile } = useAppContext();
    const supabase = createClientComponentClient();
    useEffect(() => { }, []);
    const router = useRouter();

    const logout = async () => {
        localStorage.setItem('account', '');
        localStorage?.setItem('user_id', '');
        const res = await supabase.auth.signOut();
        router.push(`/login?redirect=${window.location.href}`);
    };

    function AvatarMenu(props?: any) {
        const router = useRouter();
        return (
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                >
                    <img
                        alt="avatar"
                        src={userProfile?.avatar || '/avatar.webp'}
                        className={`rounded-full w-8 h-8 mr-1`}
                    />
                </MenuButton>
                <Menu size="sm" sx={{ minWidth: 140 }}>
                    <MenuItem
                        onClick={() => {
                            if (userProfile.id == '') {
                                router.push('/login?url=prompts');
                            } else {
                                router.push(`/profile`);
                            }
                        }}
                    >
                        <PermIdentityIcon />
                        Profile
                    </MenuItem>
                    {userProfile.id != '' && (
                        <>
                            <Divider />
                            <MenuItem
                                color="danger"
                                onClick={() => {
                                    if (userProfile.id == '') {
                                        router.push('/login?url=prompts');
                                    } else {
                                        logout();
                                    }
                                }}
                            >
                                <LogoutIcon />
                                Logout
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </Dropdown>
        );
    }

    return (
        <>
            <Sheet
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    top: 0,
                    width: '100vw',
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
                        }
                    })}
                />
                <div className="w-full sm:max-w-7xl flex justify-between ">
                    <div className="flex flex-row items-center gap-2">
                        <img alt="" src="/logo/logo_p.png" className="w-12 h-8" />
                        <Typography level={'h4'}>Prompt 知识库</Typography>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        {AvatarMenu()}
                        <Box
                            sx={{
                                display: { xs: 'none', sm: 'none' }
                            }}
                        >
                            <IconButton
                                onClick={() => toggleSidebar()}
                                variant="outlined"
                                color="neutral"
                                size="sm"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </div>
                </div>
            </Sheet>
        </>
    );
}
