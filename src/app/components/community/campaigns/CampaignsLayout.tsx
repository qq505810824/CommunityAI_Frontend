import { CampaignModel } from '@/models/Campaign';
import CampaignCard from './CampaignCard';

interface ViewProps {
    campaigns: CampaignModel[];
    handleRefresh?: any;
}

export default function CampaignsLayout({ campaigns, handleRefresh }: ViewProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 mb-8">
                {campaigns?.map((campaign, index) => (
                    <CampaignCard campaign={campaign} key={index} />
                ))}
            </div>
        </>
    );
}
