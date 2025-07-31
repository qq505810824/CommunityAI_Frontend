import { useAppContext } from '@/context/app-context';
import { usePostOperations } from '@/hooks/usePostData';
import { BookOpen, Calendar as CalendarIcon, Hash, Heart, MessageSquare, Zap } from 'lucide-react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    item: any;
}

export default function NewsfeedCard({ item }: ViewProps) {
    const { likePost } = usePostOperations();
    const { user_id } = useAppContext();
    const router = useRouter();
    const [isLike, setIsLike] = useState(item?.is_favorit);
    const [likes, setLikes] = useState(item.favorit_count);
    const handleLike = async () => {
        if (isLike) return;
        setLikes((likes: number) => likes + 1);
        setIsLike(true);
        const res = await likePost(item.id, user_id);
    };

    const handleClick = () => {
        router.push(
            `/communitys/${item?.community?.id}?activeTab=post-detail&channel_id=${item.channel?.id}&post_id=${item?.id}`
        );
    };
    return (
        <>
            <div className="p-6">
                {item.isAIGenerated ? (
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-gray-800">AI Summary</span>
                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                    AI Generated
                                </span>
                            </div>
                            <p className="text-gray-400 mb-2">{item?.content}</p>
                            <span className="text-sm text-gray-400">{item?.timestamp}</span>
                        </div>
                    </div>
                ) : (
                    <div className=" cursor-pointer" onClick={handleClick}>
                        <div className="flex items-center flex-wrap space-y-1 space-x-2 mb-3">
                            {item?.type === 'channel-post' && (
                                <Hash className="w-4 h-4 text-gold-400" />
                            )}
                            {item?.type === 'course-update' && (
                                <BookOpen className="w-4 h-4 text-gold-400" />
                            )}
                            {item?.type === 'event-reminder' && (
                                <CalendarIcon className="w-4 h-4 text-gold-400" />
                            )}
                            <Hash className="w-4 h-4 text-gold-400" />
                            <span className="font-medium text-gray-400">
                                {item?.owner?.name || item?.community?.name}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-400">{item?.community?.name}</span>
                            {item?.channel && (
                                <>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-sm text-gray-400">
                                        #{item?.channel.name}
                                    </span>
                                </>
                            )}
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-400">
                                {moment(item.created_at).fromNow()}
                            </span>
                        </div>
                        <p className="mb-4">{item?.title}</p>
                        <div className="w-full flex flex-row items-center space-x-2">
                            {item?.files_url &&
                                item?.files_url
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
                        <div className="flex items-center space-x-6">
                            <button
                                className={`flex items-center space-x-2 text-gray-400 hover:text-red-500 ${isLike ? 'text-red-500' : 'text-gray-400'}`}
                                onClick={handleLike}
                            >
                                <Heart className="w-4 h-4" />
                                <span>{likes || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-400 hover:text-gold-400">
                                <MessageSquare className="w-4 h-4" />
                                <span>{(item?.comments && item?.comments[0].count) || 0}</span>
                            </button>
                            {/* <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
