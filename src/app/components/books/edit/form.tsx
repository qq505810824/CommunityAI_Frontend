import { BookFormData, BookModel } from '@/models/Book';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import FormDetailView from '../../common/Widget/form';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ViewProps {
    product: BookModel | null;
    submitting?: boolean;
    submit: (formData: BookModel) => void;
}

function BooksEditForm(props: ViewProps) {
    const { product, submitting, submit } = props;

    const [formData, setFormData] = useState(BookFormData);
    useEffect(() => {
        if (product) {
            console.log('product', product);
            setFormData({
                ...formData,
                form_data: product
            })

        }
    }, [product]); // 添加依赖项

    useEffect(() => {

    }, []);

    return (
        <>
            <FormDetailView
                formData={formData}
                disabled={submitting}
                onSubmit={submit}
            />
        </>
    );
}

export default BooksEditForm;
