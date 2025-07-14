import FormDetailView from '@/app/components/common/Widget/form';
import { CommunityModel } from '@/models/Community';
import { CommunityFormData } from '@/utils/formData';
import { useEffect, useState } from 'react';
interface ViewProps {
    product: CommunityModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    submit: (formData: CommunityModel) => void;
}

function CommunityEditForm(props: ViewProps) {
    const { product, submitting, setSubmitting, submit } = props;
    const [formData, setFormData] = useState(CommunityFormData);
    useEffect(() => {
        if (product) {
            console.log('product', product);
            setFormData({
                ...formData,
                form_data: product
            });
        }
    }, [product]); // 添加依赖项

    const onSubmit = async (form_data: any) => {
        const data = { ...form_data };
        ['pre_from_date', 'pre_to_date'].forEach((field) => {
            if (data[field] === '') data[field] = null;
        });
        // 其它处理...
        submit(data);
    };

    return (
        <>
            <FormDetailView
                className={'p-4 sm:p-6 border rounded-lg'}
                formData={formData}
                disabled={submitting}
                onSubmit={submit}
            />
        </>
    );
}

export default CommunityEditForm;
