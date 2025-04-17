import BreadcrumbsView from '@/app/components/admin/Breadcrumbs';
import PromptContainer from './prompts/PromptContainer';

interface ViewProps {
    data?: any;
}

function AdminView(props: ViewProps) {
    return (
        <>
            <BreadcrumbsView />
            <PromptContainer />
        </>
    );
}

export default AdminView;
