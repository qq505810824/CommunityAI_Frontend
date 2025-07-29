import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CalendarEditForm from '@/app/components/calendar/edit/form';
import { CalendarModel } from '@/models/Calendar';
import { ArrowLeft } from 'lucide-react';

interface ViewProps {
    product: CalendarModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    handleSubmit: (formData: CalendarModel) => void;
}

export default function EventCreateView(props: ViewProps) {
    const { product, submitting, setSubmitting, handleSubmit } = props;

    const router = useRouter();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    return (
        <>
            <div className="flex-1  bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => {

                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </div>
                    <CalendarEditForm
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
