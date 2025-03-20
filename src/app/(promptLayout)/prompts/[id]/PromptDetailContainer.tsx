'use client';

import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { PromptModel, usePromptDetailData } from '@/hooks/usePromptData';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PromptDetailView from './PromptDetailView';

function PromptDetailContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [prompt, setPrompts] = useState<PromptModel>();

    const { data, isLoading: categoryLoading, isError } = usePromptDetailData(Number(params['id']), user_id || '');

    useEffect(() => {
        if (data) {
            const newData = {
                ...data,
                tags: JSON.parse(data.tags) || []
            };
            setPrompts(newData);
        }
        return () => { };
    }, [router, data]);

    return (
        <PromptDetailView
            {...{
                data,
                prompt
            }}
        />
    );
}

export default PromptDetailContainer;
