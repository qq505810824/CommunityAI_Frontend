import BreadcrumbsView from '@/app/components/admin/Breadcrumbs';
import AccountEditForm from '@/app/components/admin/accounts/edit/form';
import { AccountModel } from '@/models/Account';

interface ViewProps {
    account: AccountModel | null;
    handleSubmit: (formData: AccountModel) => void;
}

function AccountEditView(props: ViewProps) {
    const { account, handleSubmit } = props;
    return (
        <>
            <BreadcrumbsView />
            <AccountEditForm
                {...{
                    account,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default AccountEditView;
