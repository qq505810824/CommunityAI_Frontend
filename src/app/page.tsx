'use client';
import {
    faBell
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import DashboardView from './components/elite/DashboardView';
import EventsView from './components/elite/EventsView';
import LegacyView from './components/elite/LegacyView';
import MarketplaceView from './components/elite/MarketplaceView';
import MessagingView from './components/elite/MessagingView';
import './style.css';

export default function index() {
    const [section, setSection] = useState('dashboard')

    const showSection = (section: string) => {
        setSection(section)
    }
    return (
        <>
            <div className="bg-gray-900 text-white font-sans h-full overflow-y-auto pb-4 mb-4">
                <nav className="bg-gray-800 border-b border-gold-400/20 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-luxury font-bold text-gold-400">
                                Nexus Elite
                            </div>
                            <div className="hidden md:flex space-x-6 ml-8">
                                <button
                                    onClick={() => { showSection('dashboard') }}
                                    className="nav-link text-white hover:text-gold-400 transition-colors"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => { showSection('marketplace') }}
                                    className="nav-link text-gray-300 hover:text-gold-400 transition-colors"
                                >
                                    Marketplace
                                </button>
                                <button
                                    onClick={() => { showSection('events') }}
                                    className="nav-link text-gray-300 hover:text-gold-400 transition-colors"
                                >
                                    Events
                                </button>
                                <button
                                    onClick={() => { showSection('legacy') }}
                                    className="nav-link text-gray-300 hover:text-gold-400 transition-colors"
                                >
                                    Legacy
                                </button>
                                <button
                                    onClick={() => { showSection('messages') }}
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
                                <span className="text-gray-900 font-semibold">JD</span>
                            </div>{' '}
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {section == 'dashboard' &&
                        <DashboardView />
                    }
                    {section == 'marketplace' &&

                        <MarketplaceView />
                    }
                    {section == 'events' &&
                        <EventsView />
                    }
                    {section == 'legacy' &&
                        <LegacyView />
                    }
                    {section == 'messages' &&
                        <MessagingView />
                    }

                </div>

            </div>
        </>
    );
}
