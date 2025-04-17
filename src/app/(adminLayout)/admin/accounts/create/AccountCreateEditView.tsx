import AccountEditForm from '@/app/components/admin/accounts/edit/form';
import BreadcrumbsView from '@/app/components/admin/Breadcrumbs';
import { AccountModel } from '@/models/Account';

interface ViewProps {
    account: AccountModel | null;
    handleSubmit: (formData: AccountModel) => void;
}

function AccountCreateEditView(props: ViewProps) {
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

export default AccountCreateEditView;
