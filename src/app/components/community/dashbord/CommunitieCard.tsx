import { useAppContext } from '@/context/app-context';
import { CommunityModel } from '@/models/Community';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useContext } from 'use-context-selector';
import { ToastContext } from '../../base/toast';

interface ViewProps {
    community: CommunityModel;
}

export default function CommunitieCard({ community }: ViewProps) {
    const router = useRouter();
    const { notify } = useContext(ToastContext);
    const { user_id } = useAppContext()
    const [isCopied, setIsCopied] = useState(false);
    const handleClickCommuity = (commuity: any) => {
        router.push(`/communitys/${commuity?.id}`);

    };

    const handleCopyCode = () => {
        copy(community.code || '');
        setIsCopied(true);
        notify({ type: 'success', message: 'Code copied to clipboard' });
        setTimeout(() => setIsCopied(false), 2000);
    };

    const isOwner = () => {
        return community.owner.id == user_id
    }

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-full bg-white rounded-xl   hover:shadow-md transition-all duration-200 overflow-hidden"
            >
                <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3 mb-4">
                        <div
                            className={`w-12 h-12 bg-${community.theme}-100 rounded-full flex items-center justify-center text-xl`}
                        >
                            {community.logo}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 ">{community.name}
                                {isOwner() &&
                                    <span className="bg-purple-100 text-purple-700 ml-2 px-2 py-1 rounded-full text-xs">
                                        {'owner'}
                                    </span>
                                }</h3>
                            <p className="text-sm text-gray-500">{community.accounts_count} members</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">
                                {community.channels_count}
                            </div>
                            <div className="text-xs text-gray-500">Channels</div>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-green-600">
                                {community.courses_count}
                            </div>
                            <div className="text-xs text-gray-500">Courses</div>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">
                                {community.events_count}
                            </div>
                            <div className="text-xs text-gray-500">Events</div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Unread posts</span>
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                {community.unreadPosts || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Revenue (30d)</span>
                            <span className="text-green-600 font-medium">
                                ${community.revenue || 0}
                            </span>
                        </div>
                    </div>

                    <div className=" ">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <ClipboardDocumentIcon className="w-4 h-4 text-gray-500 mr-2" />
                                <span className="text-sm font-medium text-gray-700">
                                    {community.code}
                                </span>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isCopied
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyCode();
                                }}
                            >
                                {isCopied ? 'Copied!' : 'Copy'}
                            </motion.button>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            // setSelectedCommunity(community);
                            // setCurrentView('community');
                            handleClickCommuity(community);
                        }}
                        className={`w-full mt-4 bg-${community.theme}-500 text-white py-2 rounded-lg hover:bg-${community.theme}-600 transition-colors`}
                    >
                        Enter Community
                    </button>

                </div>
            </motion.div>
        </>
    );
}
