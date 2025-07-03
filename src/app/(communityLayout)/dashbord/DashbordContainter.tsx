'use client';

import Loading from '@/app/components/base/loading';
import { useCommunityData } from '@/hooks/useCommunityData';
import { useAllPostData } from '@/hooks/usePostData';
import { useEffect } from 'react';
import DashbordView from './DashbordView';

export default function DashbordContainer() {
    const { data, isLoading, isError, mutate } = useCommunityData();

    const { data: logData, mutate: logmutate } = useAllPostData({ limit: 10 });

    useEffect(() => {
        console.log('logData', logData);
    }, [logData]);
    const handleRefresh = () => {
        mutate();
    };
    const handleRefreshLogs = () => {
        logmutate();
    };
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <DashbordView
                {...{
                    newsfeeds: logData,
                    handleRefresh,
                    handleRefreshLogs,
                    communities: data
                }}
            />
        </>
    );
}
