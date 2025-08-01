import BackView from '@/app/components/base/back/BackView';
import CampaignEditForm from '@/app/components/community/campaigns/edit/form';
import { CampaignModel } from '@/models/Campaign';

interface ViewProps {
    product: CampaignModel | null;
    submitting: boolean;
    handleSubmit: (formData: CampaignModel) => void;
}

function CampaignEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    return (
        <>
            <BackView title="Back" />
            <CampaignEditForm
                {...{
                    product,
                    submitting,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default CampaignEditView;
