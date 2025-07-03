'use client';

import Loading from '@/app/components/base/loading';
import { usePostData } from '@/hooks/usePostData';
import { ChannelModel } from '@/models/Channel';
import { useEffect, useState } from 'react';
import ChannelDetailView from './ChannelDetailView';

interface ViewProps {
    meta?: any;
}

export default function ChannelDetailContainter({ meta }: ViewProps) {
    const [channel, setChannel] = useState<ChannelModel>();

    const [filters, setFilters] = useState<any>({
        channel_id: ''
    });
    const { data, isLoading, isError, mutate } = usePostData(filters);

    useEffect(() => {
        if (meta) {
            // console.log('meta', meta);
            setFilters({
                ...filters,
                channel_id: meta?.channel?.id
            });
            setChannel(meta?.channel);
        }
    }, [meta]);

    useEffect(() => {
        if (filters) {
            mutate();
        }
    }, [filters]);

    const handleRefresh = () => {
        mutate();
    };

    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <ChannelDetailView
                {...{
                    channel,
                    posts: data,
                    handleRefresh
                }}
            />
        </>
    );
}
