'use client';

import { useChannelData } from '@/hooks/useChannelData';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import PostCreateView from './PostCreateView';

export default function PostCreateContainter() {
    const params = useParams();
    const { data, isLoading, isError, mutate } = useChannelData({ community_id: params['id'] });

    useEffect(() => {
        if (params) {
            // mutate()
        }
    }, [params]);

    return (
        <>
            <PostCreateView
                {...{
                    channels: data
                }}
            />
        </>
    );
}
