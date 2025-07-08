import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useAppContext } from '@/context/app-context';
import { usePostOperations } from '@/hooks/usePostData';
import { ChannelModel } from '@/models/Channel';
import { Hash, Shield } from 'lucide-react';
import moment from 'moment';

interface ViewProps {
    channel: ChannelModel;
}

export default function ChannelItem({ channel }: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext();
    const { likePost } = usePostOperations();
    const { user_id } = useAppContext();

    return (
        <>
            <div
                onClick={() => {
                    // handleClickChannel(channel)
                    // setSelectedChannel(channel);
                    setActiveTab({
                        name: 'channel-detail',
                        meta: {
                            channel: channel
                        }
                    });
                }}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                        {/* <div className="text-2xl">{channel.logo || '💡'}</div> */}
                        <div>
                            <h4 className="font-semibold flex items-center space-x-2">
                                <Hash className="w-4 h-4 text-gray-500" />
                                <span>{channel.name}</span>
                                {!channel.publish && <Shield className="w-4 h-4 text-orange-500" />}
                            </h4>

                            <p
                                className="text-gray-600 text-sm  line-clamp-2"
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 2,
                                    height: '3em' // 根据行高设置最大高度
                                }}
                            >
                                {channel.description.replace(/<[^>]*>/g, '')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex flex-row items-center">
                        {channel?.owner?.name}{' '}
                        <span className="ml-2">{moment(channel?.created_at).fromNow()}</span>
                    </div>
                    <div>
                        <span className="">{channel.posts_count || 0} </span>posts
                    </div>
                </div>
                {/* <div className="flex justify-between items-center text-sm text-gray-500">
                    <div><span className='text-black'>{channel.posts_count || 0} </span>posts</div>
                    {channel?.last_post && <span className='max-w-[200px] truncate block"'>Last post: {channel?.last_post?.title}</span>}
                </div> */}

                <div className="mt-3 hidden">
                    <span
                        className={`px-2 py-1 rounded-full text-xs ${
                            !channel.publish
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-green-100 text-green-700'
                        }`}
                    >
                        {!channel.publish ? `${channel.tier} only` : 'All members'}
                    </span>
                </div>
            </div>
        </>
    );
}
