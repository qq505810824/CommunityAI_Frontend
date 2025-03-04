import { ReactNode } from 'react';
import { AppDetailContextProvider } from './detail-context';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <AppDetailContextProvider>{children}</AppDetailContextProvider>
        </>
    );
};

export const metadata = {
    title: 'DocAI'
};

export default Layout;
