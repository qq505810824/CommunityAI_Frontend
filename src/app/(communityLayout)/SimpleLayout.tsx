'use client';

import * as React from 'react';

import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import HeaderView from '../components/community/header';
import Sidebar from '../components/community/sidebar';

function SimpleLayout(props: { children: React.ReactNode }) {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', paddingBottom: 4 }}>
                <HeaderView />
                <div className="w-full flex   h-full ">
                    <Sidebar />
                    <div className="w-full h-full overflow-y-auto bg-gray-50 pb-12">
                        {props.children}
                    </div>
                </div>
            </Box>
        </CssVarsProvider>
    );
}

export default SimpleLayout;
