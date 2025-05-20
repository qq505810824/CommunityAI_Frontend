'use client';

import useAlert from '@/hooks/useAlert';
import { CalendarModel, showCalendarValues, useCalendarData, useCalendarOperations } from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarView from './CalendarView';

function CalendarContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);
    const { searchCalendar } = useCalendarOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useCalendarData({ status: 'success' });

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return showCalendarValues(item);
            });
            setProducts(newData);
        }
        return () => { };
    }, [router, data]);


    const handleSearch = async (value: string) => {
        // console.log('search value', value);
        setSearching(true);
        const res: any = await searchCalendar({
            keyword: value,
            status: 'success'
        });
        setSearching(false);

        if (res.data) {
            const newData = res.data?.map((item: CalendarModel) => {
                return showCalendarValues(item);
            });
            setProducts(newData);
        }
    };

    const handleSwitchCategory = async (category: string) => {
        setSearching(true);
        const res: any = await searchCalendar({
            category: category,
            status: 'success'
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
                searching
            }}
        />
    );
}

export default CalendarContainer;
