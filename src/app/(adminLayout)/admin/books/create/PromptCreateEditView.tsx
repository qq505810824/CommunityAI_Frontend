import BreadcrumbsView from '@/app/components/admin/Breadcrumbs';
import PromptEditForm from '@/app/components/admin/prompts/edit/form';
import { PromptModel } from '@/hooks/usePromptData';

interface ViewProps {
    prompt: PromptModel | null;
    handleSubmit: (formData: PromptModel) => void;
}

function PromptCreateEditView(props: ViewProps) {
    const { prompt, handleSubmit } = props;
    return (
        <>
            <BreadcrumbsView />
            <PromptEditForm
                {...{
                    prompt,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default PromptCreateEditView;
