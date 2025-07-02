
import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useCalendarData } from '@/hooks/useCalendarData';
import {
    Calendar as CalendarIcon,
    Clock,
    Globe,
    MapPin,
    Plus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function EventsView() {
    const router = useRouter()

    const { activeTab, setActiveTab } = useAppDetailContext()
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const [filters, setFilters] = useState<any>({
        keyword: '',
        category: '',
        order: 'created_at',
        direction: 'desc',
        status: 'success',
        region: ''
    });

    const { data, isLoading, isError, mutate } = useCalendarData({ ...filters });

    const events = [
        {
            id: 1,
            title: 'Monthly SEO Masterclass',
            description:
                'Deep dive into the latest SEO trends and algorithm updates. Interactive Q&A session included.',
            date: '2025-07-15',
            time: '14:00',
            duration: '2 hours',
            format: 'virtual',
            link: 'https://zoom.us/j/123456789',
            capacity: 100,
            registered: 67,
            price: 29,
            tier: 'all',
            host: 'Sarah Chen',
            status: 'upcoming',
            category: 'Workshop'
        },
        {
            id: 2,
            title: 'Content Creation Workshop',
            description: 'Learn to create engaging content that drives traffic and conversions.',
            date: '2025-07-20',
            time: '16:00',
            duration: '3 hours',
            format: 'virtual',
            link: 'https://meet.google.com/xyz-abc-def',
            capacity: 50,
            registered: 23,
            price: 0,
            tier: 'premium',
            host: 'Anna Smith',
            status: 'upcoming',
            category: 'Training'
        },
        {
            id: 3,
            title: 'Marketing Strategy Bootcamp',
            description:
                'Intensive 1-day bootcamp covering complete marketing strategy development.',
            date: '2025-07-25',
            time: '09:00',
            duration: '8 hours',
            format: 'in-person',
            location: 'San Francisco, CA',
            capacity: 30,
            registered: 28,
            price: 199,
            tier: 'all',
            host: 'Mike Rodriguez',
            status: 'upcoming',
            category: 'Bootcamp'
        },
        {
            id: 4,
            title: 'Q&A: Ask the Experts',
            description:
                'Monthly Q&A session where you can ask our experts anything about marketing.',
            date: '2025-06-28',
            time: '18:00',
            duration: '1 hour',
            format: 'virtual',
            link: 'https://zoom.us/j/987654321',
            capacity: 200,
            registered: 189,
            price: 0,
            tier: 'all',
            host: 'Community Team',
            status: 'completed',
            category: 'Q&A'
        }
    ];

    const handleClickEvent = (event: any) => {
        router.push(`/events/${event?.id}`)
    }

    const handleCreatEvent = () => {
        router.push(`/events/create`)
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">Events</h3>
                    <p className="text-gray-600 text-sm">
                        Virtual and in-person events for community members
                    </p>
                </div>
                <button
                    onClick={() => {
                        handleCreatEvent()
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Event</span>
                </button>
            </div>

            {/* Event Filters */}
            <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
                    All Events
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                    Upcoming
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                    My Events
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                    Past Events
                </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => {
                            // handleClickEvent(event)
                            setSelectedEvent(event);
                            setActiveTab({ name: 'event-detail' });
                        }}
                        className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {event.description}
                                </p>

                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>
                                            {new Date(event.date).toLocaleDateString()} at{' '}
                                            {event.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{event.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {event.format === 'virtual' ? (
                                            <>
                                                <Globe className="w-4 h-4" />
                                                <span>Virtual Event</span>
                                            </>
                                        ) : (
                                            <>
                                                <MapPin className="w-4 h-4" />
                                                <span>{event.location}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="ml-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${event.status === 'upcoming'
                                        ? 'bg-green-100 text-green-700'
                                        : event.status === 'completed'
                                            ? 'bg-gray-100 text-gray-700'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}
                                >
                                    {event.status}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>
                                    {event.registered}/{event.capacity} registered
                                </span>
                                <span>by {event.host}</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                {event.price > 0 && (
                                    <span className="font-bold text-green-600">${event.price}</span>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle registration
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm ${event.status === 'upcoming'
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={event.status !== 'upcoming'}
                                >
                                    {event.status === 'upcoming' ? 'Register' : 'View Details'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}