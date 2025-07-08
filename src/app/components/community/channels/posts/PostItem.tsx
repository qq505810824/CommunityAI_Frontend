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

    return (
        <>
            <div className="w-full flex flex-row space-x-2 hidden">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-medium text-blue-700">
                        {post?.owner?.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                    </span>
                </div>
                <div className="flex flex-col space-y-2 w-full">
                    <span className="text-gray-500 ">{post?.owner?.name}</span>
                    <p className=" ">{post.title}</p>
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-sm text-gray-500">
                            {moment(post.created_at).fromNow()}
                        </span>
                        <div className="flex items-center space-x-4">
                            <button
                                className={`flex items-center space-x-2 text-gray-500 hover:text-red-500 ${isLike ? 'text-red-500' : 'text-gray-500'}`}
                                onClick={handleLike}
                            >
                                <Heart className="w-4 h-4" />
                                <span>{likes || 0}</span>
                            </button>
                            <button className="hidden flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white border rounded-lg p-6  cursor-pointer">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-blue-700">
                            {post?.owner?.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </span>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold">{post?.owner?.name}</span>
                            {/* <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                {post.role}
                            </span> */}
                            <span className="text-sm text-gray-500">
                                {moment(post.created_at).fromNow()}
                            </span>
                        </div>

                        <p className="text-gray-700 mb-4">{post.title}</p>

                        {/* Attachments */}
                        {/* {post?.attachments && post?.attachments?.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {post?.attachments?.map((attachment: any, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                                    >
                                        {attachment?.type === 'image' && (
                                            <Image className="w-4 h-4 text-gray-500" />
                                        )}
                                        {attachment.type === 'link' && (
                                            <Link className="w-4 h-4 text-gray-500" />
                                        )}
                                        <span className="text-sm font-medium">
                                            {attachment?.name}
                                        </span>
                                        <button className="text-blue-500 hover:underline text-sm">
                                            {attachment.type === 'image' ? 'View' : 'Open'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )} */}

                        <div className="flex items-center space-x-4">
                            <button
                                className={`flex items-center space-x-2 text-gray-500 hover:text-red-500 ${isLike ? 'text-red-500' : 'text-gray-500'}`}
                                onClick={handleLike}
                            >
                                <Heart className="w-4 h-4" />
                                <span>{likes || 0}</span>
                            </button>
                            <button
                                className={`flex items-center space-x-2 text-gray-500 hover:text-red-500 `}
                                onClick={handleComment}
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>{likes || 0}</span>
                            </button>

                            <button className="hidden flex items-center space-x-2 text-gray-500 hover:text-blue-500">
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
