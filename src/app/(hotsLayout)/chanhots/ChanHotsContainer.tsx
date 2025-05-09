'use client';

import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { usePromptOperations } from '@/hooks/usePromptData';
import { ChanHotsModel } from '@/models/ChanHots';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChanHotsView from './ChanHotsView';

function ChanHotsContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<ChanHotsModel[]>([]);
    const { searchPrompt } = usePromptOperations();
    const [searching, setSearching] = useState(false);
    const [category, setCategory] = useState<any>('xhs');
    const [type, setType] = useState('美食');
    const [date, setDate] = useState('2025-04-29');

    const [filterParams, setFilterParams] = useState<any>({
        time: '24h',
        gender_type: -1,
        goods_relatived: 0,
        fans_hottest: 0,
        group_buy_relatived: 0,
        sort: 'digg_count',
        size: 50,
        order_by: 'desc'
    });
    const [categorys, setCategorys] = useState<any>();

    // const { data, isLoading, isError, mutate } = useChanHotsData();

    // useEffect(() => {
    //     if (data && data.data) {
    //         console.log('data', data.data.list);
    //         setProducts(data.data.list);
    //     }
    //     return () => {};
    // }, [router, data]);

    useEffect(() => {
        fetchCategoryData();
        fetchData(filterParams);
    }, [filterParams]);

    const fetchData = async (params: any) => {
        try {
            const response = await fetch('/api/chanmamaProxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ params })
            });
            const data = await response.json();
            // console.log('data', data);
            setProducts(data.data.list);
        } catch (error) { }
    };

    const fetchCategoryData = async () => {
        try {
            const response = await fetch('/api/starCategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            // console.log('starCategory data', data);
            setCategorys(data.data);
        } catch (error) { }
    };

    const handleSearch = async (keyword: string) => {
        setFilterParams({
            ...filterParams,
            keyword: keyword
        });
    };

    const refresh = () => {
        // mutate()
    };

    const changeCategory = (filterKey: string, filterValue: string) => {
        console.log(filterKey, filterValue);
        setFilterParams({
            ...filterParams,
            [filterKey]: filterValue
        });
    };

    return (
        <ChanHotsView
            {...{
                isLoading: false,
                products,
                onClose: refresh,
                handleSearch,
                searching,
                changeCategory,
                categorys
            }}
        />
    );
}

export default ChanHotsContainer;
