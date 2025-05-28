'use client';

import { UploadFilesToAzure } from '@/app/components/common/Widget/run-batch';
import useAlert from '@/hooks/useAlert';
import { CalendarModel, useCalendarOperations } from '@/hooks/useCalendarData';
import _ from 'lodash';
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
        setSubmitting(true);
        let upload_file_urls = '';
        if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
            upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        }
        // console.log('upload_file_urls', upload_file_urls);
        const newFormData = {
            ...formData,
            status: 'draft',
            pdf_url: upload_file_urls
            // user: localStorage?.getItem('user_id') || null
        };
        // console.log(_.omit(newFormData, 'uploadFiles'));

        try {
            const { data, error } = await addCalendar(_.omit(newFormData, 'uploadFiles'));
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
                submitting,
                setSubmitting,
                handleSubmit
            }}
        />
    );
};

export default CalendarCreateContainer;
