'use client';

import * as React from 'react';

import { Footerdemo } from '@/components/ui/footer-section';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles';
import HeaderView from '../components/prompts/HeaderView';

function SimpleLayout(props: { children: React.ReactNode }) {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
                {/* {Navbar1Demo()} */}
                <HeaderView />
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
                        // overflow: 'auto'
                    }}
                >
                    {props.children}

                </Box>
                <div className="block ">
                    <Footerdemo />
                </div>
            </Box>
        </CssVarsProvider>
    );
}

export default SimpleLayout;
