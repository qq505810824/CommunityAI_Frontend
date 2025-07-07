import ContentView from '@/app/components/calendar/detail/ContentView';
import DateView from '@/app/components/calendar/detail/DateView';
import OperationView from '@/app/components/calendar/detail/OperationView';
import RecommodCalendarView from '@/app/components/calendar/detail/RecommodCalendarView';
import ReferenceFilesView from '@/app/components/calendar/detail/ReferenceFilesView';
import ReferenceUrlView from '@/app/components/calendar/detail/ReferenceUrlView';

import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useAppContext } from '@/context/app-context';
import { CalendarModel } from '@/models/Calendar';
import { Typography } from '@mui/joy';
import { ArrowLeft, Bookmark, Edit, Share2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import './style.css';

interface ViewProps {
    back?: any;
    product: CalendarModel | undefined;
}

function CalendarDetailView(props: ViewProps) {
    const { back, product } = props;
    const router = useRouter();
    const { activeTab, setActiveTab } = useAppDetailContext();
    const { user_id } = useAppContext()
    const params = useParams();

    const handleClickEditEvent = () => {
        router.push(`/events/${product?.id}/edit?community_id=${params['id']}`)
    }

    const showEditButton = () => {
        return isOwner()
    }

    const isOwner = () => {
        return product?.owner?.id == user_id
    }

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    {/* <BackView
                        title="Back"
                        onClick={() => {
                            if (back) {
                                back();
                            } else {
                                router.push('/calendar');
                            }
                        }}
                    /> */}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() =>
                                    setActiveTab({
                                        name: 'events'
                                    })
                                }
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center space-x-3 ">
                            <button className="hidden p-2 hover:bg-gray-100 rounded-lg">
                                <Bookmark className="w-5 h-5" />
                            </button>
                            <button className="hidden p-2 hover:bg-gray-100 rounded-lg">
                                <Share2 className="w-5 h-5" />
                            </button>

                            {showEditButton() && <div>
                                <button
                                    onClick={() => {
                                        handleClickEditEvent()
                                    }}
                                    className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 whitespace-nowrap"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit Event</span>
                                </button>
                            </div>
                            }
                        </div>
                    </div>

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
                            <DateView {...{ product, visibleEnroll: true }} />
                            <ContentView {...{ product }} />
                            <ReferenceFilesView {...{ product }} />
                            <ReferenceUrlView {...{ product }} />
                            {/* <ReferenceFormView {...{ product }} /> */}
                        </div>
                        <div className="w-full sm:min-w-[250px] md:w-1/4 md:min-w-[300px]">
                            <img
                                src={product?.image_url}
                                className="w-full h-auto object-cover"
                                alt=""
                            />
                            <RecommodCalendarView />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarDetailView;
