import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useAppContext } from '@/context/app-context';
import { usePostOperations } from '@/hooks/usePostData';
import { PostModel } from '@/models/Post';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

interface ViewProps {
    post: PostModel;
}

export default function PostItem({ post }: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext();
    const { likePost } = usePostOperations();
    const { user_id } = useAppContext();
    const [isLike, setIsLike] = useState(post?.is_favorit);
    const [likes, setLikes] = useState(post.favorit_count || 0);
    const handleLike = async () => {
        if (isLike) return;
        setLikes((likes: number) => likes + 1);
        setIsLike(true);
        const res = await likePost(post.id || 0, user_id);
    };

    const handleComment = async () => {
        // if (isLike) return;
        // setLikes((likes: number) => likes + 1);
        // setIsLike(true);
        // const res = await likePost(post.id || 0, user_id);
    };

    const handleClickPost = () => {
        setActiveTab({ name: 'post-detail', meta: { post, channel: post.channel } });
    };

    return (
        <>
            <div
                className="bg-gray-800 border border-gold-400/20 rounded-lg p-2 sm:p-4  cursor-pointer"
                onClick={handleClickPost}
            >
                <div className="flex items-start space-x-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hidden">
                        <span className="font-medium text-blue-700">
                            {post?.owner?.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </span>
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-md font-semibold">{post.title}</p>

                        <div className="w-full flex flex-row items-center space-x-2">
                            {post?.files_url &&
                                post?.files_url
                                    .split(',')
                                    .slice(0, 3)
                                    .map((file: any, index: number) => (
                                        <div
                                            key={index}
                                            className="w-1/3 h-40 flex items-center justify-center overflow-hidden rounded"
                                        >
                                            <img
                                                src={file}
                                                alt=""
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 flex-wrap">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="font-medium text-sm text-blue-700">
                                        {post?.owner?.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </span>
                                </div>
                                <span className=" text-gray-400 text-sm font-medium">
                                    {post?.owner?.name}
                                </span>
                                {/* <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                {post.role}
                            </span> */}
                                <span className="text-sm text-gray-400">
                                    {moment(post.created_at).fromNow()}
                                </span>
                            </div>
                            <button
                                className={`flex items-center space-x-2 text-gray-400 hover:text-red-400 ${isLike ? 'text-red-400' : 'text-gray-400'}`}
                                onClick={handleLike}
                            >
                                <Heart className="w-4 h-4" />
                                <span>{likes || 0}</span>
                            </button>
                            <button
                                className={`flex items-center space-x-2 text-gray-400 hover:text-gold-400 `}
                                onClick={handleComment}
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>{post.comment_count || 0}</span>
                            </button>

                            <button className="hidden flex items-center space-x-2 text-gray-400 hover:text-gold-400">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
