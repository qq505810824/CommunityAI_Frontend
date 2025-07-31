import { BookOpen, Calendar as CalendarIcon, Crown, DollarSign, Heart } from 'lucide-react';
import { useState } from 'react';

export default function MonetizationView() {
    const [currentView, setCurrentView] = useState('dashboard');
    const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
    const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
    const [forumView, setForumView] = useState('categories');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedThread, setSelectedThread] = useState<any>(null);
    const [selectedChannel, setSelectedChannel] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('discussions');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [createType, setCreateType] = useState('');

    // Form states
    const [newChannelName, setNewChannelName] = useState('');
    const [newChannelDescription, setNewChannelDescription] = useState('');
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newEventTitle, setNewEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

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

    const newsfeedData = [
        {
            id: 1,
            community: 'Digital Marketing Pros',
            type: 'channel-post',
            channel: 'announcements',
            author: 'Sarah Chen',
            content:
                '🎉 New advanced SEO course launching next week! Premium members get early access.',
            timestamp: '2 hours ago',
            likes: 24,
            isAIGenerated: false
        },
        {
            id: 2,
            community: 'Creative Designers Hub',
            type: 'course-update',
            course: 'Design Fundamentals',
            content: "New module added: 'Color Theory in Modern Design' - 5 new lessons available",
            timestamp: '4 hours ago',
            isAIGenerated: false
        },
        {
            id: 3,
            community: 'Fitness & Wellness',
            type: 'event-reminder',
            event: 'Morning Yoga Session',
            content: "Reminder: Your registered event 'Morning Yoga Session' starts in 2 hours!",
            timestamp: '6 hours ago',
            isAIGenerated: false
        },
        {
            id: 4,
            community: 'Digital Marketing Pros',
            type: 'ai-summary',
            content:
                "AI Summary: This week's highlights include 3 new channel posts, 2 course updates, and upcoming SEO masterclass with 67 registrations.",
            timestamp: '1 day ago',
            isAIGenerated: true
        }
    ];

    return (
        <>
            <div className="flex-1 p-6 ">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Monetization Dashboard
                        </h2>
                        <p className="text-gray-600">Manage your revenue streams and pricing</p>
                    </div>

                    {/* Enhanced Revenue Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-700">Total Revenue</h3>
                                <DollarSign className="w-5 h-5 text-green-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-800">$7,430</p>
                            <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-700">Subscriptions</h3>
                                <Crown className="w-5 h-5 text-purple-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-800">342</p>
                            <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-700">Course Sales</h3>
                                <BookOpen className="w-5 h-5 text-blue-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-800">89</p>
                            <p className="text-sm text-green-600 mt-1">+15% from last month</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-700">Event Revenue</h3>
                                <CalendarIcon className="w-5 h-5 text-red-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-800">$1,240</p>
                            <p className="text-sm text-green-600 mt-1">+22% from last month</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-700">Channel Tips</h3>
                                <Heart className="w-5 h-5 text-pink-500" />
                            </div>
                            <p className="text-3xl font-bold text-gray-800">$380</p>
                            <p className="text-sm text-green-600 mt-1">+5% from last month</p>
                        </div>
                    </div>

                    {/* Enhanced Monetization Tools */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-xl font-semibold mb-6">Subscription Tiers</h3>
                            <div className="space-y-4">
                                <div className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">Basic Tier</h4>
                                        <span className="text-lg font-bold">$9.99/mo</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Access to basic content, public channels, and free events
                                    </p>
                                    <div className="flex justify-between text-sm">
                                        <span>156 subscribers</span>
                                        <button className="text-blue-500 hover:underline">
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4 border-purple-200 bg-purple-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">Premium Tier</h4>
                                        <span className="text-lg font-bold">$29.99/mo</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        All basic features plus premium courses, private channels,
                                        and exclusive events
                                    </p>
                                    <div className="flex justify-between text-sm">
                                        <span>186 subscribers</span>
                                        <button className="text-blue-500 hover:underline">
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 transition-colors">
                                    + Add New Tier
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-xl font-semibold mb-6">Revenue Breakdown</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Crown className="w-8 h-8 text-purple-500" />
                                        <div>
                                            <h4 className="font-medium">Subscriptions</h4>
                                            <p className="text-sm text-gray-600">
                                                Monthly recurring revenue
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-600">$4,230</span>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <BookOpen className="w-8 h-8 text-blue-500" />
                                        <div>
                                            <h4 className="font-medium">Course Sales</h4>
                                            <p className="text-sm text-gray-600">
                                                One-time course purchases
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-600">$1,850</span>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <CalendarIcon className="w-8 h-8 text-red-500" />
                                        <div>
                                            <h4 className="font-medium">Paid Events</h4>
                                            <p className="text-sm text-gray-600">
                                                Event registration fees
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-600">$1,240</span>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Heart className="w-8 h-8 text-pink-500" />
                                        <div>
                                            <h4 className="font-medium">Tips & Donations</h4>
                                            <p className="text-sm text-gray-600">
                                                Member contributions
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-green-600">$110</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
