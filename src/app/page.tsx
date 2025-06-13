'use client';
import {
    faBell,
    faChartLine,
    faHandshake,
    faStar,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

export default function index() {
    return (
        <>
            <div className="bg-gray-900 text-white font- sans h-full">
                <nav className="bg-gray-800 border-b border-gold-400/20 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space- x-4">
                            <div className="text-2xl font-luxury font- bold text-gold-400">
                                Nexus Elite
                            </div>
                            <div className="hidden md:flex space-x-6 ml-8">
                                <button
                                    onClick={() => {}}
                                    className="nav-link text-white hover:text-gold-400 transition-colors"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => {}}
                                    className="nav-link text-gray-300 hover:text-gold-400 transition-colors"
                                >
                                    Marketplace
                                </button>
                                <button
                                    onClick={() => {}}
                                    className="nav-link text-gray-300 hover:text-gold-400 transition-colors"
                                >
                                    Events
                                </button>
                                <button
                                    onClick={() => {}}
                                    className="nav-link text-gray-300 hover:text-gold-400 transition-colors"
                                >
                                    Legacy
                                </button>
                                <button
                                    onClick={() => {}}
                                    className="nav-link text-gray-300 hover:text-gold-400 transition-colors"
                                >
                                    Messages
                                </button>
                            </div>{' '}
                        </div>
                        <div className="flex items-center space- x-4">
                            <div className="relative">
                                <FontAwesomeIcon icon={faBell} className="text-gold-400 text-2xl" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br ml-4 from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                                <span className="text-gray-900 font- semibold">JD</span>
                            </div>{' '}
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-6 py-8">
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
                                        <FontAwesomeIcon
                                            icon={faChartLine}
                                            className="text-2xl"
                                        />{' '}
                                    </div>
                                    <div className="text-green-400 text- sm"> +12.5%</div>
                                </div>
                                <div className="text-3xl font-bold text- white mb-1">$2.8M</div>
                                <div className="text-gray-400 text- sm">Network Value</div>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-gold-400">
                                        <FontAwesomeIcon icon={faUser} className="text-2xl" />{' '}
                                    </div>
                                    <div className="text-green-400 text- sm"> +8.2%</div>
                                </div>
                                <div className="text-3xl font-bold text- white mb-1">847</div>
                                <div className="text-gray-400 text- sm">Active Connections</div>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-gold-400">
                                        {' '}
                                        <FontAwesomeIcon icon={faStar} className=" text-2xl" />{' '}
                                    </div>
                                    <div className="text-yellow-400 text-sm">→ Stable</div>
                                </div>
                                <div className="text-3xl font-bold text- white mb-1">94</div>
                                <div className="text-gray-400 text- sm">Influence Score</div>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-6 card-hover border border-gold-400/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-gold-400">
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faHandshake}
                                            className=" text-2xl"
                                        />{' '}
                                    </div>
                                    <div className="text-green-400 text- sm"> +15.3%</div>
                                </div>
                                <div className="text-3xl font-bold text- white mb-1">23</div>
                                <div className="text-gray-400 text- sm">New Introductions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
