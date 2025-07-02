import { closeSidebar } from '@/utils/utils';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import { BarChart3, DollarSign, Home, Users } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [currentView, setCurrentView] = useState('dashboard');

    const handleSwitch = (name: string, href: string) => {
        setCurrentView(name);
        router.push(href);
    };

    return (
        <>
            <Sheet
                className="Sidebar"
                sx={{
                    position: { xs: 'fixed', md: 'sticky' },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                        md: 'none'
                    },
                    transition: 'transform 0.4s, width 0.4s',
                    zIndex: 9990,
                    height: '100vh',
                    width: 'var(--Sidebar-width)',
                    top: 0,
                    p: 0,
                    pt: 'calc(2px + var(--Header-height))',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    // borderRight: '1px solid',
                    // backgroundColor: '#282A2D'
                }}
            >
                <GlobalStyles
                    styles={(theme) => ({
                        ':root': {
                            '--Sidebar-width': '250px',
                            [theme.breakpoints.up('lg')]: {
                                '--Sidebar-width': '250px'
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

                <div className=" w-full  bg-white shadow-sm border-r min-h-screen">
                    <div className="p-4">
                        <div className="space-y-2">
                            <button
                                onClick={() => handleSwitch('dashboard', '/')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/dashbord'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Home className="w-5 h-5" />
                                <span>Dashboard</span>
                            </button>

                            <button
                                onClick={() => handleSwitch('communitys', '/communitys')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/communitys'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Users className="w-5 h-5" />
                                <span>My Communities</span>
                            </button>

                            <button
                                onClick={() => handleSwitch('monetization', 'monetization')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/monetization'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <DollarSign className="w-5 h-5" />
                                <span>Monetization</span>
                            </button>

                            <button
                                onClick={() => handleSwitch('analytics', '/analytics')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/analytics'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <BarChart3 className="w-5 h-5" />
                                <span>Analytics</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Sheet>
        </>
    );
}
