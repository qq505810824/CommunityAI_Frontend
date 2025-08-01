import NetworkLayoutView from '@/app/components/community/networks/NetworkLayoutView';
import { CommunityModel } from '@/models/Community';
import { useState } from 'react';
interface ViewProps {
    handleRefresh: () => void;
    communities: CommunityModel[];
}

export default function NetworkView({ handleRefresh, communities }: ViewProps) {
    const [visibleCreateCommunity, setVisibleCreateCommunity] = useState(false);
    const handleCreatCommunity = () => {
        setVisibleCreateCommunity(true);
    };
    return (
        <>
            <div className="flex-1 p-6  ">
                <div className="max-w-7xl mx-auto">
                    <NetworkLayoutView />
                </div>
            </div>
        </>
    );
}
