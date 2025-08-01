import CampaignEditForm from '@/app/components/community/campaigns/edit/form';
import { CampaignModel } from '@/models/Campaign';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: CampaignModel | null;
    submitting: boolean;
    setSubmitting?: any;
    handleSubmit: (data: CampaignModel) => void;
}
export default function CampaignCreateView({
    product,
    submitting,
    setSubmitting,
    handleSubmit
}: ViewProps) {
    const router = useRouter();

    return (
        <>
            <div className="flex-1 ">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => router.back()}
                            className="p-2  rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5 hover:text-gold-400" />
                        </button>
                    </div>
                    <CampaignEditForm
                        {...{
                            product,
                            submitting,
                            setSubmitting,
                            submit: handleSubmit
                        }}
                    />
                </div>
            </div>
        </>
    );
}
