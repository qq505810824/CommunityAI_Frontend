'use client';

import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { PromptModel, usePromptData, usePromptOperations } from '@/hooks/usePromptData';
import { formatK } from '@/utils/stringUtil';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PromptView from './PromptView';

function PromptContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [prompts, setPrompts] = useState<any[]>([]);
    const { searchPrompt } = usePromptOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading: promptsLoading, isError, mutate } = usePromptData();

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return {
                    ...item,
                    tags: item.tags && JSON.parse(item.tags).slice(0, 4) || [],
                    collect: formatK(item.collect || 0),
                    focus: formatK(item.focus || 0),
                    share: formatK(item.share || 0),
                    copy: formatK(item.copy || 0),
                    created_at: moment(item.created_at).fromNow()
                };
            });
            setPrompts(newData);
        }
        return () => { };
    }, [router, data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchPrompt(value);
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: PromptModel) => {
                return {
                    ...item,
                    tags: item.tags && JSON.parse(item.tags).slice(0, 4) || [],
                    collect: formatK(item.collect || 0),
                    focus: formatK(item.focus || 0),
                    share: formatK(item.share || 0),
                    copy: formatK(item.copy || 0),
                    created_at: moment(item.created_at).fromNow()
                };
            });
            setPrompts(newData);
        }
    };

    return (
        <PromptView
            {...{
                data,
                isLoading: promptsLoading,
                prompts,
                onClose: mutate,
                handleSearch,
                searching
            }}
        />
    );
}

export default PromptContainer;
