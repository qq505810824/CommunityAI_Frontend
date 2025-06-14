import { faChartLine, faHandshake, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChartsAndInsightsView from './ChartsAndInsightsView';
import RecentView from './RecentView';
export default function DashboardView(props: any) {
    return (
        <>
            <div id="dashboard" className="section">
                <div className="mb-8">
                    <h1 className="text-4xl font-luxury font- bold text-gold-400 mb-2">
                        Network Portfolio
                    </h1>
                    <p className="text-gray-300">
                        Transform your connections into measurable, inheritable assets
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                {' '}
                                <FontAwesomeIcon icon={faChartLine} className="text-2xl" />{' '}
                            </div>
                            <div className="text-green-400 text-sm"> +12.5%</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">$2.8M</div>
                        <div className="text-gray-400 text- sm">Network Value</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                <FontAwesomeIcon icon={faUser} className="text-2xl" />{' '}
                            </div>
                            <div className="text-green-400 text-sm"> +8.2%</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">847</div>
                        <div className="text-gray-400 text-sm">Active Connections</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                {' '}
                                <FontAwesomeIcon icon={faStar} className=" text-2xl" />{' '}
                            </div>
                            <div className="text-yellow-400 text-sm">→ Stable</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">94</div>
                        <div className="text-gray-400 text-sm">Influence Score</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gold-400">
                                {' '}
                                <FontAwesomeIcon icon={faHandshake} className=" text-2xl" />{' '}
                            </div>
                            <div className="text-green-400 text-sm"> +15.3%</div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">23</div>
                        <div className="text-gray-400 text-sm">New Introductions</div>
                    </div>
                </div>

                <ChartsAndInsightsView />
                <RecentView />
            </div>
        </>
    );
}
