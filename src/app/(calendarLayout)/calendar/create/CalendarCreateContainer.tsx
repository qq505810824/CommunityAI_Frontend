'use client';

import useAlert from '@/hooks/useAlert';
import { CalendarModel, useCalendarOperations } from '@/hooks/useCalendarData';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import CalendarCreateEditView from './CalendarCreateEditView';

const CalendarCreateContainer = () => {
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [product, setProduct] = useState<CalendarModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { addCalendar } = useCalendarOperations();
    const router = useRouter();

    const handleSubmit = async (formData: CalendarModel) => {
        // 处理表单提交
        console.log(formData);
        const newFormData = {
            ...formData,
            status: 'draft'
            // user: localStorage?.getItem('user_id') || null
        };
        setSubmitting(true);
        try {
            const { data, error } = await addCalendar(newFormData);
            if (error) {
                console.error('發佈錯誤:', error);
                setAlert({
                    title: '發佈錯誤！',
                    type: 'error'
                });
            } else {
                router.push(`/`);
                setAlert({
                    title: '發佈成功，請等待審核通過',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '發佈錯誤！',
                type: 'error'
            });
            console.error('發佈錯誤！:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <CalendarCreateEditView
            {...{
                product,
                handleSubmit
            }}
        />
    );
};

export default CalendarCreateContainer;
