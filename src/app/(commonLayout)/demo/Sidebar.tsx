'use client';

import AppsIcon from '@mui/icons-material/Apps';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import { List, ListItem, ListItemButton, ListItemContent } from '@mui/joy';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
    { icon: <HomeIcon />, label: '首页', path: '/' },
    { icon: <GroupIcon />, label: '组织架构', path: '/organization' },
    { icon: <AppsIcon />, label: '工作台', path: '/workspace' },
    { icon: <SettingsIcon />, label: '会议室', path: '/settings' },
    { icon: <PaymentIcon />, label: '费用中心', path: '/billing' }
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="w-60 bg-white h-[calc(100vh-3.5rem)] border-r">
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.path}>
                        <ListItemButton
                            selected={pathname === item.path}
                            onClick={() => router.push(item.path)}
                        >
                            {item.icon}
                            <ListItemContent>{item.label}</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
