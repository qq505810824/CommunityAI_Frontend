'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useCommunityData } from '@/hooks/useCommunityData';
import { useAllPostData } from '@/hooks/usePostData';
import { CommunityModel } from '@/models/Community';
import { useEffect, useState } from 'react';
import DashbordView from './DashbordView';

export default function DashbordContainer() {
    const { user_id } = useAppContext()
    const [communities, setCommunities] = useState<CommunityModel[]>([])
    const { data: logData, mutate: logmutate } = useAllPostData({ limit: 10 });


    // const { data: MyCommunityData } = useMyCommunityData({ user_id: user_id });
    // const { data, isLoading, isError, mutate } = useJoinCommunityData({ user_id: user_id });

    // useEffect(() => {
    //     // 提取 data 里的 community
    //     const joinCommunities = Array.isArray(data)
    //         ? data.map((item: any) => item.community).filter(Boolean)
    //         : [];
    //     // MyCommunityData 可能本身就是 community 数组
    //     const myCommunities = Array.isArray(MyCommunityData) ? MyCommunityData : [];

    //     // 合并并去重（按 id）
    //     const allCommunities = [...myCommunities, ...joinCommunities];
    //     const uniqueCommunities = allCommunities.filter(
    //         (c, idx, arr) => c && arr.findIndex(cc => cc.id === c.id) === idx
    //     );

    //     setCommunities(uniqueCommunities);
    // }, [data, MyCommunityData]);

    const { data, isLoading, isError, mutate } = useCommunityData()
    useEffect(() => {
        if (data) {
            setCommunities(data)
        }
    }, [data])

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
                    communities: communities
                }}
            />
        </>
    );
}
