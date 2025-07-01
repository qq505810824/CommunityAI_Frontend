
import {
    BookOpen,
    Calendar as CalendarIcon,
    Hash,
    Heart,
    MessageSquare,
    Share2,
    Zap
} from 'lucide-react';

interface ViewProps {
    item: any;
}

export default function NewsfeedCard({
    item
}: ViewProps) {

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
                                <span className="font-medium text-gray-800">
                                    AI Summary
                                </span>
                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                    AI Generated
                                </span>
                            </div>
                            <p className="text-gray-700 mb-2">{item.content}</p>
                            <span className="text-sm text-gray-500">
                                {item.timestamp}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            {item.type === 'channel-post' && (
                                <Hash className="w-4 h-4 text-blue-500" />
                            )}
                            {item.type === 'course-update' && (
                                <BookOpen className="w-4 h-4 text-green-500" />
                            )}
                            {item.type === 'event-reminder' && (
                                <CalendarIcon className="w-4 h-4 text-purple-500" />
                            )}

                            <span className="font-medium text-gray-800">
                                {item.author || item.community}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                                {item.community}
                            </span>
                            {item.channel && (
                                <>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-sm text-gray-500">
                                        #{item.channel}
                                    </span>
                                </>
                            )}
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                                {item.timestamp}
                            </span>
                        </div>
                        <p className="text-gray-700 mb-4">{item.content}</p>
                        <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                                <Heart className="w-4 h-4" />
                                <span>{item.likes || 0}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                <MessageSquare className="w-4 h-4" />
                                <span>Comment</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}