'use client';

import Loading from '@/app/components/base/loading';
import { useModalContext } from '@/context/modal-context';
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
    const { setShowConfirmDelete } = useModalContext();

    useEffect(() => {
        const storedEmail = localStorage.getItem('user_email') || '';
        if (storedEmail === '') {
            router.push('/login?redirect=' + window.location.href)
            // setShowConfirmDelete({
            //     payload: {
            //         title: '溫馨提示',
            //         content: '免費註冊以瀏覽全部內容，立即註冊或登入。',
            //         confirmText: '註冊/登入',
            //         cancelText: '取消'
            //     },
            //     onSaveCallback: () => {
            //         router.push('/login?redirect=' + window.location.href);
            //     },
            //     onCancelCallback() {

            //     },
            // });
            // 
        }
    }, []);

    useEffect(() => {
        if (data) {
            const newData = {
                ...data
            };
            setProduct(newData);
        }
        return () => { };
    }, [router, data]);

    const get_drives = async () => {
        // const session: any = await getSession()
        // if (!session) return router.push('/api/auth/signin')
        // console.log('session', session);
    };
    useEffect(() => {
        get_drives();
    }, []);

    if (!data) return <Loading type="app" />;

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
