'use client';

import useAlert from '@/hooks/useAlert';
import { CalendarModel, useCalendarDetailByIdData, useCalendarOperations } from '@/hooks/useCalendarData';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarEditView from './CalendarEditView';

const CalendarEditContainer = () => {
    const params = useParams();
    const [product, setProduct] = useState<CalendarModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { updateCalendar } = useCalendarOperations();
    const router = useRouter();

    const {
        data,
        isLoading,
        isError
    } = useCalendarDetailByIdData(Number(params['id']));

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);

    const handleSubmit = async (formData: CalendarModel) => {
        // 处理表单提交

        const newFormData = {
            ...product,
            ...formData
            // user: localStorage?.getItem('user_id') || null
        };
        // console.log(newFormData);
        setSubmitting(true);
        try {
            const { data, error } = await updateCalendar(Number(params['id']), newFormData);
            if (error) {
                console.error('更新文章错误:', error);
                setAlert({
                    title: '更新失敗',
                    type: 'error'
                });
            } else {
                setAlert({
                    title: '更新成功！',
                    type: 'success'
                });
                router.push('/admin/calendars')
                // router.back()
            }
        } catch (error) {
            setAlert({
                title: '更新失敗！',
                type: 'error'
            });
            console.error('更新文章错误:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <CalendarEditView
            {...{
                product,
                submitting,
                handleSubmit
            }}
        />
    );
};

export default CalendarEditContainer;
