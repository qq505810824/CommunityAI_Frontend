import BackView from '@/app/components/base/back/BackView';
import CommunityEditForm from '@/app/components/community/edit/form';
import { CommunityModel } from '@/models/Community';

interface ViewProps {
    product: CommunityModel | null;
    submitting: boolean;
    handleSubmit: (formData: CommunityModel) => void;
}

function CommunityEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    return (
        <>
            <BackView title="Back" />
            <CommunityEditForm
                {...{
                    product,
                    submitting,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default CommunityEditView;
