import { CalendarModel } from '@/hooks/useCalendarData';

interface ViewProps {
    product?: CalendarModel;
}

export default function ReferenceFormView(props: ViewProps) {
    const { product } = props;

    return (
        <>
            {product?.form_url && (
                <div className="my-4">
                    <p className="text-md font-semibold">相關表單:</p>
                    <iframe src={product?.form_url} width="100%" height="800">
                        正在加載...
                    </iframe>
                </div>
            )}
        </>
    );
}
