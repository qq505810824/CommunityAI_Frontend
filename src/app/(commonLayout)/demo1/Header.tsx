"use client"

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Header = () => {
    const router = useRouter()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && 'key' in event && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const menuItems = [
        { label: '产品与服务', href: '/demo1/products' },
        { label: '关于我们', href: '/demo1/about' },
        { label: '案例展示', href: '/demo1/cases' },
        { label: '新闻与博客', href: '/demo1/news' },
        { label: '联系我们', href: '/demo1/contact' },
    ];

    // 假设 AppBar 的高度为 64px，可根据实际情况调整
    const appBarHeight = '64px';

    return (
        <AppBar position="fixed" className="bg-white shadow-md" style={{ height: appBarHeight }}>
            <Toolbar>
                <Typography variant="h6" className="flex-grow">
                    科技公司
                </Typography>
                <div className="hidden md:block">
                    {menuItems.map((item) => (
                        <Button key={item.label} color="inherit"
                            onClick={() => router.push(item.href)}>
                            {item.label}
                        </Button>
                    ))}
                </div>
                <div className="md:hidden">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(!isDrawerOpen)}
                    >
                        {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </div>
            </Toolbar>
            {/* 修改这里，将 marginTop 设置为 appBarHeight */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)} PaperProps={{ style: { marginTop: appBarHeight } }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.label} onClick={() => { router.push(item.href); toggleDrawer(false) }}>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Header;