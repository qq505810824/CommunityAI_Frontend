'use client';

import Loading from '@/app/components/base/loading';
import type { LangGeniusVersionResponse, UserProfileResponse } from '@/models/common';

import type { FC, ReactNode } from 'react';
import { createRef, useRef, useState } from 'react';
import { createContext, useContext, useContextSelector } from 'use-context-selector';

export type AppContextValue = {
    tags?: any;
    userProfile: UserProfileResponse;
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
    userProfile: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        is_password_set: false
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

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const pageContainerRef = useRef<HTMLDivElement>(null);
    const [userProfile] = useState({
        id: '',
        name: '',
        email: '',
        avatar: '',
        is_password_set: false
    });

    // const { data: tags, mutate: mutateApps } = useSWR(
    //     { url: '/api/v1/tags', params: { page: 1, limit: 30, name: '' } },
    //     getTags
    // );
    // const { data: userProfileResponse, mutate: mutateUserProfile } = useSWR({ url: '/account/profile', params: {} }, fetchUserProfile)
    // const { data: currentWorkspaceResponse, mutate: mutateCurrentWorkspace } = useSWR({ url: '/workspaces/current', params: {} }, fetchCurrentWorkspace)

    // const [userProfile, setUserProfile] = useState<UserProfileResponse>()
    // const [langeniusVersionInfo, setLangeniusVersionInfo] = useState<LangGeniusVersionResponse>(
    //     initialLangeniusVersionInfo
    // );
    // const [currentWorkspace, setCurrentWorkspace] = useState<ICurrentWorkspace>(initialWorkspaceInfo)
    // const isCurrentWorkspaceManager = useMemo(() => ['owner', 'admin'].includes(currentWorkspace.role), [currentWorkspace.role])
    // const isCurrentWorkspaceOwner = useMemo(() => currentWorkspace.role === 'owner', [currentWorkspace.role])
    // const updateUserProfileAndVersion = useCallback(async () => {
    //     if (userProfileResponse && !userProfileResponse.bodyUsed) {
    //         const result = await userProfileResponse.json()
    //         setUserProfile(result)
    //         localStorage.setItem('user_id', result.id)
    //         const current_version = userProfileResponse.headers.get('x-version')
    //         const current_env = process.env.NODE_ENV === 'development' ? 'DEVELOPMENT' : userProfileResponse.headers.get('x-env')
    //         const versionData = await fetchLanggeniusVersion({ url: '/version', params: { current_version } })
    //         setLangeniusVersionInfo({ ...versionData, current_version, latest_version: versionData.version, current_env })
    //     }
    // }, [userProfileResponse])

    // useEffect(() => {
    //     updateUserProfileAndVersion()
    // }, [updateUserProfileAndVersion, userProfileResponse])

    // useEffect(() => {
    //     if (currentWorkspaceResponse)
    //         setCurrentWorkspace(currentWorkspaceResponse)
    // }, [currentWorkspaceResponse])

    // useEffect(() => {
    //     if (tags) {
    //         console.log('tags', tags);
    //     }
    // }, [tags]);

    if (!userProfile) return <Loading type="app" />;

    return (
        <AppContext.Provider
            value={{
                userProfile,
                pageContainerRef,
                useSelector
            }}
        >
            <div className="flex flex-col h-full overflow-y-auto">
                {/* {globalThis.document?.body?.getAttribute('data-public-maintenance-notice') && <MaintenanceNotice />} */}
                <div
                    ref={pageContainerRef}
                    className="grow relative flex flex-col overflow-y-auto overflow-x-hidden bg-gray-100"
                >
                    {children}
                </div>
            </div>
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
