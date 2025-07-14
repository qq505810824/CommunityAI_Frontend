'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useCommentData } from '@/hooks/useCommentData';
import { usePostDetailData } from '@/hooks/usePostData';
import { ChannelModel } from '@/models/Channel';
import { PostModel } from '@/models/Post';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChannelDetailView from './PostDetailView';

interface ViewProps {
    meta?: any;
}

export default function PostDetailContainter({ meta }: ViewProps) {
    const [post, setPost] = useState<PostModel>();
    const [channel, setChannel] = useState<ChannelModel>();
    const searchParams = useSearchParams();
    const { user_id } = useAppContext();

    const [filters, setFilters] = useState<any>({
        post_id: '',
        account_id: user_id
    });
    const {
        data: postData,
        isLoading: postLoading,
        mutate: postMutate
    } = usePostDetailData(meta?.post?.id || searchParams.get('post_id'), user_id);
    const { data, isLoading, isError, mutate } = useCommentData(filters);

    useEffect(() => {
        if (meta && postData) {
            setFilters({
                ...filters,
                post_id: meta?.post?.id
            });
            setPost(postData || meta?.post);
            setChannel(meta?.channel);
        }
    }, [meta, postData]);

    useEffect(() => {
        if (!meta && searchParams.get('post_id') && postData) {
            console.log('meta', meta);
            setFilters({
                ...filters,
                post_id: searchParams.get('post_id')
            });
            setPost(postData);
        }
    }, [postData, searchParams]);

    useEffect(() => {
        if (data) {
            // console.log('comment data', data);
        }
    }, [data]);

    useEffect(() => {
        if (postData) {
            // console.log('channel data', channelData);
        }
    }, [postData]);

    useEffect(() => {
        if (filters) {
            // mutate();
        }
    }, [filters]);

    const handleRefresh = () => {
        postMutate();
        mutate();
    };

    if (isLoading || postLoading) return <Loading type="app" />;
    return (
        <>
            <ChannelDetailView
                {...{
                    channel,
                    post,
                    comments: data,
                    handleRefresh
                }}
            />
        </>
    );
}
