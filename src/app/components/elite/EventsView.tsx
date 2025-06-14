import { faCalendar, faMapMarkerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function EventsView(props: any) {
    return (
        <>
            <div id="events" className="section">
                <div className="mb-8">
                    <h1 className="text-4xl font-luxury font-bold text-gold-400 mb-2">
                        Exclusive Events
                    </h1>
                    <p className="text-gray-300">Invite-only networking experiences</p>
                </div>
                {/* <!-- Upcoming Events --> */}
                <div className="space-y-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gold-400/20 card-hover">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    Global Leadership Summit 2024
                                </h3>
                                <div className="flex items-center space-x-4 text-gray-300">
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                                        March 15-17, 2024
                                    </span>
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                        Swiss Alps
                                    </span>
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                                        120 Attendees
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <button className="bg-gold-400 hover:bg-gold-500 text-gray-900 px-6 py-3 rounded-lg font-medium">
                                    RSVP
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Three days of intensive workshops, keynotes, and networking with global
                            thought leaders. Featured speakers include Nobel laureates, Fortune 500
                            CEOs, and world- renowned entrepreneurs.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-gray-800"></div>
                                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-gray-800"></div>
                                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-gray-800"></div>{' '}
                            </div>
                            <span className="text-gray-400 text-sm">
                                89 mutual connections attending
                            </span>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gold-400/20 card-hover">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    Next-Gen Wealth Symposium
                                </h3>
                                <div className="flex items-center space-x-4 text-gray-300">
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                                        April 22, 2024
                                    </span>
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                        Manhattan, NYC
                                    </span>
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                                        45 Attendees
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <button className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-medium">
                                    Waitlist
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Intimate roundtable discussions for heirs and next-generation leaders on
                            wealth preservation, impact investing, and family governance.
                        </p>
                        <div className="flex items-center space-x-4">
                            <span className="bg-red-500 text- white text-xs px-2 py-1 rounded">
                                Exclusive
                            </span>
                            <span className="text-gray-400 text-sm">Invitation only</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
