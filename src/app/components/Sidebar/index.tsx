'use client';

import I18n from '@/context/i18n';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import { List, ListItemButton, ListItemContent, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'use-context-selector';
import { closeSidebar } from '../../../utils/utils';
import AppMenuList from '../apps/AppMenuList';

function Toggler({
    defaultExpanded = false,
    renderToggle,
    children
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: '0.2s ease',
                    '& > *': {
                        overflow: 'hidden'
                    }
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar() {
    const pathname = usePathname();
    const [email, setEmail] = React.useState<string>('');
    const { t } = useTranslation(); // 添加這行
    const { locale, setLocaleOnClient } = useContext(I18n);
    const router = useRouter();

    useEffect(() => {
        setEmail(localStorage.getItem('email') || '');
    }, []);

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none'
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 100,
                height: '100vh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                pt: 'calc(12px + var(--Header-height))',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                // borderRight: '1px solid',
                backgroundColor: '#282A2D'
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '200px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '200px'
                        }
                    }
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)'
                    }
                }}
                onClick={() => closeSidebar()}
            />
            <div className='flex flex-col h-full'>
                <div
                    className=" flex flex-row items-center space-x-2 cursor-pointer"
                    onClick={() => {
                        router.push('/home');
                    }}
                >
                    <IconButton variant="soft" color="primary" size="sm">
                        <BrightnessAutoRoundedIcon />
                    </IconButton>
                    <Typography
                        level="title-lg"
                        sx={{
                            background: 'linear-gradient(90deg, #ff007a, #ffb600)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: 24
                        }}
                    >
                        {'AI 工具导航'}
                    </Typography>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <AppMenuList />
                </div>
                <div
                    className=" flex flex-0  flex-row items-center space-x-2 cursor-pointer"
                >
                    <List
                        size="sm"
                        sx={{
                            gap: 1,
                            '--List-nestedInsetStart': '30px',
                            '--ListItem-radius': (theme) => theme.vars.radius.sm
                        }}>
                        <ListItemButton
                            onClick={() => {
                                router.push('/apps/submit')
                            }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#6366f1 !important' // 使用 !important 确保样式生效
                                }
                            }}
                        >
                            <PlusCircleIcon className='w-6 text-[#eeeeee]' />
                            <ListItemContent>
                                <Typography
                                    className="text"
                                    level="title-sm"
                                    sx={{ color: '#eeeeee' }}
                                >
                                    {'提交 AI 工具'}
                                </Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </List>
                </div>
            </div>
        </Sheet>
    );
}
