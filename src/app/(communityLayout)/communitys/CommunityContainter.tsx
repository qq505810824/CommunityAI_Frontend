'use client';

import Loading from '@/app/components/base/loading';
import { useCommunityData } from '@/hooks/useCommunityData';
import CommunityView from './CommunitysView';

export default function CommunityContainter() {
    const { data, isLoading, isError, mutate } = useCommunityData();
    const handleRefresh = () => {
        mutate();
    };
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <CommunityView
                {...{
                    handleRefresh,
                    communities: data
                }}
            />
        </>
    );
}
