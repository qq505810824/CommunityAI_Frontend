'use client';

import {
    ArrowLeft,
    BarChart3,
    Bell,
    Bookmark,
    BookOpen,
    Calendar as CalendarIcon,
    CheckCircle,
    ChevronDown,
    Clock,
    Crown,
    DollarSign,
    ExternalLink,
    Globe,
    Hash,
    Heart,
    Home,
    Image,
    Link,
    MapPin,
    MessageCircle,
    MessageSquare,
    PlayCircle,
    Plus,
    Search,
    Share2,
    Shield,
    Star,
    Target,
    TrendingUp,
    User,
    Users,
    Zap
} from 'lucide-react';
import { useState } from 'react';

const CommunityPlatform = () => {
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

    // Mock data for communities
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

    // Mock data for text channels
    const textChannels = [
        {
            id: 1,
            name: 'announcements',
            description: 'Important community updates and news',
            isPrivate: false,
            memberTier: 'all',
            lastPost: '2 hours ago',
            postCount: 45,
            icon: '📢'
        },
        {
            id: 2,
            name: 'daily-tips',
            description: 'Daily marketing tips and insights',
            isPrivate: false,
            memberTier: 'all',
            lastPost: '4 hours ago',
            postCount: 123,
            icon: '💡'
        },
        {
            id: 3,
            name: 'premium-insights',
            description: 'Exclusive content for premium members',
            isPrivate: true,
            memberTier: 'premium',
            lastPost: '1 day ago',
            postCount: 28,
            icon: '👑'
        },
        {
            id: 4,
            name: 'event-updates',
            description: 'Updates about upcoming events',
            isPrivate: false,
            memberTier: 'all',
            lastPost: '6 hours ago',
            postCount: 67,
            icon: '📅'
        }
    ];

    // Mock data for channel posts
    const channelPosts = [
        {
            id: 1,
            author: 'Sarah Chen',
            role: 'Community Owner',
            timestamp: '2 hours ago',
            content:
                "🎉 Exciting news! We're launching our new advanced SEO course next week. Premium members get early access starting Monday!",
            type: 'text',
            likes: 24,
            attachments: []
        },
        {
            id: 2,
            author: 'Mike Rodriguez',
            role: 'Moderator',
            timestamp: '1 day ago',
            content:
                'Check out this amazing case study on email marketing automation that increased conversions by 300%! 📈',
            type: 'text',
            likes: 18,
            attachments: [{ type: 'image', name: 'case-study-chart.png', url: '#' }]
        },
        {
            id: 3,
            author: 'Sarah Chen',
            role: 'Community Owner',
            timestamp: '3 days ago',
            content:
                "New resource alert! I've uploaded a comprehensive guide to social media content planning. Download it from the link below:",
            type: 'text',
            likes: 31,
            attachments: [
                {
                    type: 'link',
                    name: 'Social Media Planning Guide',
                    url: 'https://example.com/guide'
                }
            ]
        }
    ];

    // Mock data for courses
    const courses = [
        {
            id: 1,
            title: 'Advanced SEO Strategies 2025',
            description: 'Master the latest SEO techniques and rank higher in search results',
            instructor: 'Sarah Chen',
            duration: '6 hours',
            lessons: 24,
            enrolled: 156,
            rating: 4.8,
            price: 99,
            tier: 'premium',
            thumbnail: '🔍',
            progress: 0,
            modules: [
                {
                    id: 1,
                    title: 'SEO Fundamentals',
                    lessons: 6,
                    duration: '90 min',
                    completed: false
                },
                {
                    id: 2,
                    title: 'Keyword Research Mastery',
                    lessons: 8,
                    duration: '120 min',
                    completed: false
                },
                {
                    id: 3,
                    title: 'Technical SEO',
                    lessons: 10,
                    duration: '150 min',
                    completed: false
                }
            ]
        },
        {
            id: 2,
            title: 'Content Marketing Blueprint',
            description: 'Create compelling content that converts visitors into customers',
            instructor: 'Anna Smith',
            duration: '4 hours',
            lessons: 18,
            enrolled: 89,
            rating: 4.6,
            price: 79,
            tier: 'basic',
            thumbnail: '📝',
            progress: 45,
            modules: [
                {
                    id: 1,
                    title: 'Content Strategy',
                    lessons: 5,
                    duration: '75 min',
                    completed: true
                },
                {
                    id: 2,
                    title: 'Content Creation',
                    lessons: 8,
                    duration: '100 min',
                    completed: false
                },
                {
                    id: 3,
                    title: 'Content Promotion',
                    lessons: 5,
                    duration: '65 min',
                    completed: false
                }
            ]
        },
        {
            id: 3,
            title: 'Email Marketing Automation',
            description: 'Build automated email sequences that nurture leads and drive sales',
            instructor: 'Mike Rodriguez',
            duration: '5 hours',
            lessons: 20,
            enrolled: 234,
            rating: 4.9,
            price: 129,
            tier: 'premium',
            thumbnail: '📧',
            progress: 0,
            modules: [
                {
                    id: 1,
                    title: 'Email Strategy',
                    lessons: 6,
                    duration: '90 min',
                    completed: false
                },
                {
                    id: 2,
                    title: 'Automation Setup',
                    lessons: 8,
                    duration: '120 min',
                    completed: false
                },
                {
                    id: 3,
                    title: 'Advanced Sequences',
                    lessons: 6,
                    duration: '90 min',
                    completed: false
                }
            ]
        }
    ];

    // Mock data for events
    const events = [
        {
            id: 1,
            title: 'Monthly SEO Masterclass',
            description:
                'Deep dive into the latest SEO trends and algorithm updates. Interactive Q&A session included.',
            date: '2025-07-15',
            time: '14:00',
            duration: '2 hours',
            format: 'virtual',
            link: 'https://zoom.us/j/123456789',
            capacity: 100,
            registered: 67,
            price: 29,
            tier: 'all',
            host: 'Sarah Chen',
            status: 'upcoming',
            category: 'Workshop'
        },
        {
            id: 2,
            title: 'Content Creation Workshop',
            description: 'Learn to create engaging content that drives traffic and conversions.',
            date: '2025-07-20',
            time: '16:00',
            duration: '3 hours',
            format: 'virtual',
            link: 'https://meet.google.com/xyz-abc-def',
            capacity: 50,
            registered: 23,
            price: 0,
            tier: 'premium',
            host: 'Anna Smith',
            status: 'upcoming',
            category: 'Training'
        },
        {
            id: 3,
            title: 'Marketing Strategy Bootcamp',
            description:
                'Intensive 1-day bootcamp covering complete marketing strategy development.',
            date: '2025-07-25',
            time: '09:00',
            duration: '8 hours',
            format: 'in-person',
            location: 'San Francisco, CA',
            capacity: 30,
            registered: 28,
            price: 199,
            tier: 'all',
            host: 'Mike Rodriguez',
            status: 'upcoming',
            category: 'Bootcamp'
        },
        {
            id: 4,
            title: 'Q&A: Ask the Experts',
            description:
                'Monthly Q&A session where you can ask our experts anything about marketing.',
            date: '2025-06-28',
            time: '18:00',
            duration: '1 hour',
            format: 'virtual',
            link: 'https://zoom.us/j/987654321',
            capacity: 200,
            registered: 189,
            price: 0,
            tier: 'all',
            host: 'Community Team',
            status: 'completed',
            category: 'Q&A'
        }
    ];

    // Updated newsfeed data
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

    const Sidebar = () => (
        <div className=" w-72 bg-white shadow-sm border-r min-h-screen">
            <div className="p-6">
                <div className="space-y-2">
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            currentView === 'dashboard'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <Home className="w-5 h-5" />
                        <span>Dashboard</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('communities')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            currentView === 'communities'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <Users className="w-5 h-5" />
                        <span>My Communities</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('monetization')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            currentView === 'monetization'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <DollarSign className="w-5 h-5" />
                        <span>Monetization</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('analytics')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            currentView === 'analytics'
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
    );

    const TextChannelsView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">Text Channels</h3>
                    <p className="text-gray-600 text-sm">
                        Admin-only channels for announcements and updates
                    </p>
                </div>
                <button
                    onClick={() => {
                        setCreateType('channel');
                        setShowCreateForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Channel</span>
                </button>
            </div>

            {/* Channel List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {textChannels.map((channel) => (
                    <div
                        key={channel.id}
                        onClick={() => {
                            setSelectedChannel(channel);
                            setActiveTab('channel-detail');
                        }}
                        className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-2xl">{channel.icon}</div>
                                <div>
                                    <h4 className="font-semibold flex items-center space-x-2">
                                        <Hash className="w-4 h-4 text-gray-500" />
                                        <span>{channel.name}</span>
                                        {channel.isPrivate && (
                                            <Shield className="w-4 h-4 text-orange-500" />
                                        )}
                                    </h4>
                                    <p className="text-sm text-gray-600">{channel.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>{channel.postCount} posts</span>
                            <span>Last post: {channel.lastPost}</span>
                        </div>

                        <div className="mt-3">
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                    channel.isPrivate
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-green-100 text-green-700'
                                }`}
                            >
                                {channel.isPrivate ? `${channel.memberTier} only` : 'All members'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Channel Form */}
            {showCreateForm && createType === 'channel' && (
                <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold mb-4">Create New Channel</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Channel Name</label>
                            <input
                                type="text"
                                value={newChannelName}
                                onChange={(e) => setNewChannelName(e.target.value)}
                                placeholder="e.g. announcements"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={newChannelDescription}
                                onChange={(e) => setNewChannelDescription(e.target.value)}
                                placeholder="What is this channel for?"
                                rows={3}
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="public"
                                    className="mr-2"
                                />
                                <span className="text-sm">Public (All members)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="private"
                                    className="mr-2"
                                />
                                <span className="text-sm">Private (Premium only)</span>
                            </label>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Create Channel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const ChannelDetailView = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setActiveTab('channels')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="text-2xl">{selectedChannel?.icon}</div>
                        <div>
                            <h3 className="text-xl font-semibold flex items-center space-x-2">
                                <Hash className="w-5 h-5 text-gray-500" />
                                <span>{selectedChannel?.name}</span>
                                {selectedChannel?.isPrivate && (
                                    <Shield className="w-4 h-4 text-orange-500" />
                                )}
                            </h3>
                            <p className="text-gray-600 text-sm">{selectedChannel?.description}</p>
                        </div>
                    </div>
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Post</span>
                </button>
            </div>

            {/* Channel Posts */}
            <div className="space-y-4">
                {channelPosts.map((post) => (
                    <div key={post.id} className="bg-white border rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="font-medium text-blue-700">
                                    {post.author
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </span>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-semibold">{post.author}</span>
                                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                        {post.role}
                                    </span>
                                    <span className="text-sm text-gray-500">{post.timestamp}</span>
                                </div>

                                <p className="text-gray-700 mb-4">{post.content}</p>

                                {/* Attachments */}
                                {post.attachments.length > 0 && (
                                    <div className="space-y-2 mb-4">
                                        {post.attachments.map((attachment, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                                            >
                                                {attachment.type === 'image' && (
                                                    <Image className="w-4 h-4 text-gray-500" />
                                                )}
                                                {attachment.type === 'link' && (
                                                    <Link className="w-4 h-4 text-gray-500" />
                                                )}
                                                <span className="text-sm font-medium">
                                                    {attachment.name}
                                                </span>
                                                <button className="text-blue-500 hover:underline text-sm">
                                                    {attachment.type === 'image' ? 'View' : 'Open'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                                        <Heart className="w-4 h-4" />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                        <Share2 className="w-4 h-4" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const CoursesView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">Courses</h3>
                    <p className="text-gray-600 text-sm">
                        Comprehensive learning modules with multimedia content
                    </p>
                </div>
                <button
                    onClick={() => {
                        setCreateType('course');
                        setShowCreateForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Course</span>
                </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => {
                            setSelectedCourse(course);
                            setActiveTab('course-detail');
                        }}
                        className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <div className="text-4xl">{course.thumbnail}</div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-lg">{course.title}</h4>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm text-gray-600">{course.rating}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{course.lessons} lessons</span>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{course.enrolled} enrolled</span>
                                    <span>by {course.instructor}</span>
                                </div>
                            </div>

                            {course.progress > 0 && (
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-green-600">
                                        {course.price === 0 ? 'Free' : `$${course.price}`}
                                    </span>
                                    {course.tier !== 'all' && (
                                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                            {course.tier}
                                        </span>
                                    )}
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                                    {course.progress > 0 ? 'Continue' : 'Start'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Course Form */}
            {showCreateForm && createType === 'course' && (
                <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold mb-4">Create New Course</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Course Title</label>
                            <input
                                type="text"
                                value={newCourseTitle}
                                onChange={(e) => setNewCourseTitle(e.target.value)}
                                placeholder="e.g. Advanced Marketing Strategies"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                placeholder="What will students learn?"
                                rows={3}
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Access Level
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="all">All Members</option>
                                    <option value="basic">Basic Tier</option>
                                    <option value="premium">Premium Tier</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Create Course
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const CourseDetailView = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h3 className="text-xl font-semibold">{selectedCourse?.title}</h3>
                        <p className="text-gray-600 text-sm">by {selectedCourse?.instructor}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-lg p-6 mb-6">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <PlayCircle className="w-16 h-16 text-blue-500" />
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{selectedCourse?.title}</h4>
                        <p className="text-gray-600 mb-4">{selectedCourse?.description}</p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                            <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{selectedCourse?.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{selectedCourse?.lessons} lessons</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{selectedCourse?.enrolled} students</span>
                            </span>
                        </div>

                        {selectedCourse?.progress > 0 && (
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Your Progress</span>
                                    <span>{selectedCourse.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${selectedCourse.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Course Modules */}
                    <div className="bg-white border rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-4">Course Content</h4>
                        <div className="space-y-3">
                            {selectedCourse?.modules.map((module: any, index: number) => (
                                <div key={module.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-medium flex items-center space-x-2">
                                            {module.completed ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                                            )}
                                            <span>
                                                Module {index + 1}: {module.title}
                                            </span>
                                        </h5>
                                        <span className="text-sm text-gray-500">
                                            {module.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{module.lessons} lessons</span>
                                        <button className="text-blue-500 hover:underline">
                                            {module.completed ? 'Review' : 'Start'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white border rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {selectedCourse?.price === 0 ? 'Free' : `$${selectedCourse?.price}`}
                            </div>
                            {selectedCourse?.tier !== 'all' && (
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                    {selectedCourse?.tier} members only
                                </span>
                            )}
                        </div>

                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium mb-4">
                            {selectedCourse?.progress > 0 ? 'Continue Learning' : 'Enroll Now'}
                        </button>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-medium">{selectedCourse?.duration}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Lessons</span>
                                <span className="font-medium">{selectedCourse?.lessons}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Students</span>
                                <span className="font-medium">{selectedCourse?.enrolled}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Rating</span>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="font-medium">{selectedCourse?.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h5 className="font-semibold mb-4">What you'll learn</h5>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Master advanced techniques and strategies</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Apply practical skills to real-world scenarios</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Get access to exclusive resources and templates</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Join a community of like-minded learners</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    const EventsView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">Events</h3>
                    <p className="text-gray-600 text-sm">
                        Virtual and in-person events for community members
                    </p>
                </div>
                <button
                    onClick={() => {
                        setCreateType('event');
                        setShowCreateForm(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Event</span>
                </button>
            </div>

            {/* Event Filters */}
            <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
                    All Events
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                    Upcoming
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                    My Events
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                    Past Events
                </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => {
                            setSelectedEvent(event);
                            setActiveTab('event-detail');
                        }}
                        className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {event.description}
                                </p>

                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>
                                            {new Date(event.date).toLocaleDateString()} at{' '}
                                            {event.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{event.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {event.format === 'virtual' ? (
                                            <>
                                                <Globe className="w-4 h-4" />
                                                <span>Virtual Event</span>
                                            </>
                                        ) : (
                                            <>
                                                <MapPin className="w-4 h-4" />
                                                <span>{event.location}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="ml-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                        event.status === 'upcoming'
                                            ? 'bg-green-100 text-green-700'
                                            : event.status === 'completed'
                                              ? 'bg-gray-100 text-gray-700'
                                              : 'bg-blue-100 text-blue-700'
                                    }`}
                                >
                                    {event.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>
                                    {event.registered}/{event.capacity} registered
                                </span>
                                <span>by {event.host}</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                {event.price > 0 && (
                                    <span className="font-bold text-green-600">${event.price}</span>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle registration
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm ${
                                        event.status === 'upcoming'
                                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    disabled={event.status !== 'upcoming'}
                                >
                                    {event.status === 'upcoming' ? 'Register' : 'View Details'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Event Form */}
            {showCreateForm && createType === 'event' && (
                <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold mb-4">Create New Event</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Event Title</label>
                            <input
                                type="text"
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)}
                                placeholder="e.g. Monthly Marketing Workshop"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                placeholder="What is this event about?"
                                rows={3}
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Date</label>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Time</label>
                                <input
                                    type="time"
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Format</label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="virtual">Virtual</option>
                                    <option value="in-person">In-Person</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowCreateForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const EventDetailView = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setActiveTab('events')}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h3 className="text-xl font-semibold">{selectedEvent?.title}</h3>
                        <p className="text-gray-600 text-sm">Hosted by {selectedEvent?.host}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Register Now
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Event Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-lg p-6 mb-6">
                        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-6">
                            <CalendarIcon className="w-16 h-16 text-green-500" />
                        </div>

                        <h4 className="font-semibold text-lg mb-4">About This Event</h4>
                        <p className="text-gray-700 mb-6">{selectedEvent?.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Date & Time</div>
                                        <div className="text-sm text-gray-600">
                                            {new Date(selectedEvent?.date).toLocaleDateString()} at{' '}
                                            {selectedEvent?.time}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Duration</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedEvent?.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    {selectedEvent?.format === 'virtual' ? (
                                        <Globe className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <MapPin className="w-5 h-5 text-gray-500" />
                                    )}
                                    <div>
                                        <div className="font-medium">Location</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedEvent?.format === 'virtual'
                                                ? 'Virtual Event'
                                                : selectedEvent?.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Users className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Capacity</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedEvent?.registered}/{selectedEvent?.capacity}{' '}
                                            registered
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-4">What You'll Learn</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>
                                    Advanced strategies and techniques from industry experts
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Practical tips you can implement immediately</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Network with like-minded professionals</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Q&A session with the host and other experts</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Event Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white border rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {selectedEvent?.price === 0 ? 'Free' : `$${selectedEvent?.price}`}
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    selectedEvent?.status === 'upcoming'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {selectedEvent?.status}
                            </span>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium mb-4">
                            {selectedEvent?.status === 'upcoming'
                                ? 'Register Now'
                                : 'View Recording'}
                        </button>

                        {selectedEvent?.format === 'virtual' && selectedEvent?.link && (
                            <button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50 flex items-center justify-center space-x-2">
                                <ExternalLink className="w-4 h-4" />
                                <span>Join Event</span>
                            </button>
                        )}
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h5 className="font-semibold mb-4">Event Details</h5>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Category</span>
                                <span className="font-medium">{selectedEvent?.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Host</span>
                                <span className="font-medium">{selectedEvent?.host}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Registered</span>
                                <span className="font-medium">
                                    {selectedEvent?.registered} people
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Spots Left</span>
                                <span className="font-medium">
                                    {selectedEvent?.capacity - selectedEvent?.registered}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h5 className="font-semibold mb-4">Recent Attendees</h5>
                        <div className="space-y-3">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <span className="text-sm">Member {index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const Dashboard = () => (
        <div className="flex-1 p-6 bg-gray-50 ">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
                    <p className="text-gray-600">Here's what's happening in your communities</p>
                </div>

                {/* Enhanced Community Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {userCommunities.map((community) => (
                        <div
                            key={community.id}
                            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div
                                    className={`w-12 h-12 bg-${community.theme}-100 rounded-full flex items-center justify-center text-xl`}
                                >
                                    {community.logo}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {community.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {community.members} members
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <div className="text-lg font-bold text-blue-600">
                                        {community.channels}
                                    </div>
                                    <div className="text-xs text-gray-500">Channels</div>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <div className="text-lg font-bold text-green-600">
                                        {community.courses}
                                    </div>
                                    <div className="text-xs text-gray-500">Courses</div>
                                </div>
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <div className="text-lg font-bold text-purple-600">
                                        {community.events}
                                    </div>
                                    <div className="text-xs text-gray-500">Events</div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Unread posts</span>
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                        {community.unreadPosts}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Revenue (30d)</span>
                                    <span className="text-green-600 font-medium">
                                        ${community.revenue}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedCommunity(community);
                                    setCurrentView('community');
                                }}
                                className={`w-full mt-4 bg-${community.theme}-500 text-white py-2 rounded-lg hover:bg-${community.theme}-600 transition-colors`}
                            >
                                Enter Community
                            </button>
                        </div>
                    ))}
                </div>

                {/* Enhanced Newsfeed */}
                <div className="bg-white rounded-xl shadow-sm border ">
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-semibold text-gray-800">Community Updates</h3>
                    </div>

                    <div className="divide-y">
                        {newsfeedData.map((item) => (
                            <div key={item.id} className="p-6">
                                {item.isAIGenerated ? (
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="font-medium text-gray-800">
                                                    AI Summary
                                                </span>
                                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                                    AI Generated
                                                </span>
                                            </div>
                                            <p className="text-gray-700 mb-2">{item.content}</p>
                                            <span className="text-sm text-gray-500">
                                                {item.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            {item.type === 'channel-post' && (
                                                <Hash className="w-4 h-4 text-blue-500" />
                                            )}
                                            {item.type === 'course-update' && (
                                                <BookOpen className="w-4 h-4 text-green-500" />
                                            )}
                                            {item.type === 'event-reminder' && (
                                                <CalendarIcon className="w-4 h-4 text-purple-500" />
                                            )}

                                            <span className="font-medium text-gray-800">
                                                {item.author || item.community}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-sm text-gray-500">
                                                {item.community}
                                            </span>
                                            {item.channel && (
                                                <>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-sm text-gray-500">
                                                        #{item.channel}
                                                    </span>
                                                </>
                                            )}
                                            <span className="text-gray-400">•</span>
                                            <span className="text-sm text-gray-500">
                                                {item.timestamp}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-4">{item.content}</p>
                                        <div className="flex items-center space-x-6">
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                                                <Heart className="w-4 h-4" />
                                                <span>{item.likes || 0}</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                                <MessageSquare className="w-4 h-4" />
                                                <span>Comment</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                                                <Share2 className="w-4 h-4" />
                                                <span>Share</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const CommunityView = () => {
        if (!selectedCommunity) return null;

        const renderActiveTab = () => {
            switch (activeTab) {
                case 'discussions':
                    return <div className="p-6">Forum discussions would go here...</div>;
                case 'channels':
                    return <TextChannelsView />;
                case 'channel-detail':
                    return <ChannelDetailView />;
                case 'courses':
                    return <CoursesView />;
                case 'course-detail':
                    return <CourseDetailView />;
                case 'events':
                    return <EventsView />;
                case 'event-detail':
                    return <EventDetailView />;
                case 'live-events':
                    return <div className="p-6">Live streaming would go here...</div>;
                case 'premium':
                    return <div className="p-6">Premium content would go here...</div>;
                default:
                    return <TextChannelsView />;
            }
        };

        return (
            <div className="flex-1  bg-gray-50">
                {/* Community Header */}
                <div
                    className={`bg-gradient-to-r from-${selectedCommunity.theme}-500 to-${selectedCommunity.theme}-600`}
                >
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                                {selectedCommunity.logo}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{selectedCommunity.name}</h1>
                                <p className="text-white text-opacity-90">
                                    {selectedCommunity.members} members
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <button
                                onClick={() => setActiveTab('discussions')}
                                className={`bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab === 'discussions' ? 'bg-opacity-30' : ''}`}
                            >
                                <MessageCircle className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Discussions</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('channels')}
                                className={`bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab.includes('channel') ? 'bg-opacity-30' : ''}`}
                            >
                                <Hash className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Channels</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('courses')}
                                className={`bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab.includes('course') ? 'bg-opacity-30' : ''}`}
                            >
                                <BookOpen className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Courses</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('events')}
                                className={`bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab.includes('event') ? 'bg-opacity-30' : ''}`}
                            >
                                <CalendarIcon className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Events</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('premium')}
                                className={`bg-white bg-opacity-20 rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab === 'premium' ? 'bg-opacity-30' : ''}`}
                            >
                                <Star className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Premium</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Community Content */}
                <div className="max-w-6xl mx-auto px-6 py-8">{renderActiveTab()}</div>
            </div>
        );
    };

    const MonetizationView = () => (
        <div className="flex-1 p-6 bg-gray-50">
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
                                    <button className="text-blue-500 hover:underline">Edit</button>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4 border-purple-200 bg-purple-50">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium">Premium Tier</h4>
                                    <span className="text-lg font-bold">$29.99/mo</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    All basic features plus premium courses, private channels, and
                                    exclusive events
                                </p>
                                <div className="flex justify-between text-sm">
                                    <span>186 subscribers</span>
                                    <button className="text-blue-500 hover:underline">Edit</button>
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
    );

    const AnalyticsView = () => (
        <div className="flex-1 p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Analytics & Insights</h2>
                    <p className="text-gray-600">
                        Track your community growth and engagement across all features
                    </p>
                </div>

                {/* Enhanced Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">Total Members</h3>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">4,240</p>
                        <p className="text-sm text-green-600 mt-1">+18% growth</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">Channel Engagement</h3>
                            <Hash className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">89%</p>
                        <p className="text-sm text-green-600 mt-1">+12% this week</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">Course Completion</h3>
                            <BookOpen className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">74%</p>
                        <p className="text-sm text-green-600 mt-1">+8% improvement</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">Event Attendance</h3>
                            <CalendarIcon className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">82%</p>
                        <p className="text-sm text-green-600 mt-1">+15% this month</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-700">Conversion Rate</h3>
                            <TrendingUp className="w-5 h-5 text-red-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-800">12.4%</p>
                        <p className="text-sm text-green-600 mt-1">+3% this month</p>
                    </div>
                </div>

                {/* Enhanced Analytics Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-xl font-semibold mb-6">Top Performing Content</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Hash className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium">SEO Tips Channel</span>
                                </div>
                                <span className="text-sm text-gray-600">1,234 views</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <BookOpen className="w-4 h-4 text-green-500" />
                                    <span className="font-medium">Advanced Marketing Course</span>
                                </div>
                                <span className="text-sm text-gray-600">567 enrollments</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <CalendarIcon className="w-4 h-4 text-purple-500" />
                                    <span className="font-medium">Monthly Masterclass</span>
                                </div>
                                <span className="text-sm text-gray-600">89 attendees</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="text-xl font-semibold mb-6">AI-Powered Insights</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Zap className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium text-blue-700">
                                        Channel Optimization
                                    </span>
                                </div>
                                <p className="text-sm text-blue-600">
                                    Posts in your 'daily-tips' channel get 3x more engagement when
                                    posted at 9 AM.
                                </p>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span className="font-medium text-green-700">
                                        Course Recommendation
                                    </span>
                                </div>
                                <p className="text-sm text-green-600">
                                    Members who complete your SEO course are 60% more likely to
                                    upgrade to premium.
                                </p>
                            </div>

                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Target className="w-4 h-4 text-purple-500" />
                                    <span className="font-medium text-purple-700">
                                        Event Strategy
                                    </span>
                                </div>
                                <p className="text-sm text-purple-600">
                                    Weekend events have 40% higher attendance rates than weekday
                                    events.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCurrentView = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />;
            case 'community':
                return <CommunityView />;
            case 'monetization':
                return <MonetizationView />;
            case 'analytics':
                return <AnalyticsView />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className=" w-full  h-full  pb-8 mb-4 min-h-screen flex flex-col ">
            <NavBar />
            <div className="w-full flex   h-full ">
                <Sidebar />
                <div className="w-full h-full overflow-y-auto bg-gray-50 pb-12">
                    {renderCurrentView()}
                </div>
            </div>
        </div>
    );
};

export default CommunityPlatform;
