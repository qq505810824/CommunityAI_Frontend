'use client';

import * as React from 'react';

import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import GoldHeaderView from '../components/community/header/GoldHeaderView';

function SimpleLayout(props: { children: React.ReactNode }) {

    const [section, setSection] = React.useState('dashboard');

    const links = [
        { label: 'Community', href: '/' },
        { label: 'Campaign', href: '/campaigns' },
        { label: 'Network Portfolio', href: '/networks' },
    ];

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100dvh',
                    paddingBottom: 2
                }}
            >
                {/* <HeaderView /> */}

                <GoldHeaderView
                    {...{
                        title: 'AIIcon Ultra',
                        links,
                        section,
                        setSection
                    }}
                />
                <div className="w-full flex   h-full ">
                    {/* <Sidebar /> */}
                    <div className="w-full h-full overflow-y-auto text-white bg-gray-900 pb-12">
                        {props.children}
                    </div>
                </div>
            </Box>
        </CssVarsProvider>
    );
}

export default SimpleLayout;
