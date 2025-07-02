import { CommunityModel } from '@/models/Community';
import { BookOpen, Calendar as CalendarIcon, Hash } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ChannelDetailContainter from '../../channels/[id]/ChannelDetailContainter';
import ChannelContainter from '../../channels/ChannelContainter';
import CourseDetailContainter from '../../courses/[id]/CourseDetailContainter';
import CourseContainter from '../../courses/CourseContainter';
import EventDetailContainter from '../../events/[id]/EventDetailContainter';
import EventContainter from '../../events/EventContainter';
import { useAppDetailContext } from './detail-context';

interface ViewProps {
    community: CommunityModel;
}

export default function CommunityDetailView({ community }: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext();
    const searchParams = useSearchParams();
    // const [activeTab, setActiveTab] = useState('discussions');

    useEffect(() => {
        if (community) {
            // console.log('community', community);
        }
    }, [community]);

    useEffect(() => {
        const tab = searchParams?.get('activeTab');
        if (tab) {
            setActiveTab({ name: tab });
        }
        // 你可以根据需要同步 meta 等其它信息
    }, [searchParams, setActiveTab]);

    const renderActiveTab = (name?: string) => {
        switch (name || activeTab.name) {
            case 'channels':
                return <ChannelContainter />;
            case 'channel-detail':
                return <ChannelDetailContainter meta={activeTab.meta} />;
            case 'courses':
                return <CourseContainter />;
            case 'course-detail':
                return <CourseDetailContainter meta={activeTab.meta} />;
            case 'events':
                return <EventContainter />;
            case 'event-detail':
                return <EventDetailContainter />;
            default:
                return <ChannelContainter />;
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
                                <h1 className="text-xl sm:text-3xl font-bold">{community?.name}</h1>
                                <p className="text-gray-500 text-opacity-90">
                                    {community?.accounts_count} members
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-black">
                            <button
                                onClick={() => setActiveTab({ name: 'channels' })}
                                className={`shadow-sm border  rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab?.name?.includes('channel') ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <Hash className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Channels</span>
                            </button>
                            <button
                                onClick={() => setActiveTab({ name: 'courses' })}
                                className={` shadow-sm border   rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab?.name?.includes('course') ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <BookOpen className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm">Courses</span>
                            </button>
                            <button
                                onClick={() => setActiveTab({ name: 'events' })}
                                className={` shadow-sm border  rounded-lg p-4 text-center hover:bg-opacity-30 transition-colors ${activeTab?.name?.includes('event') ? 'bg-white' : 'bg-gray-100'}`}
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
    );
}
