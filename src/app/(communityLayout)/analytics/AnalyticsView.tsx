import {
    BookOpen,
    Calendar as CalendarIcon,
    Hash,
    Target,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { useState } from "react";

export default function AnalyticsView() {

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
        </>
    )
}