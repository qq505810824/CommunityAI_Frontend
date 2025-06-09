import { CalendarModel } from '@/hooks/useCalendarData';
import { CalendarIcon } from '@heroicons/react/24/outline';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

interface ViewProps {
    product?: CalendarModel;
}

export default function DateView(props: ViewProps) {
    const { product } = props;

    return (
        <>
            <p className="text-sm font-semibold flex flex-row items-center text-orange-500 ">
                <CalendarIcon className="w-4 mr-2" />
                {product?.from_date} - {product?.to_date}
            </p>
            <p className="text-sm font-semibold flex flex-row items-center text-orange-500 ">
                <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: '#f97316', mr: 1 }} />
                {product?.pre_from_date} - {product?.pre_to_date}
            </p>
        </>
    );
}
