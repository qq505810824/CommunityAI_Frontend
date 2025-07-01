'use client';

import { useAppContext } from '@/context/app-context';
// import { updateTableById } from '@/apis/airtable/AirtableSchema';
import { useModalContext } from '@/context/modal-context';
import { useCalendarDetailData } from '@/hooks/useCalendarData';
import { CalendarModel } from '@/models/Calendar';
import { useParams, useRouter } from 'next/navigation';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type AppContextValue = {
    appData: CalendarModel | null;
    isShare?: boolean;
    submitting?: boolean;
    // handleUpdateTable: (data: any, columns: any) => void;
    // handleDeleteTable: (id: string, onCallback?: any) => void;
};

const AppDetailContext = createContext<AppContextValue>({
    appData: null,
    isShare: false,
    submitting: false
    // handleUpdateTable: () => {},
    // handleDeleteTable: () => {}
});

export type AppContextProviderProps = {
    share?: boolean;
    children: ReactNode;
};

export const AppDetailContextProvider: FC<AppContextProviderProps> = ({
    share = false,
    children
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const params = useParams();
    const { setShowConfirmDelete } = useModalContext();
    const [isShare, setIsShare] = useState(false);
    const { user_id } = useAppContext();
    // const { data } = useSWR(
    //     () => params['id'] ? { table_id: params['id'] } : null,
    //     getSchema,
    //     {}
    // );
    const { data, isLoading, isError } = useCalendarDetailData(Number(params['id']), user_id || '');

    const [appData, setAppData] = useState<CalendarModel | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            // console.log('appData data ', data);
            setAppData(data);
        }
    }, [data]);

    useEffect(() => {
        // if (appData) console.log('appData', appData);
    }, [appData]);

    useEffect(() => {
        setIsShare(share);
    }, [share]);

    // if (!appData) return <Loading type="app" />;

    return (
        <AppDetailContext.Provider
            value={{
                appData,
                isShare: isShare,
                submitting
            }}
        >
            <div className="flex flex-col w-full h-full overflow-y-auto">{children}</div>
        </AppDetailContext.Provider>
    );
};

export const useAppDetailContext = () => useContext(AppDetailContext);

export default AppDetailContext;
