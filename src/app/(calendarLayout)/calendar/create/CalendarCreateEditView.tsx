import BackView from '@/app/components/base/back/BackView';
import CalendarEditForm from '@/app/components/calendar/edit/form';
import { CalendarModel } from '@/hooks/useCalendarData';

interface ViewProps {
    product: CalendarModel | null;
    handleSubmit: (formData: CalendarModel) => void;
}

function CalendarCreateEditView(props: ViewProps) {
    const { product, handleSubmit } = props;
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView title="Back" name="新增活動" />
                    <CalendarEditForm
                        {...{
                            product,
                            submit: handleSubmit
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default CalendarCreateEditView;
