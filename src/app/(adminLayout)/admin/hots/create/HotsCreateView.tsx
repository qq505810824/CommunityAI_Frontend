import BreadcrumbsView from '@/app/components/admin/Breadcrumbs';
import HotsEditForm from '@/app/components/admin/hots/edit/form';
import { PromptModel } from '@/hooks/usePromptData';

interface ViewProps {
    prompt: PromptModel | null;
    handleSubmit: (formData: PromptModel) => void;
}

function HotsCreateView(props: ViewProps) {
    const { prompt, handleSubmit } = props;
    return (
        <>
            <BreadcrumbsView />
            <HotsEditForm
                {...{
                    prompt,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default HotsCreateView;
