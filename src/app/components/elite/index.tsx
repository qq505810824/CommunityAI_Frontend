'use client';
import { useState } from 'react';
import DashboardView from './DashboardView';
import EventsView from './EventsView';
import HeaderView from './HeaderView';
import LegacyView from './LegacyView';
import MarketplaceView from './MarketplaceView';
import MessagingView from './MessagingView';
import './style.css';

export default function NexusEliteView(props: any) {
    const [section, setSection] = useState('dashboard');

    const links = [
        { label: 'Dashboard', href: 'dashboard' },
        { label: 'Marketplace', href: 'marketplace' },
        { label: 'Events', href: 'events' },
        { label: 'Legacy', href: 'legacy' },
        { label: 'Messages', href: 'messages' }
    ];

    return (
        <>
            <div className="bg-gray-900 text-white font-sans h-full overflow-y-auto pb-4 mb-4 min-h-screen flex flex-col pt-16 md:pt-16">
                <HeaderView
                    {...{
                        title: 'Nexus Elite',
                        links,
                        section,
                        setSection
                    }}
                />
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {section == 'dashboard' && <DashboardView />}
                    {section == 'marketplace' && <MarketplaceView />}
                    {section == 'events' && <EventsView />}
                    {section == 'legacy' && <LegacyView />}
                    {section == 'messages' && <MessagingView />}
                </div>
            </div>
        </>
    );
}
