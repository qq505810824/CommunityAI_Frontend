import BackView from '@/app/components/base/back/BackView';
import FormDetailView from '@/app/components/common/Widget/form';
import { AccountModel } from '@/models/Account';
import { UserFormData } from '@/utils/formData';
import { useEffect, useState } from 'react';

interface ViewProps {
    product: AccountModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    submit: (formData: AccountModel) => void;
}

function ProfileEditView(props: ViewProps) {
    const { product, submitting, setSubmitting, submit } = props;
    const [formData, setFormData] = useState(UserFormData);
    useEffect(() => {
        if (product) {
            // console.log('product', product);
            setFormData({
                ...formData,
                form_data: product
            });
        }
    }, [product]); // 添加依赖项

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center ">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  h-full overflow-y-auto">
                    <BackView title="Back" name="" />
                    <FormDetailView
                        className={'p-4 sm:p-6 border rounded-lg'}
                        formData={formData}
                        disabled={submitting}
                        onSubmit={submit}
                    />
                </div>
            </div>
        </>
    );
}

export default ProfileEditView;
