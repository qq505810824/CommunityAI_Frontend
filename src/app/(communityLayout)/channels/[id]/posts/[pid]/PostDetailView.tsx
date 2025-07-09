import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import ContentView from '@/app/components/common/Views/ContentView';
import CommentItem from '@/app/components/community/channels/comments/CommentItem';
import CommentFormView from '@/app/components/community/channels/comments/form';
import { useAppContext } from '@/context/app-context';
import { ChannelModel } from '@/models/Channel';
import { CommentModel } from '@/models/Comment';
import { PostModel } from '@/models/Post';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    channel: ChannelModel | undefined;
    post: PostModel | undefined;
    comments: CommentModel[];
    handleRefresh: () => void;
}

export default function PostDetailView({ channel, post, comments, handleRefresh }: ViewProps) {
    const router = useRouter();
    const { activeTab, setActiveTab } = useAppDetailContext();
    const [visibleCreatePost, setVisibleCreatePost] = useState(false);
    const { user_id } = useAppContext();

    const handleClickNewPost = () => {
        setVisibleCreatePost(true);
        // router.push(`/channels/${channel?.id}/posts/create`)
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                setActiveTab({
                                    name: 'channel-detail',
                                    meta: {
                                        channel: channel
                                    }
                                });
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <div>
                                <h3 className="text-xl font-semibold flex items-center space-x-2">
                                    <span>{post?.title}</span>
                                </h3>
                                <div className="flex flex-row items-center text-gray-500">
                                    {post?.owner?.name}{' '}
                                    <span className="ml-2">
                                        {moment(post?.created_at).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ContentView content={post?.description || ''} />
                <div className="grid sm:grid-cols-2 md:grid-cols-3 space-x-2">
                    {post?.files_url && post?.files_url?.split(",").map((file: any, index: number) => (
                        <div
                            key={index}
                            className="flex items-center justify-center overflow-hidden rounded mb-2"
                        >
                            <img
                                src={file}
                                alt=""
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
                <div className="">
                    <p className="text-md font-semibold">Comment {post?.comment_count || 0}</p>
                </div>
                <div className="">
                    <CommentFormView
                        payload={{
                            post: post?.id,
                            owner: user_id
                            // community: post?.community?.id
                        }}
                        cancel={() => {
                            setVisibleCreatePost(false);
                        }}
                        submit={() => {
                            handleRefresh();
                            setVisibleCreatePost(false);
                        }}
                    />
                </div>
                {/* Channel Posts */}
                {comments && comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments?.map((comment, index) => (
                            <CommentItem comment={comment} key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <div className="text-lg font-semibold mb-1">No comments yet</div>
                        <div className="text-sm">
                            Be the first to create a comment in this post!
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
