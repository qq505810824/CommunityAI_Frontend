'use client';

import I18n from '@/context/i18n';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsEthernetOutlinedIcon from '@mui/icons-material/SettingsEthernetOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import { Tooltip } from '@mui/joy';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'use-context-selector';
import { closeSidebar } from '../../../utils/utils';
import AgentList from '../store/agent/AgentList';
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

    const meuns = [
        {
            name: '主页',
            href: '/home',
            folder: 'home',
            icon: <HomeOutlinedIcon className="w-10" sx={{ fontSize: 22 }} />
        },
        {
            name: '工作空间',
            href: "/space/7372809542008176675/develop",
            folder: 'place',
            icon: <SettingsEthernetOutlinedIcon className="w-10" sx={{ fontSize: 22 }} />
        },
        {
            name: '商店',
            href: '/store/agent',
            folder: 'store',
            icon: <StorefrontOutlinedIcon className="w-10" sx={{ fontSize: 22 }} />
        },
        {
            name: '模版',
            href: '/template',
            folder: 'template',
            icon: <ViewQuiltOutlinedIcon className="w-10" sx={{ fontSize: 22 }} />
        }
    ];
    useEffect(() => {
        setEmail(localStorage.getItem('email') || '');
    }, []);

    return (
        <Sheet
            className="Sidebar"
            sx={{
                // position: { xs: 'fixed', md: 'sticky' },
                // transform: {
                //     xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                //     md: 'none'
                // },
                // transition: 'transform 0.4s, width 0.4s',
                zIndex: 10,
                // height: '100vh',
                // width: 'var(--Sidebar-width)',
                height: '100%',
                width: 'auto',
                overflowY: 'auto',
                // textAlign: 'center',
                top: 0,
                // p: 1,
                // m: 1,
                border: 1,
                borderRadius: 10,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'row',
                // alignItems: 'center',
                gap: 0,
                borderRight: '1px solid',
                borderColor: 'divider',
                bgcolor: 'white'
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px'
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
            <div className=" flex  flex-col border-r  items-center px-2 py-4">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="https://p6-flow-product-sign.byteimg.com/tos-cn-i-13w3uml6bg/78f519713ce46901120fb7695f257c9a.png~tplv-13w3uml6bg-resize:128:128.image?rk3s=2e2596fd&x-expires=1743129998&x-signature=RU4OS%2FAxgh9l4SNnH7ak0EIGhnQ%3D"
                        className="w-[40px] rounded-md"
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                    <IconButton size="sm">
                        <PlusCircleIcon className="w-[25px]" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        minHeight: 0,
                        overflow: 'hidden auto',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${listItemButtonClasses.root}`]: {
                            gap: 1.5
                        }
                    }}
                >
                    <List
                        size="sm"
                        sx={{
                            gap: 1,
                            '--List-nestedInsetStart': '30px',
                            '--ListItem-radius': (theme) => theme.vars.radius.sm
                        }}
                    >
                        {meuns.map((menu, index) => (
                            <ListItem key={index}>
                                <ListItemButton
                                    selected={pathname.indexOf(menu.folder) != -1}
                                    component="a"
                                    href={menu.href}
                                >
                                    <ListItemContent
                                        sx={{
                                            textAlign: 'center'
                                        }}
                                    >
                                        {menu?.icon}
                                        <Typography level="title-sm" fontSize={10}>
                                            {menu.name}
                                        </Typography>
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <div className="flex flex-col justify-end space-y-2">
                    <Tooltip title="文档" placement="right-end">
                        <IconButton size="sm">
                            <DescriptionOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="1条未读消息" placement="right-end">
                        <IconButton size="sm">
                            <NotificationsNoneOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="购买" placement="right-end">
                        <IconButton size="sm">
                            <ArrowCircleUpOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <IconButton size="md">
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <AgentList />
        </Sheet>
    );
}
