

import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { PostModel } from '@/models/Post';
import {
    Heart,
    Share2
} from 'lucide-react';
import moment from 'moment';

interface ViewProps {
    post: PostModel
}

export default function PostItem({
    post
}: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext()


    return (
        <>

            <div
                className="bg-white border rounded-lg p-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-medium text-blue-700">
                            {post.owner.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </span>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold">{post.owner.name}</span>
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                {post.role}
                            </span>
                            <span className="text-sm text-gray-500">{moment(post.created_at).fromNow()}</span>
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
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                                <Heart className="w-4 h-4" />
                                <span>{post.favorit_count}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}