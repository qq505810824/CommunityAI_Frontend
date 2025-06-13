import BackView from '@/app/components/base/back/BackView';
import BooksEditForm from '@/app/components/books/edit/form';
import { BookModel } from '@/models/Book';

interface ViewProps {
    product: BookModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    handleSubmit: (formData: BookModel) => void;
}

function BooksCreateView(props: ViewProps) {
    const { product, submitting, setSubmitting, handleSubmit } = props;
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView title="Back" name="新增教材" />
                    <BooksEditForm
                        {...{
                            product,
                            submitting,
                            setSubmitting,
                            submit: handleSubmit
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default BooksCreateView;
