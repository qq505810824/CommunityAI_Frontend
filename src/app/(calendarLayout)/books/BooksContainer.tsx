'use client';

import useAlert from '@/hooks/useAlert';
import {
    CalendarModel,
    showCalendarValues,
    useCalendarData,
    useCalendarOperations
} from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarView from './BooksView';

function BooksContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);
    const { searchCalendar } = useCalendarOperations();
    const [searching, setSearching] = useState(false);
    const [filters, setFilters] = useState<any>({
        keyword: '',
        category: '',
        order: 'created_at',
        direction: 'desc',
        status: 'success',
        region: 'hk'
    });

    const { data, isLoading, isError, mutate } = useCalendarData({ ...filters });

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return showCalendarValues(item);
            });
            setProducts(newData);
        }
        return () => {};
    }, [router, data]);

    useEffect(() => {
        fetch(`/api/ipaddress`)
            .then((res) => res.json())
            .then((data) => {
                console.log('Address data:', data);
                if (data?.region) {
                    setFilters({
                        ...filters,
                        region: data.region
                    });
                }
            })
            .catch(() => console.log('无法获取具体地区信息'));
    }, [router]);

    const handleSearch = async (value: string) => {
        // console.log('search value', value);
        setFilters({
            ...filters,
            keyword: value
        });

        // setSearching(true);
        // const res: any = await searchCalendar({
        //     ...filters,
        //     keyword: value
        // });
        // setSearching(false);

        // if (res.data) {
        //     const newData = res.data?.map((item: CalendarModel) => {
        //         return showCalendarValues(item);
        //     });
        //     setProducts(newData);
        // }
    };

    const handleSwitchCategory = async (category: string) => {
        setSearching(true);
        const res: any = await searchCalendar({
            ...filters,
            category: category
        });
        setSearching(false);
        // console.log('res3', res);

        if (res.data) {
            const newData = res.data?.map((item: CalendarModel) => {
                return showCalendarValues(item);
            });
            setProducts(newData);
        }
    };
    return (
        <CalendarView
            {...{
                data,
                isLoading,
                products,
                onClose: mutate,
                handleSearch,
                onSwitchCategory: handleSwitchCategory,
                searching,
                filters,
                setFilters
            }}
        />
    );
}

export default BooksContainer;
