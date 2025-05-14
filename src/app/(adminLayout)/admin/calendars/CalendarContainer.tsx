'use client';

import useAlert from '@/hooks/useAlert';
import { CalendarModel, useCalendarData, useCalendarOperations } from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarView from './CalendarView';

function CalendarContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<CalendarModel[]>([]);
    const { searchCalendar, deleteCalendar, updateCalendar } = useCalendarOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useCalendarData();

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
        return () => { };
    }, [router, data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchCalendar({ keyword: value });
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: CalendarModel) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
    };
    const handleDelete = async (id: number) => {
        const res: any = await deleteCalendar(id);
        console.log('res', res);
        if (res.success) {
            mutate();
            setAlert({
                title: '删除成功',
                type: 'success'
            });
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        console.log('id,status', id, status);

        const res: any = await updateCalendar(id, { status });
        console.log('res', res);
        if (!res.error) {
            mutate();
            setAlert({
                title: '操作成功',
                type: 'success'
            });
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
                searching,
                onDelete: handleDelete,
                onUpdataStatus: handleUpdateStatus
            }}
        />
    );
}

export default CalendarContainer;
