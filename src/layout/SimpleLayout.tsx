'use client';

import * as React from 'react';

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';


function SimpleLayout(props: { children: React.ReactNode }) {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', height: '100dvh' }}>
                <Header />
                <Sidebar />
                {/* <AgentList /> */}
                <Box
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
                    {props.children}
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default SimpleLayout;
