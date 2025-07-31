import {
    ArrowLeft,
    Calendar as CalendarIcon,
    Clock,
    ExternalLink,
    Globe,
    MapPin,
    Share2,
    Target,
    User,
    Users
} from 'lucide-react';
import { useState } from 'react';
import { useAppDetailContext } from '../../communitys/[id]/detail-context';

export default function EventDetailView() {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const { activeTab, setActiveTab } = useAppDetailContext();

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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() =>
                            setActiveTab({
                                name: 'events'
                            })
                        }
                        className="p-2  rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5 hover:text-gold-100" />
                    </button>
                    <div>
                        <h3 className="text-xl font-semibold">{selectedEvent?.title}</h3>
                        <p className="text-gray-400 text-sm">Hosted by {selectedEvent?.host}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Register Now
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Event Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-lg p-6 mb-6">
                        <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-6">
                            <CalendarIcon className="w-16 h-16 text-green-500" />
                        </div>

                        <h4 className="font-semibold text-lg mb-4">About This Event</h4>
                        <p className="text-gray-400 mb-6">{selectedEvent?.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Date & Time</div>
                                        <div className="text-sm text-gray-600">
                                            {new Date(selectedEvent?.date).toLocaleDateString()} at{' '}
                                            {selectedEvent?.time}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Duration</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedEvent?.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    {selectedEvent?.format === 'virtual' ? (
                                        <Globe className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <MapPin className="w-5 h-5 text-gray-500" />
                                    )}
                                    <div>
                                        <div className="font-medium">Location</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedEvent?.format === 'virtual'
                                                ? 'Virtual Event'
                                                : selectedEvent?.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Users className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Capacity</div>
                                        <div className="text-sm text-gray-600">
                                            {selectedEvent?.registered}/{selectedEvent?.capacity}{' '}
                                            registered
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h4 className="font-semibold text-lg mb-4">What You'll Learn</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>
                                    Advanced strategies and techniques from industry experts
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Practical tips you can implement immediately</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Network with like-minded professionals</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Q&A session with the host and other experts</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Event Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white border rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {selectedEvent?.price === 0 ? 'Free' : `$${selectedEvent?.price}`}
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${selectedEvent?.status === 'upcoming'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {selectedEvent?.status}
                            </span>
                        </div>

                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium mb-4">
                            {selectedEvent?.status === 'upcoming'
                                ? 'Register Now'
                                : 'View Recording'}
                        </button>

                        {selectedEvent?.format === 'virtual' && selectedEvent?.link && (
                            <button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50 flex items-center justify-center space-x-2">
                                <ExternalLink className="w-4 h-4" />
                                <span>Join Event</span>
                            </button>
                        )}
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h5 className="font-semibold mb-4">Event Details</h5>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Category</span>
                                <span className="font-medium">{selectedEvent?.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Host</span>
                                <span className="font-medium">{selectedEvent?.host}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Registered</span>
                                <span className="font-medium">
                                    {selectedEvent?.registered} people
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Spots Left</span>
                                <span className="font-medium">
                                    {selectedEvent?.capacity - selectedEvent?.registered}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h5 className="font-semibold mb-4">Recent Attendees</h5>
                        <div className="space-y-3">
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <span className="text-sm">Member {index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
