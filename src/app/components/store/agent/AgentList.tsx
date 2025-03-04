import {
    BuildingStorefrontIcon,
    CubeIcon,
    WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import React from 'react';

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
    const meuns = [
        {
            name: '项目商店',
            icon: <BuildingStorefrontIcon className="w-4" />,
            items: [
                {
                    name: '最新',
                    href: '/store/agent'
                },
                {
                    name: '效率工具',
                    href: '/store/agent'
                },
                {
                    name: '商业服务',
                    href: '/store/agent'
                },
                {
                    name: '文本创作',
                    href: '/store/agent'
                },
                {
                    name: '学习教育',
                    href: '/store/agent'
                },
                {
                    name: '代码助手',
                    href: '/store/agent'
                },
                {
                    name: '生活方式',
                    href: '/store/agent'
                },
                {
                    name: '游戏',
                    href: '/store/agent'
                },
                {
                    name: '图像与音视频',
                    href: '/store/agent'
                },
                {
                    name: '角色',
                    href: '/store/agent'
                }
            ]
        },
        {
            name: '插件商店',
            icon: <CubeIcon className="w-4" />,
            items: [
                {
                    name: '新闻阅读',
                    href: '/store/plugin'
                },
                {
                    name: '图像',
                    href: '/store/plugin'
                },
                {
                    name: '实用工具',
                    href: '/store/plugin'
                },
                {
                    name: '便利生活',
                    href: '/store/plugin'
                },
                {
                    name: '网页搜索',
                    href: '/store/plugin'
                },
                {
                    name: '科学与教育',
                    href: '/store/plugin'
                },
                {
                    name: '社交',
                    href: '/store/plugin'
                },
                {
                    name: '游戏与娱乐',
                    href: '/store/plugin'
                }
            ]
        },
        {
            name: '模型广场',
            href: '/store/model',
            icon: <WrenchScrewdriverIcon className="w-4" />
        }
    ];
    return (
        <>
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    // flexGrow: 1,
                    py: 1,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'white'
                    // [`& .${listItemButtonClasses.root}`]: {
                    //     gap: 1.5
                    // }
                }}
            >
                <List
                    size="sm"
                    sx={{
                        // gap: 1,
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
                                                window.location.href = menu.href;
                                            }
                                        }}
                                    >
                                        {menu?.icon}
                                        <ListItemContent>
                                            <Typography level="title-sm">{menu?.name}</Typography>
                                        </ListItemContent>
                                        {menu?.items && menu?.items.length > 0 && (
                                            <KeyboardArrowDownIcon
                                                sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                                            />
                                        )}
                                    </ListItemButton>
                                )}
                            >
                                <List sx={{ gap: 0.5 }}>
                                    {menu?.items?.map((sub_menu, index) => (
                                        <ListItem sx={{ mt: 0.5 }} key={index}>
                                            <ListItemButton
                                                role="menuitem"
                                                component="a"
                                                href={sub_menu?.href + '?type=' + sub_menu.name}
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
            </Box>
        </>
    );
}
