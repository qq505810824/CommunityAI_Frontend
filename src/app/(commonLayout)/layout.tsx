import SwrInitor from '@/app/components/swr-initor';
import { AlertProvider } from '@/context/AlertContext';
import { LoadProvider } from '@/context/LoadContext';
import { AppContextProvider } from '@/context/app-context';
import { EventEmitterContextProvider } from '@/context/event-emitter';
import { ModalContextProvider } from '@/context/modal-context';
import type { ReactNode } from 'react';
import AlertModel from '../components/common/Widget/AlertModel';
import LoadModel from '../components/common/Widget/LoadModel';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SwrInitor>
                <AppContextProvider>
                    <EventEmitterContextProvider>
                        <AlertProvider>
                            <LoadProvider>
                                <ModalContextProvider>
                                    {/* <SimpleLayout {...{ children }} /> */}
                                    {children}
                                </ModalContextProvider>
                                <LoadModel />
                            </LoadProvider>
                            <AlertModel />
                        </AlertProvider>
                    </EventEmitterContextProvider>
                </AppContextProvider>
            </SwrInitor>
        </>
    );
};

// export const metadata = {
//     title: 'Career calendar/Outreach Calendar',
//     keywords: 'Career,calendar,Outreach,Calendar',
//     description: 'Career calendar/Outreach Calendar'
// };
export default Layout;
