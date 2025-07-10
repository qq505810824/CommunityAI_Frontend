import BackView from '@/app/components/base/back/BackView';
import ChannelEditForm from '@/app/components/community/channels/edit/form';
import { ChannelModel } from '@/models/Channel';

interface ViewProps {
    product: ChannelModel | null;
    submitting: boolean;
    handleSubmit: (formData: ChannelModel) => void;
}

function ChannelEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    return (
        <>
            <BackView title="Back" />
            <ChannelEditForm
                {...{
                    product,
                    submitting,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default ChannelEditView;
