import {
    Audiotrack as AudiotrackIcon,
    Brush as BrushIcon,
    Chat as ChatIcon,
    Code as CodeIcon,
    DesignServices as DesignServicesIcon,
    Edit as EditIcon,
    ListAlt as ListAltIcon,
    School as SchoolIcon,
    Search as SearchIcon,
    VideoCameraFront as VideoCameraFrontIcon
} from '@mui/icons-material'; // 从 Material-UI 导入图标
import GroupsIcon from '@mui/icons-material/Groups';
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

export default function AgentList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {}, [pathname, router]);
    const meuns = [
        {
            name: 'AI 搜索引擎',
            href: '?type=AI 搜索引擎',
            icon: <SearchIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'AI 聊天问答',
            href: '?type=AI 聊天问答',
            icon: <ChatIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'Agent智能体',
            href: '?type=Agent智能体',
            icon: <GroupsIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'AI 文本写作',
            href: '?type=AI 文本写作',
            icon: <EditIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'AI 绘画作图',
            href: '?type=AI 绘画作图',
            icon: <BrushIcon sx={{ color: '#eeeeee' }} className="w-" />,
            items: []
        },
        {
            name: 'AI 设计工具',
            href: '?type=AI 设计工具',
            icon: <DesignServicesIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'AI 视频创作',
            href: '?type=AI 视频创作',
            icon: <VideoCameraFrontIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'AI 音频制作',
            href: '?type=AI 音频制作',
            icon: <AudiotrackIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'AI 办公学习',
            href: '?type=AI 办公学习',
            icon: <SchoolIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'AI 编程开发',
            href: '?type=AI 编程开发',
            icon: <CodeIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        },
        {
            name: 'Prompt指令',
            href: '?type=Prompt指令',
            icon: <ListAltIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
            items: []
        }
    ];
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
                {meuns?.map((menu, key) => (
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
