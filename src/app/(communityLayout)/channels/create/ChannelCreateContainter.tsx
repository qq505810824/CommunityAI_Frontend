'use client';

import { useAppContext } from '@/context/app-context';
import { useChannelOperations } from '@/hooks/useChannelData';
import { ChannelModel } from '@/models/Channel';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ChannelCreateView from './ChannelCreateView';

export default function ChannelCreateContainter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addChannel } = useChannelOperations();
    const [submitting, setSubmitting] = useState(false);
    const { user_id } = useAppContext();

    const handleSubmit = async (data: ChannelModel) => {
        setSubmitting(true);
        const communityId = searchParams.get('community_id');
        const res = await addChannel({
            ...data,
            owner: user_id,
            community: communityId ? (communityId as any) : undefined // Replace 'as any' with the actual CommunityModel shape if available
        });
        // console.log('res', res);
        router.push(`/communitys/${communityId}?activeTab=channels`);
    };

    return (
        <>
            <ChannelCreateView
                {...{
                    submitting,
                    handleSubmit
                }}
            />
        </>
    );
}
