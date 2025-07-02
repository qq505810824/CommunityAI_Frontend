'use client';

import { useChannelData } from '@/hooks/useChannelData';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import ChannelView from './ChannelView';

export default function ChannelContainter() {
    const params = useParams();
    const { data, isLoading, isError, mutate } = useChannelData({ community_id: params['id'] });

    useEffect(() => {
        if (params) {
            // mutate()
        }
    }, [params]);

    return (
        <>
            <ChannelView
                {...{
                    channels: data
                }}
            />
        </>
    );
}
