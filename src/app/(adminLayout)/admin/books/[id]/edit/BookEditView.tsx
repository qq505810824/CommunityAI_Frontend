import BackView from '@/app/components/base/back/BackView';
import BooksEditForm from '@/app/components/books/edit/form';
import { BookModel } from '@/models/Book';

interface ViewProps {
    product: BookModel | null;
    submitting: boolean;
    handleSubmit: (formData: BookModel) => void;
}

function BookEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    return (
        <>
            <BackView title="Back" />
            <BooksEditForm
                {...{
                    product,
                    submitting,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default BookEditView;
