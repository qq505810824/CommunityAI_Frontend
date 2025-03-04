import type { FC } from 'react';
import React from 'react';

const Layout: FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return <div className="min-w-[300px] h-full pb-[env(safe-area-inset-bottom)]">{children}</div>;
};

export default Layout;
