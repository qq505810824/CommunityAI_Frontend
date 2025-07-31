import ContentView from '@/app/components/common/Views/ContentView';
import PostItem from '@/app/components/community/channels/posts/PostItem';
import { useAppContext } from '@/context/app-context';
import { ChannelModel } from '@/models/Channel';
import { PostModel } from '@/models/Post';
import { ArrowLeft, Hash, Plus, Shield } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDetailContext } from '../../communitys/[id]/detail-context';

interface ViewProps {
    channel: ChannelModel | undefined;
    posts: PostModel[];
    handleRefresh: () => void;
}

export default function ChannelDetailView({ channel, posts, handleRefresh }: ViewProps) {
    const router = useRouter();
    const { activeTab, setActiveTab } = useAppDetailContext();
    const [visibleCreatePost, setVisibleCreatePost] = useState(false);
    const { user_id } = useAppContext();

    const handleClickNewPost = () => {
        // setVisibleCreatePost(true);
        router.push(`/channels/${channel?.id}/posts/create?community_id=${channel?.community}`);
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setActiveTab({ name: 'channels' })}
                            className="p-2 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5 hover:text-gold-400" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl">{channel?.logo}</div>
                            <div>
                                <h3 className="text-xl font-semibold flex items-center space-x-2">
                                    <Hash className="w-5 h-5 text-gold-400" />
                                    <span>{channel?.name}</span>
                                    {!channel?.publish && (
                                        <Shield className="w-4 h-4 text-orange-500" />
                                    )}
                                </h3>
                                <div className="flex flex-row items-center text-gray-400">
                                    {channel?.owner?.name}{' '}
                                    <span className="ml-2">
                                        {moment(channel?.created_at).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-gold-500 text-white px-4 py-1 text-sm sm:px-4 sm:py-2 rounded-lg hover:bg-gold-600 flex items-center space-x-2"
                        onClick={handleClickNewPost}
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Post</span>
                    </button>
                </div>
                <ContentView content={channel?.description || ''} />
                <div className="">
                    <p className="text-md font-semibold">Post {channel?.posts_count || 0}</p>
                </div>
                {/* Channel Posts */}
                {posts && posts.length > 0 ? (
                    <div className="space-y-4">
                        {posts?.map((post, index) => <PostItem post={post} key={index} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <div className="text-lg font-semibold mb-1">No posts yet</div>
                        <div className="text-sm">
                            Be the first to create a post in this channel!
                        </div>
                    </div>
                )}
            </div>
            {/* <Modal
                isShow={visibleCreatePost}
                className="!w-[480px] !max-w-[480px] !p-0 !rounded-2xl"
                wrapperClassName="z-40"
                onClose={() => {
                    setVisibleCreatePost(false);
                }}
            >
                <PostFormView
                    payload={{
                        channel: channel?.id,
                        owner: user_id,
                        community: channel?.community?.id
                    }}
                    cancel={() => {
                        setVisibleCreatePost(false);
                    }}
                    submit={() => {
                        handleRefresh();
                        setVisibleCreatePost(false);
                    }}
                />
            </Modal> */}
        </>
    );
}
