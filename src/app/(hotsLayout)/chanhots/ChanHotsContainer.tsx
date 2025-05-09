'use client';

import useAlert from '@/hooks/useAlert';
import { useChanHotsData } from '@/hooks/useChanHotsData';
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

    const { data, isLoading, isError, mutate } = useChanHotsData();

    useEffect(() => {
        if (data && data.data) {
            console.log('data', data.data.list);
            setProducts(data.data.list);
        }
        return () => {};
    }, [router, data]);

    useEffect(() => {
        fetch('/api/chanmamaProxy')
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = async (keyword: string) => {};

    const refresh = () => {
        // mutate()
    };

    const changeCategory = (filterKey: string, filterValue: string) => {
        // console.log(filterKey, filterValue);
        // if (filterKey == 'category') {
        //     setCategory(filterValue);
        // } else if (filterKey == 'type') {
        //     setType(filterValue);
        // } else if (filterKey == 'date') {
        //     setDate(filterValue);
        // }
    };

    return (
        <ChanHotsView
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

export default ChanHotsContainer;
