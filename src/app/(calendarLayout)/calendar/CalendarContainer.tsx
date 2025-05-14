'use client';

import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { usePromptData, usePromptOperations } from '@/hooks/usePromptData';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarView from './CalendarView';

function CalendarContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);
    const { searchPrompt } = usePromptOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading: promptsLoading, isError, mutate } = usePromptData();

    useEffect(() => {
        if (data) {
            // const newData = data?.map((item) => {
            //     return {
            //         ...item,
            //         tags: (item.tags && JSON.parse(item.tags).slice(0, 4)) || [],
            //         collect: formatK(item.collect || 0),
            //         focus: formatK(item.focus || 0),
            //         share: formatK(item.share || 0),
            //         copy: formatK(item.copy || 0),
            //         created_at: moment(item.created_at).fromNow(),
            //         updated_at: moment(item.updated_at).fromNow()
            //     };
            // });
            // setProducts(newData);
        }
        return () => {};
    }, [router, data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchPrompt(value);
        setSearching(false);
        if (res.data) {
            // const newData = res.data.map((item: PromptModel) => {
            //     return {
            //         ...item,
            //         tags: (item.tags && JSON.parse(item.tags).slice(0, 4)) || [],
            //         collect: formatK(item.collect || 0),
            //         focus: formatK(item.focus || 0),
            //         share: formatK(item.share || 0),
            //         copy: formatK(item.copy || 0),
            //         created_at: moment(item.created_at).fromNow(),
            //         updated_at: moment(item.updated_at).fromNow()
            //     };
            // });
            // setPrompts(newData);
        }
    };

    return (
        <CalendarView
            {...{
                data,
                isLoading: promptsLoading,
                products,
                onClose: mutate,
                handleSearch,
                searching
            }}
        />
    );
}

export default CalendarContainer;
