'use client';

import useAlert from '@/hooks/useAlert';
import { HotModel } from '@/hooks/useHotData';
import useLoad from '@/hooks/useLoad';
import { PromptModel, usePromptOperations } from '@/hooks/usePromptData';
import { formatK } from '@/utils/stringUtil';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HotsView from './HotsView';

function HotsContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<HotModel[]>([]);
    const { searchPrompt } = usePromptOperations();
    const [searching, setSearching] = useState(false);
    const [category, setCategory] = useState<any>('dy');

    // const { data, isLoading: promptsLoading, isError, mutate } = usePromptData();

    // useEffect(() => {
    //     if (data) {
    //         const newData = data?.map((item) => {
    //             return {
    //                 ...item,
    //                 tags: (item.tags && JSON.parse(item.tags).slice(0, 4)) || [],
    //                 collect: formatK(item.collect || 0),
    //                 focus: formatK(item.focus || 0),
    //                 share: formatK(item.share || 0),
    //                 copy: formatK(item.copy || 0),
    //                 created_at: moment(item.created_at).fromNow(),
    //                 updated_at: moment(item.updated_at).fromNow()
    //             };
    //         });
    //         setProducts(newData);
    //     }
    //     return () => { };
    // }, [router, data]);

    useEffect(() => {
        getProducts(category);
    }, [category]);

    const getProducts = async (category: string) => {
        const res = await axios.get(`./hots/${category}.json`);
        // console.log('res', res.data.apps[0]);
        console.log('res', res.data.data.list);
        const newData = res.data.data.list?.map((item: any) => {
            return {
                ...item,
                tags: (item.tags && JSON.parse(item.tags).slice(0, 4)) || [],
                collectCount: formatK(item.collectCount || 0),
                focus: formatK(item.collectCount || 0),
                share: formatK(item.share || 0),
                copy: formatK(item.copy || 0),
                publicTime: moment(item.publicTime).format('MM-DD HH:mm')
            };
        });

        setProducts(newData);
    };

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchPrompt(value);
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: PromptModel) => {
                return {
                    ...item,
                    tags: (item.tags && JSON.parse(item.tags).slice(0, 4)) || [],
                    collect: formatK(item.collect || 0),
                    focus: formatK(item.focus || 0),
                    share: formatK(item.share || 0),
                    copy: formatK(item.copy || 0),
                    created_at: moment(item.created_at).fromNow(),
                    updated_at: moment(item.updated_at).fromNow()
                };
            });
            setProducts(newData);
        }
    };

    const refresh = () => {
        // mutate()
    };

    const changeCategory = (category: string) => {
        setCategory(category);
    };

    return (
        <HotsView
            {...{
                isLoading: false,
                products,
                onClose: refresh,
                handleSearch,
                searching,
                changeCategory
            }}
        />
    );
}

export default HotsContainer;
