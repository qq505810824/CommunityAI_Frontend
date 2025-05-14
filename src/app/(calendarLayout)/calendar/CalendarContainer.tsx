'use client';

import useAlert from '@/hooks/useAlert';
import { useCalendarData, useCalendarOperations } from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import moment from 'moment';
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

    const { data, isLoading, isError, mutate } = useCalendarData();

    useEffect(() => {
        if (data) {
            console.log('data', data);

            const newData = data?.map((item) => {
                return {
                    ...item,
                    from_date: moment(item.from_date).format('MM月DD日'),
                    to_date: moment(item.to_date).format('MM月DD日'),
                    created_at: moment(item.created_at).fromNow(),
                    updated_at: moment(item.updated_at).fromNow()
                };
            });
            setProducts(newData);
        }
        return () => { };
    }, [router, data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchCalendar(value);
        setSearching(false);
        if (res.data) {
            const newData = data?.map((item) => {
                return {
                    ...item,
                    from_date: moment(item.from_date).format('MM月DD日'),
                    to_date: moment(item.to_date).format('MM月DD日'),
                    created_at: moment(item.created_at).fromNow(),
                    updated_at: moment(item.updated_at).fromNow()
                };
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
                searching
            }}
        />
    );
}

export default CalendarContainer;
