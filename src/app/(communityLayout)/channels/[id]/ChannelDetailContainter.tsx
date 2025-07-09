'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useChannelDetailData } from '@/hooks/useChannelData';
import { usePostData } from '@/hooks/usePostData';
import { ChannelModel } from '@/models/Channel';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChannelDetailView from './ChannelDetailView';

interface ViewProps {
    meta?: any;
}

export default function ChannelDetailContainter({ meta }: ViewProps) {
    const [channel, setChannel] = useState<ChannelModel>();
    const { user_id } = useAppContext();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<any>({
        channel_id: '',
        account_id: user_id
    });
    const { data: channelData, isLoading: channelLoading, mutate: channelMutate } = useChannelDetailData(
        meta?.channel?.id || searchParams.get('channel_id'),
        user_id
    );
    const { data, isLoading, isError, mutate } = usePostData(filters);

    useEffect(() => {
        if (meta && channelData) {
            // console.log('meta', meta);
            setFilters({
                ...filters,
                channel_id: meta?.channel?.id
            });
            setChannel(channelData || meta?.channel);
        }
    }, [meta, channelData]);


    useEffect(() => {
        if (!meta && searchParams.get('channel_id') && channelData) {
            // console.log('meta', meta);
            setFilters({
                ...filters,
                channel_id: searchParams.get('channel_id')
            });
            setChannel(channelData);
        }
    }, [channelData, searchParams]);

    useEffect(() => {
        if (data) {
            // console.log('post data', data);
        }
    }, [data]);

    useEffect(() => {
        if (channelData) {
            // console.log('channel data', channelData);
        }
    }, [channelData]);

    useEffect(() => {
        if (filters) {
            // mutate();
        }
    }, [filters]);

    const handleRefresh = () => {
        channelMutate();
        mutate();
    };

    if (isLoading || channelLoading) return <Loading type="app" />;
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
