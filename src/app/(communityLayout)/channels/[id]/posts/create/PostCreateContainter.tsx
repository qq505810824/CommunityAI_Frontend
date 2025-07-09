'use client';

import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { UploadFilesToAzure } from '@/app/components/forms/run-batch';
import { useAppContext } from '@/context/app-context';
import useAlert from '@/hooks/useAlert';
import { usePostOperations } from '@/hooks/usePostData';
import { PostModel } from '@/models/Post';
import _ from 'lodash';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostCreateView from './PostCreateView';

export default function PostCreateContainter() {
    const params = useParams();
    // const { data, isLoading, isError, mutate } = useChannelData({ community_id: params['id'] });
    const { activeTab, setActiveTab } = useAppDetailContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addPost } = usePostOperations();
    const [product, setProduct] = useState<PostModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { user_id } = useAppContext();
    const { setAlert } = useAlert();


    useEffect(() => {
        if (params) {
            // mutate()
        }
    }, [params]);

    const handleSubmit = async (formData: PostModel) => {
        setSubmitting(true);
        const communityId = searchParams.get('community_id');
        let upload_file_urls = '';
        if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
            upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        }
        const newFormData = {
            ...formData,
            files_url: upload_file_urls,
            owner: user_id,
            channel: params['id'] as any,
            community: communityId ? (communityId as any) : undefined
        };

        // console.log('newFormData', newFormData);
        try {
            const { data, error } = await addPost(_.omit(newFormData, 'uploadFiles'));
            if (error) {
                console.error('發佈錯誤:', error);
                setAlert({
                    title: 'Error',
                    type: 'error'
                });
            } else {
                router.push(`/communitys/${communityId}?activeTab=channel-detail&channel_id=${params['id']}`);
                setAlert({
                    title: 'Successful',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: 'Error',
                type: 'error'
            });
            console.error('發佈錯誤！:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <PostCreateView
                {...{
                    product,
                    submitting,
                    setSubmitting,
                    handleSubmit
                }}
            />
        </>
    );
}
