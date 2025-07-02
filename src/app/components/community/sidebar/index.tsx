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
            <div className=" w-72 bg-white shadow-sm border-r min-h-screen">
                <div className="p-6">
                    <div className="space-y-2">
                        <button
                            onClick={() => handleSwitch('dashboard', '/')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                pathname === '/dashbord'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <Home className="w-5 h-5" />
                            <span>Dashboard</span>
                        </button>

                        <button
                            onClick={() => handleSwitch('communitys', '/communitys')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                pathname === '/communitys'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <Users className="w-5 h-5" />
                            <span>My Communities</span>
                        </button>

                        <button
                            onClick={() => handleSwitch('monetization', 'monetization')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                pathname === '/monetization'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <DollarSign className="w-5 h-5" />
                            <span>Monetization</span>
                        </button>

                        <button
                            onClick={() => handleSwitch('analytics', '/analytics')}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                pathname === '/analytics'
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
        </>
    );
}
