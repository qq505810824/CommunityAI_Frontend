import CoursesView from '@/app/components/community/detail/CoursesView';
import EventsView from '@/app/components/community/detail/EventsView';
import TextChannelsView from '@/app/components/community/detail/TextChannelsView';
import {
    BookOpen,
    Calendar as CalendarIcon,
    Hash
} from 'lucide-react';
import { useEffect } from 'react';
import ChannelDetailContainter from '../../channels/[id]/ChannelDetailContainter';
import CourseDetailContainter from '../../courses/[id]/CourseDetailContainter';
import EventDetailContainter from '../../events/[id]/EventDetailContainter';
import { useAppDetailContext } from './detail-context';

interface ViewProps {
    community: any;
}

export default function CommunityDetailView({
    community
}: ViewProps) {

    const { activeTab, setActiveTab } = useAppDetailContext()
    // const [activeTab, setActiveTab] = useState('discussions');

    useEffect(() => {

    }, [])
    const renderActiveTab = () => {
        switch (activeTab) {
            case 'channels':
                return <TextChannelsView />;
            case 'channel-detail':
                return <ChannelDetailContainter />;
            case 'courses':
                return <CoursesView />;
            case 'course-detail':
                return <CourseDetailContainter />;
            case 'events':
                return <EventsView />;
            case 'event-detail':
                return <EventDetailContainter />;
            default:
                return <TextChannelsView />;
        }
    };
    return (
        <>
            <div className="flex-1  bg-gray-50">
                {/* Community Header */}
                <div
                    className={`bg-gradient-to-r from-${community?.theme}-500 to-${community?.theme}-600`}
                >
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                                {community?.logo}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{community?.name}</h1>
                                <p className="text-gray-500 text-opacity-90">
                                    {community?.members} members
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-black">
                            <button
                                onClick={() => setActiveTab('channels')}
                                className={`shadow-sm border  rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab.includes('channel') ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <Hash className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Channels</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('courses')}
                                className={` shadow-sm border   rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab.includes('course') ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <BookOpen className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Courses</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('events')}
                                className={` shadow-sm border  rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab.includes('event') ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <CalendarIcon className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Events</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Community Content */}
                <div className="max-w-7xl mx-auto px-6 py-8">{renderActiveTab()}</div>
            </div>
        </>
    )
}