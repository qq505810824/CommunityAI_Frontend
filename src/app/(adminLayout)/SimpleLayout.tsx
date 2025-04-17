'use client';

import * as React from 'react';

import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';

function SimpleLayout(props: { children: React.ReactNode }) {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', height: '100dvh' }}>
                <Sidebar />
                {/* <AgentList /> */}
                <div className="w-full flex flex-col flex-1">
                    <Header />
                    <div className="w-full p-2 overflow-auto flex-1">{props.children}</div>
                </div>

                {/* <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        // px: { xs: 2, md: 10 },
                        pt: 'calc(var(--Header-height))',
                        pb: { xs: 2, sm: 2, md: 3 },
                        // p: 2,
                        flex: 1,
                        // ml: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        // height: '100dvh',
                        gap: 1,
                        overflow: 'auto'
                    }}
                >
                    <Header />
                    <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                        {props.children}
                    </Box>
                </Box> */}
            </Box>
        </CssVarsProvider>
    );
}

export default SimpleLayout;
