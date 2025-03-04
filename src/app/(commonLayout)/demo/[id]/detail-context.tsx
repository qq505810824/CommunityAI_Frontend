'use client';

import { FC, ReactNode, createContext, useContext } from 'react';

export type AppContextValue = {
    appData?: any;
};

const AppDetailContext = createContext<AppContextValue>({
    appData: 'test app'
});
export type AppContextProviderProps = {
    children: ReactNode;
};

export const AppDetailContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const appData = null;
    // if (!userProfile) return <Loading type="app" />;
    // const { data: tags, mutate: mutateApps } = useSWR(
    //     { url: '/api/v1/tags', params: { page: 1, limit: 30, name: '' } },
    //     getTags
    // );

    return (
        <AppDetailContext.Provider
            value={{
                appData
            }}
        >
            <div className="flex flex-col h-full overflow-y-auto">{children}</div>
        </AppDetailContext.Provider>
    );
};

export const useAppDetailContext = () => useContext(AppDetailContext);

export default AppDetailContext;
