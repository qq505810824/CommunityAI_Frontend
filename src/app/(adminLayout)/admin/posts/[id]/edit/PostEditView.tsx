import BackView from '@/app/components/base/back/BackView';
import PostFormView from '@/app/components/community/channels/posts/form';
import { PostModel } from '@/models/Post';

interface ViewProps {
    product: PostModel | null;
    submitting: boolean;
    handleSubmit: (formData: PostModel) => void;
}

function PostEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    return (
        <>
            <BackView title="Back" />
            <PostFormView
                {...{
                    product,
                    submitting,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default PostEditView;
