'use client';

import useAlert from '@/hooks/useAlert';
import { CalendarModel, useCalendarDetailData } from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarDetailView from './CalendarDetailView';

function CalendarDetailContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [product, setProduct] = useState<CalendarModel>();

    const { data, isLoading, isError } = useCalendarDetailData(Number(params['id']), user_id || '');

    useEffect(() => {
        if (data) {
            const newData = {
                ...data
            };
            setProduct(newData);
        }
        return () => {};
    }, [router, data]);

    return (
        <CalendarDetailView
            {...{
                data,
                product
            }}
        />
    );
}

export default CalendarDetailContainer;
