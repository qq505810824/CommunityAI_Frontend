'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import { AppModel, useCreateApp } from '@/hooks/useAppsData';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SubmitView from './SubmitView';

const apiSetting = new Api();

function SubmitContainer() {
    const [data, setData] = React.useState<AppModel>();
    const { setAlert } = useAlert();
    const router = useRouter();
    const { addNewApp } = useCreateApp();
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {}, []);

    const handleSubmit = async (formData: AppModel) => {
        setSubmitting(true);
        try {
            const { data, error } = await addNewApp(formData);
            if (error) {
                setAlert({
                    title: '应用创建失败！',
                    type: 'error'
                });
            } else {
                setAlert({
                    title: '应用创建成功！',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '应用创建失败！',
                type: 'error'
            });
            console.error('创建应用错误:', error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <SubmitView
            {...{
                data,
                submitting,
                onSubmit: handleSubmit
            }}
        />
    );
}

export default SubmitContainer;
