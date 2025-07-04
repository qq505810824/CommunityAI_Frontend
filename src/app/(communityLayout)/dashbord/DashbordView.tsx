import Modal from '@/app/components/base/modal';
import CommunitiesLayout from '@/app/components/community/dashbord/CommunitiesLayout';
import NewsfeedLayout from '@/app/components/community/dashbord/NewsfeedLayout';
import CommunityFormView from '@/app/components/community/form';
import JoinCommunityView from '@/app/components/community/join';
import { CommunityModel } from '@/models/Community';
import { Plus } from 'lucide-react';
import { useState } from 'react';
interface ViewProps {
    newsfeeds: any[];
    handleRefresh: () => void;
    handleRefreshLogs: () => void;
    communities: CommunityModel[];
}

export default function DashbordView({
    newsfeeds,
    handleRefresh,
    handleRefreshLogs,
    communities
}: ViewProps) {
    const [visibleCreateCommunity, setVisibleCreateCommunity] = useState(false);
    const [visibleJoinCommunity, setVisibleJoinCommunity] = useState(false);
    const handleCreatCommunity = () => {
        setVisibleCreateCommunity(true);
    };

    const handleJoinCommunity = () => {
        setVisibleJoinCommunity(true);
    };
    return (
        <>
            <div className="flex-1 p-6 bg-gray-50 ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center  flex-wrap space-y-2 mb-8">
                        <div className=" ">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h2>
                            <p className="text-gray-600">
                                Here's what's happening in your communities
                            </p>
                        </div>
                        <div className="flex flex-row items-center space-x-2">
                            <button
                                onClick={() => {
                                    handleCreatCommunity();
                                }}
                                className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 whitespace-nowrap"
                            >
                                <Plus className="w-4 h-4" />
                                <span>New Community</span>
                            </button>
                            <button
                                onClick={() => {
                                    handleJoinCommunity();
                                }}
                                className="hidden bg-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 whitespace-nowrap"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Join Community</span>
                            </button>
                        </div>
                    </div>
                    {/* Enhanced Community Overview Cards */}
                    <CommunitiesLayout communities={communities} />

                    {/* Enhanced Newsfeed */}
                    <NewsfeedLayout newsfeeds={newsfeeds} handleRefreshLogs={handleRefreshLogs} />
                </div>
            </div>
            <Modal
                isShow={visibleCreateCommunity}
                className="!w-[480px] !max-w-[480px] !p-0 !rounded-2xl"
                wrapperClassName="z-40"
                onClose={() => {
                    setVisibleCreateCommunity(false);
                }}
            >
                <CommunityFormView
                    payload={{}}
                    cancel={() => {
                        setVisibleCreateCommunity(false);
                    }}
                    submit={() => {
                        handleRefresh();
                        setVisibleCreateCommunity(false);
                    }}
                />
            </Modal>
            <Modal
                isShow={visibleJoinCommunity}
                className="!w-[480px] !max-w-[480px] !p-0 !rounded-2xl"
                wrapperClassName="z-40"
                onClose={() => {
                    setVisibleJoinCommunity(false);
                }}
            >
                <JoinCommunityView
                    payload={{}}
                    cancel={() => {
                        setVisibleJoinCommunity(false);
                    }}
                    submit={() => {
                        handleRefresh();
                        setVisibleJoinCommunity(false);
                    }}
                />
            </Modal>
        </>
    );
}
