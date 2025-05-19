import BackView from '@/app/components/base/back/BackView';
import CalendarEditForm from '@/app/components/calendar/edit/form';
import { CalendarModel } from '@/hooks/useCalendarData';

interface ViewProps {
    product: CalendarModel | null;
    submitting: boolean
    handleSubmit: (formData: CalendarModel) => void;
}

function CalendarEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    return (
        <>
            <BackView title='Back' />
            <CalendarEditForm
                {...{
                    product,
                    submitting,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default CalendarEditView;
