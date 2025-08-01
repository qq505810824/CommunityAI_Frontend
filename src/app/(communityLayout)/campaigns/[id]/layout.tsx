import { ReactNode } from 'react';
import { AppDetailContextProvider } from './detail-context';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <AppDetailContextProvider>{children}</AppDetailContextProvider>
        </>
    );
};
export default Layout;
