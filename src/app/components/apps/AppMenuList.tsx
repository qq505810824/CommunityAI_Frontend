import { AppMeuns } from '@/utils/constant';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

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

export default function AppMenuList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {}, [pathname, router]);

    return (
        <>
            <List
                size="sm"
                sx={{
                    gap: 1,
                    '--List-nestedInsetStart': '30px',
                    '--ListItem-radius': (theme) => theme.vars.radius.sm
                }}
            >
                {AppMeuns?.map((menu, key) => (
                    <ListItem nested key={key} sx={{}}>
                        <Toggler
                            renderToggle={({ open, setOpen }) => (
                                <ListItemButton
                                    onClick={() => {
                                        if (!menu.href) {
                                            setOpen(!open);
                                        } else {
                                            router.push('/home' + menu.href);
                                        }
                                    }}
                                    sx={{
                                        backgroundColor:
                                            `${pathname}?type=${searchParams.get('type')}` ===
                                            `/home${menu?.href}`
                                                ? '#6366f1 !important'
                                                : 'transparent', // 如果 URL 匹配，设置背景颜色
                                        '&:hover': {
                                            backgroundColor: '#6366f1 !important' // 使用 !important 确保样式生效
                                        }
                                    }}
                                >
                                    <span className="icon mr-2">{menu?.icon}</span>
                                    <ListItemContent>
                                        <Typography
                                            className="text"
                                            level="title-sm"
                                            sx={{ color: '#eeeeee' }}
                                        >
                                            {menu?.name}
                                        </Typography>
                                    </ListItemContent>
                                    {menu?.items && menu?.items.length > 0 && (
                                        <KeyboardArrowDownIcon
                                            sx={{
                                                transform: open ? 'rotate(180deg)' : 'none',
                                                color: '#eeeeee',
                                                '&:hover': {
                                                    color: '#eeeeee !important',
                                                    backgroundColor: '#6366f1 !important' // 使用 !important 确保样式生效
                                                }
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            )}
                        >
                            <List sx={{ gap: 0.5 }}>
                                {menu?.items?.map((sub_menu: any, index) => (
                                    <ListItem sx={{ mt: 0.5 }} key={index}>
                                        <ListItemButton
                                            role="menuitem"
                                            component="a"
                                            sx={{
                                                color: '#eeeeee',
                                                '&:hover': {
                                                    color: '#eeeeee !important',
                                                    backgroundColor: '#6366f1 !important' // 使用 !important 确保样式生效
                                                }
                                            }}
                                            onClick={() => {
                                                router.push(
                                                    sub_menu?.href + '?type=' + sub_menu.name
                                                );
                                            }}
                                        >
                                            {sub_menu?.name}
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Toggler>
                    </ListItem>
                ))}
            </List>
        </>
    );
}
