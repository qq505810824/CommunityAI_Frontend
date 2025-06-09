import BackView from '@/app/components/base/back/BackView';
import ContentView from '@/app/components/calendar/detail/ContentView';
import DateView from '@/app/components/calendar/detail/DateView';
import OperationView from '@/app/components/calendar/detail/OperationView';
import ReferenceFilesView from '@/app/components/calendar/detail/ReferenceFilesView';
import ReferenceFormView from '@/app/components/calendar/detail/ReferenceFormView';
import ReferenceUrlView from '@/app/components/calendar/detail/ReferenceUrlView';
import { CalendarModel } from '@/hooks/useCalendarData';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import './style.css';

interface ViewProps {
    data: any;
    product: CalendarModel | undefined;
}

function CalendarDetailView(props: ViewProps) {
    const { product } = props;
    const router = useRouter();

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView
                        title="Back"
                        onClick={() => {
                            router.push('/calendar');
                        }}
                    />
                    <div className="w-full  flex flex-col sm:flex-row justify-center space-y-4   sm:space-x-8 ">
                        <div className="w-full sm:2/3 space-y-4  overflow-x-auto">
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
                            <ContentView {...{ product }} />
                            <ReferenceFilesView {...{ product }} />
                            <ReferenceFilesView {...{ product }} />
                            <ReferenceUrlView {...{ product }} />
                            <ReferenceFormView {...{ product }} />
                        </div>
                        <div className="w-full sm:1/3">
                            <img
                                src={product?.image_url}
                                className="w-[400px] h-auto object-cover"
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
