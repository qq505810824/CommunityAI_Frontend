import PostItem from '@/app/components/community/channels/posts/PostItem';
import { ChannelModel } from '@/models/Channel';
import { PostModel } from '@/models/Post';
import { ArrowLeft, Hash, Plus, Shield } from 'lucide-react';
import { useAppDetailContext } from '../../communitys/[id]/detail-context';

interface ViewProps {
    channel: ChannelModel | undefined;
    posts: PostModel[];
}

export default function ChannelDetailView({ channel, posts }: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext();

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
                            onClick={() => setActiveTab({ name: 'channels' })}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">{channel?.logo}</div>
                            <div>
                                <h3 className="text-xl font-semibold flex items-center space-x-2">
                                    <Hash className="w-5 h-5 text-gray-500" />
                                    <span>{channel?.name}</span>
                                    {!channel?.publish && (
                                        <Shield className="w-4 h-4 text-orange-500" />
                                    )}
                                </h3>
                                <p className="text-gray-600 text-sm">{channel?.description}</p>
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
                    {posts?.map((post, index) => <PostItem post={post} key={index} />)}
                </div>
            </div>
        </>
    );
}
