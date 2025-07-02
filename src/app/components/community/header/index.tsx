import { Bell, ChevronDown, Home, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function HeaderView() {
    const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
    const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');

    const userCommunities = [
        {
            id: 1,
            name: 'Digital Marketing Pros',
            logo: '🚀',
            members: 1250,
            unreadPosts: 5,
            theme: 'blue',
            tier: 'premium',
            revenue: 2340,
            channels: 8,
            courses: 12,
            events: 3
        },
        {
            id: 2,
            name: 'Creative Designers Hub',
            logo: '🎨',
            members: 890,
            unreadPosts: 12,
            theme: 'purple',
            tier: 'basic',
            revenue: 890,
            channels: 5,
            courses: 8,
            events: 2
        },
        {
            id: 3,
            name: 'Fitness & Wellness',
            logo: '💪',
            members: 2100,
            unreadPosts: 3,
            theme: 'green',
            tier: 'premium',
            revenue: 4200,
            channels: 6,
            courses: 15,
            events: 5
        }
    ];

    const NavBar = () => (
        <nav className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-800">CommunityAI</h1>
                    <div className="relative">
                        <button
                            onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <span>
                                {selectedCommunity ? selectedCommunity.name : 'All Communities'}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {showCommunityDropdown && (
                            <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg border min-w-64 z-50">
                                <button
                                    onClick={() => {
                                        setSelectedCommunity(null);
                                        setCurrentView('dashboard');
                                        setShowCommunityDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <Home className="w-4 h-4" />
                                        </div>
                                        <span>All Communities</span>
                                    </div>
                                </button>
                                {userCommunities.map((community) => (
                                    <button
                                        key={community.id}
                                        onClick={() => {
                                            setSelectedCommunity(community);
                                            setCurrentView('community');
                                            setShowCommunityDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`w-8 h-8 bg-${community.theme}-100 rounded-full flex items-center justify-center`}
                                            >
                                                <span>{community.logo}</span>
                                            </div>
                                            <div>
                                                <div className="font-medium">{community.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {community.members} members
                                                </div>
                                            </div>
                                            {community.unreadPosts > 0 && (
                                                <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                    {community.unreadPosts}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search communities..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button className="relative p-2 text-gray-600 hover:text-gray-800">
                        <Bell className="w-5 h-5" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );

    return (
        <>
            <NavBar />
        </>
    );
}
