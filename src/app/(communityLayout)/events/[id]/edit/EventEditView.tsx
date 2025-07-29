import CalendarEditForm from '@/app/components/calendar/edit/form';
import { CalendarModel } from '@/models/Calendar';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ViewProps {
    product: CalendarModel | null;
    submitting: boolean;
    handleSubmit: (formData: CalendarModel) => void;
}

function EventEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    const router = useRouter();
    return (
        <>
            <div className="flex-1  bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => { router.back() }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </div>
                    <CalendarEditForm
                        {...{
                            product,
                            submitting,
                            submit: handleSubmit
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default EventEditView;
