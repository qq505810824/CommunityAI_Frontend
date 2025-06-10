'use client';

import { AccountModel } from '@/models/Account';
import type { LangGeniusVersionResponse } from '@/models/common';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { FC, ReactNode } from 'react';
import { createRef, useEffect, useRef, useState } from 'react';
import { createContext, useContext, useContextSelector } from 'use-context-selector';

export type AppContextValue = {
    tags?: any;
    user_id: any;
    userProfile: AccountModel | null;
    pageContainerRef: React.RefObject<HTMLDivElement>;
    langeniusVersionInfo?: LangGeniusVersionResponse;
    useSelector: typeof useSelector;
};

const initialLangeniusVersionInfo = {
    current_env: '',
    current_version: '',
    latest_version: '',
    release_date: '',
    release_notes: '',
    version: '',
    can_auto_update: false
};

const AppContext = createContext<AppContextValue>({
    tags: [],
    user_id: 0,
    userProfile: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        nickname: '',
        created_at: ''
    },
    pageContainerRef: createRef(),
    langeniusVersionInfo: initialLangeniusVersionInfo,
    useSelector
});

export function useSelector<T>(selector: (value: AppContextValue) => T): T {
    return useContextSelector(AppContext, selector);
}

export type AppContextProviderProps = {
    children: ReactNode;
};

export async function getIpLocation() {
    // const res = await fetch('https://ip-api.com/json/');
    // const data = await res.json();
    // // data.country, data.regionName, data.city 等字段
    // return data;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const supabase = createClientComponentClient();

    const pageContainerRef = useRef<HTMLDivElement>(null);
    const [userProfile, setUserProfile] = useState<AccountModel | null>(null);
    const user_id = localStorage.getItem('user_id');

    useEffect(() => { }, []);

    useEffect(() => {
        // 从本地存储中获取用户信息
        const storedAccount = localStorage.getItem('account');
        let account = null;
        if (storedAccount) {
            account = JSON.parse(storedAccount);
            setUserProfile(account);
        } else {
            supabase.auth.getUser().then(async ({ data: { user } }) => {
                if (user) {
                    const { data: accountData, error } = await supabase
                        .from('account')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (error) {
                        console.error('Error fetching account data:', error);
                    } else if (accountData) {
                        setUserProfile(accountData);
                        localStorage.setItem('account', JSON.stringify(accountData));
                    }
                }
            });
        }

        // 实时监听用户信息更新
        // const realtime = supabase
        //     .channel('user-updates')
        //     .on(
        //         'postgres_changes',
        //         {
        //             event: 'UPDATE',
        //             schema: 'public',
        //             table: 'account',
        //             filter: `id=eq.${account?.id}`
        //         },
        //         (payload) => {
        //             const accountData = payload.new;
        //             // console.log('new', accountData);
        //             // 确保accountData符合AccountModel类型
        //             if (
        //                 accountData &&
        //                 'id' in accountData &&
        //                 'email' in accountData &&
        //                 'name' in accountData &&
        //                 'avatar' in accountData
        //             ) {
        //                 setUserProfile(accountData as AccountModel);
        //             } else {
        //                 console.error(
        //                     'Received account data does not match AccountModel:',
        //                     accountData
        //                 );
        //             }
        //             localStorage.setItem('account', JSON.stringify(accountData));
        //         }
        //     )
        //     .subscribe();
        // return () => {
        //     realtime.unsubscribe();
        // };
    }, []);

    // if (!userProfile) return <Loading type="app" />;

    return (
        <AppContext.Provider
            value={{
                user_id,
                userProfile,
                pageContainerRef,
                useSelector
            }}
        >
            <div className="flex flex-col h-full overflow-y-auto">
                {/* {globalThis.document?.body?.getAttribute('data-public-maintenance-notice') && <MaintenanceNotice />} */}
                <div
                    ref={pageContainerRef}
                    className="grow   flex flex-col overflow-y-auto overflow-x-hidden bg-gray-100"
                >
                    {children}
                </div>
            </div>
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
