

import {
    ArrowLeft,
    Hash,
    Heart,
    Image,
    Link,
    Plus,
    Share2,
    Shield
} from 'lucide-react';
import { useState } from "react";
import { useAppDetailContext } from '../../communitys/[id]/detail-context';

export default function ChannelDetailView() {


    const [selectedChannel, setSelectedChannel] = useState<any>(null);
    // const [activeTab, setActiveTab] = useState('discussions');
    const { activeTab, setActiveTab } = useAppDetailContext()

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

    return (
        <>
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
        </>
    )
}