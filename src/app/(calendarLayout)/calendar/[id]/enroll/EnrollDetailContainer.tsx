'use client';

import Loading from '@/app/components/base/loading';
import useAlert from '@/hooks/useAlert';
import { CalendarModel } from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDetailContext } from '../detail-context';
import EnrollDetailView from './EnrollDetailView';

function EnrollDetailContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [product, setProduct] = useState<CalendarModel>();
    const { appData } = useAppDetailContext()

    useEffect(() => {
        if (appData) {

            setProduct(appData);
        }
        return () => { };
    }, [appData]);

    if (!product) return <Loading type="app" />;

    return (
        <EnrollDetailView
            {...{
                product
            }}
        />
    );
}

export default EnrollDetailContainer;
