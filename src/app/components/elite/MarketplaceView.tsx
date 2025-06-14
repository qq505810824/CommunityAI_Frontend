import {
    faChartBar,
    faGem,
    faGraduationCap,
    faHeartbeat,
    faPlane
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeaturedServicesView from './FeaturedServicesView';

export default function MarketplaceView(props: any) {
    return (
        <>
            <div id="marketplace" className="section">
                <div className="mb-8">
                    <h1 className="text-4xl font-luxury font-bold text-gold-400 mb-2">
                        Exclusive Marketplace
                    </h1>
                    <p className="text-gray-300">
                        Curated premium services for discerning individuals
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <button className="category-btn bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gold-400/20 text-center">
                        <FontAwesomeIcon
                            icon={faGraduationCap}
                            className="text-gold-400 text-2xl mb-2"
                        />
                        <div className="text-white text-sm">Education</div>
                    </button>
                    <button className="category-btn bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gold-400/20 text-center">
                        <FontAwesomeIcon icon={faGem} className="text-gold-400 text-2xl mb-2" />
                        <div className="text-white text-sm">Luxury</div>
                    </button>
                    <button className="category-btn bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gold-400/20 text-center">
                        <FontAwesomeIcon
                            icon={faHeartbeat}
                            className="text-gold-400 text-2xl mb-2"
                        />
                        <div className="text-white text-sm">Wellness</div>
                    </button>
                    <button className="category-btn bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gold-400/20 text-center">
                        <FontAwesomeIcon icon={faPlane} className="text-gold-400 text-2xl mb-2" />
                        <div className="text-white text-sm">Travel</div>
                    </button>
                    <button className="category-btn bg-gray-800 hover:bg-gray-700 rounded-lg p-4 border border-gold-400/20 text-center">
                        <FontAwesomeIcon
                            icon={faChartBar}
                            className="text-gold-400 text-2xl mb-2"
                        />
                        <div className="text-white text-sm">Investment</div>{' '}
                    </button>
                </div>
                <FeaturedServicesView />
            </div>
        </>
    );
}
