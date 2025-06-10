'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useModalContext } from '@/context/modal-context';
import useAlert from '@/hooks/useAlert';
import { CalendarModel } from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarDetailView from './CalendarDetailView';
import { useAppDetailContext } from './detail-context';

function CalendarDetailContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [product, setProduct] = useState<CalendarModel>();
    const { userProfile } = useAppContext();
    const { setShowConfirmDelete } = useModalContext();
    const { appData } = useAppDetailContext();
    useEffect(() => {
        if (appData) {
            setProduct(appData);
        }
        return () => {};
    }, [appData]);

    if (!product) return <Loading type="app" />;

    return (
        <CalendarDetailView
            {...{
                product
            }}
        />
    );
}

export default CalendarDetailContainer;
