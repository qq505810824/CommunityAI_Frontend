import BreadcrumbsView from '@/app/components/admin/Breadcrumbs';

interface ViewProps {
    data?: any;
}

function AdminView(props: ViewProps) {
    return (
        <>
            <BreadcrumbsView />
            {/* <PromptContainer /> */}
        </>
    );
}

export default AdminView;
