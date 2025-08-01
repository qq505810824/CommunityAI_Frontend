import Modal from '@/app/components/base/modal';
import CampaignsLayout from '@/app/components/community/campaigns/CampaignsLayout';
import CommunityFormView from '@/app/components/community/form';
import { CampaignModel } from '@/models/Campaign';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface ViewProps {
    handleRefresh: () => void;
    campaigns: CampaignModel[];
}

export default function CampaignsView({ handleRefresh, campaigns }: ViewProps) {
    const router = useRouter()
    const [visibleCreateCommunity, setVisibleCreateCommunity] = useState(false);
    const handleCreatCommunity = () => {
        router.push(`/campaigns/create`)
    };
    return (
        <>
            <div className="flex-1 p-6  ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center  flex-wrap space-y-2 mb-8">
                        <div className=" ">
                            <h2 className="text-3xl font-luxury  font-bold text-gold-400 mb-2">
                                Campaign Management
                            </h2>
                            <p className="text-gray-300">
                                Create and manage your PR campaigns
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                handleCreatCommunity();
                            }}
                            className="bg-gold-500 text-white text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gold-600 flex items-center space-x-2 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Campaign</span>
                        </button>
                    </div>
                    <CampaignsLayout campaigns={campaigns} />
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
        </>
    );
}
