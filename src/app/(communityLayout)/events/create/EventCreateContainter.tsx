'use client';

import { UploadFilesToAzure } from '@/app/components/forms/run-batch';
import { useAppContext } from '@/context/app-context';
import useAlert from '@/hooks/useAlert';
import { useCalendarOperations } from '@/hooks/useCalendarData';
import { CalendarModel } from '@/models/Calendar';
import _ from 'lodash';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import EventCreateView from './EventCreateView';


export default function EventCreateContainter() {
    const params = useParams();
    const token = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');
    const { user_id } = useAppContext();
    const [product, setProduct] = useState<CalendarModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { addCalendar } = useCalendarOperations();
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (formData: CalendarModel) => {
        // 处理表单提交
        console.log(formData);
        const communityId = searchParams.get('community_id');
        setSubmitting(true);
        let upload_file_urls = '';
        if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
            upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        }
        // console.log('upload_file_urls', upload_file_urls);
        const newFormData = {
            ...formData,
            status: 'success',
            files_url: upload_file_urls,
            owner: user_id,
            community: communityId ? (communityId as any) : undefined
        };
        console.log(_.omit(newFormData, 'uploadFiles'));

        try {
            const { data, error } = await addCalendar(_.omit(newFormData, 'uploadFiles'));
            if (error) {
                console.error('發佈錯誤:', error);
                setAlert({
                    title: 'Error!',
                    type: 'error'
                });
            } else {
                router.push(`/communitys/${communityId}?activeTab=events`);
                setAlert({
                    title: 'Successful!',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: 'Error!',
                type: 'error'
            });
            console.error('發佈錯誤！:', error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <EventCreateView {...{
                product,
                submitting,
                setSubmitting,
                handleSubmit
            }} />
        </>
    );
}
