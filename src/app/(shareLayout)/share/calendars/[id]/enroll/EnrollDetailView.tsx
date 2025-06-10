import BackView from '@/app/components/base/back/BackView';
import DateView from '@/app/components/calendar/detail/DateView';
import OperationView from '@/app/components/calendar/detail/OperationView';
import ReferenceFormView from '@/app/components/calendar/detail/ReferenceFormView';
import { CalendarModel } from '@/hooks/useCalendarData';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';

interface ViewProps {
    product: CalendarModel | undefined;
}

function EnrollDetailView(props: ViewProps) {
    const { product } = props;
    const router = useRouter();

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView
                        title="Back"
                        onClick={() => {
                            router.back();
                        }}
                    />
                    <div className="w-full  flex flex-col justify-center space-y-4   sm:space-x-8 ">
                        <div className="flex items-center justify-between space-x-2 flex-row ">
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: { xs: '22px', sm: '24px', md: '26px' }
                                }}
                            >
                                {product?.name}
                            </Typography>
                            <OperationView {...{ product }} />
                        </div>
                        <DateView {...{ product }} />
                        <ReferenceFormView {...{ product }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default EnrollDetailView;
