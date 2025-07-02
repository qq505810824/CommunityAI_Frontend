import { ChannelModel } from '@/models/Channel';
import { Hash, Plus, Shield } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDetailContext } from '../communitys/[id]/detail-context';

interface ViewProps {
    channels: ChannelModel[];
}

export default function ChannelView({ channels }: ViewProps) {
    const router = useRouter();
    const params = useParams();

    const { activeTab, setActiveTab } = useAppDetailContext();

    const [selectedChannel, setSelectedChannel] = useState<any>(null);
    const handleCreatChannel = () => {
        router.push(`/channels/create?community_id=${params['id']}`);
    };

    return (
        <>
            <div className="space-y-6 w-full">
                <div className="flex justify-between items-center  flex-wrap space-y-2">
                    <div>
                        <h3 className="text-xl font-semibold">Text Channels</h3>
                        <p className="text-gray-600 text-sm">
                            Admin-only channels for announcements and updates
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            handleCreatChannel();
                        }}
                        className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Channel</span>
                    </button>
                </div>

                {/* Channel List */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {channels?.map((channel) => (
                        <div
                            key={channel.id}
                            onClick={() => {
                                // handleClickChannel(channel)
                                setSelectedChannel(channel);
                                setActiveTab({
                                    name: 'channel-detail',
                                    meta: {
                                        channel: channel
                                    }
                                });
                            }}
                            className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-2xl">{channel.logo || '💡'}</div>
                                    <div>
                                        <h4 className="font-semibold flex items-center space-x-2">
                                            <Hash className="w-4 h-4 text-gray-500" />
                                            <span>{channel.name}</span>
                                            {!channel.publish && (
                                                <Shield className="w-4 h-4 text-orange-500" />
                                            )}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {channel.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-500">
                                {/* <span>{channel.postCount} posts</span>
                                <span>Last post: {channel.lastPost}</span> */}
                            </div>

                            <div className="mt-3">
                                {/* <span
                                    className={`px-2 py-1 rounded-full text-xs ${channel.isPrivate
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-green-100 text-green-700'
                                        }`}
                                >
                                    {channel.isPrivate ? `${channel.memberTier} only` : 'All members'}
                                </span> */}
                            </div>
                        </div>
                    ))}
                </div>
                {channels?.length == 0 && (
                    <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
                        <div className="text-lg font-semibold mb-1">No channel yet</div>
                        <div className="text-sm">
                            Be the first to create a text channel in this community!
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
