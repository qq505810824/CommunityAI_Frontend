import { CalendarModel } from '@/hooks/useCalendarData';
import PdfView from '../../common/Widget/PdfView';

interface ViewProps {
    product?: CalendarModel;
}

export default function ReferenceFilesView(props: ViewProps) {
    const { product } = props;

    return (
        <>
            {product?.files_url && (
                <div className="my-4">
                    <p className="text-md font-semibold">相關文件:</p>
                    {product?.files_url
                        ?.split(',')
                        .map((url, index) => <PdfView key={index} content={url} />)}
                </div>
            )}
        </>
    );
}
