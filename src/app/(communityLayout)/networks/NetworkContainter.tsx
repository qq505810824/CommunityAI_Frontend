'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useMyCommunityData } from '@/hooks/useCommunityData';
import NetworkView from './NetworkView';

export default function NetworkContainter() {
    const { user_id } = useAppContext();
    const { data, isLoading, isError, mutate } = useMyCommunityData({ user_id: user_id });
    const handleRefresh = () => {
        mutate();
    };
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <NetworkView
                {...{
                    handleRefresh,
                    communities: data
                }}
            />
        </>
    );
}
