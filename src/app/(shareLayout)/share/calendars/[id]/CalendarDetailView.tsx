import ContentView from '@/app/components/calendar/detail/ContentView';
import DateView from '@/app/components/calendar/detail/DateView';
import OperationView from '@/app/components/calendar/detail/OperationView';
import ReferenceFilesView from '@/app/components/calendar/detail/ReferenceFilesView';
import ReferenceUrlView from '@/app/components/calendar/detail/ReferenceUrlView';
import { CalendarModel } from '@/hooks/useCalendarData';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import './style.css';

interface ViewProps {
    product: CalendarModel | undefined;
}

function CalendarDetailView(props: ViewProps) {
    const { product } = props;
    const router = useRouter();

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    {/* <BackView
                        title="Back"
                        onClick={() => {
                            router.push('/calendar');
                        }}
                    /> */}
                    <div className="w-full  flex flex-col sm:flex-row justify-center space-y-4   sm:space-x-8 ">
                        <div className="w-full md:w-3/4 space-y-4  overflow-x-auto">
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
                            <DateView {...{ product, visibleEnroll: true, enrollUrl: `/share/calendars/${product?.id}/enroll` }} />
                            <ContentView {...{ product }} />
                            <ReferenceFilesView {...{ product, isShare: true }} />
                            <ReferenceUrlView {...{ product }} />
                        </div>
                        <div className="w-full sm:min-w-[250px] md:w-1/4 md:min-w-[300px]">
                            <img
                                src={product?.image_url}
                                className="w-full h-auto object-cover"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarDetailView;
