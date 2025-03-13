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
    useEffect(() => { }, []);

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

    // 添加获取网站元数据的函数
    const fetchWebsiteMetadata = async (url: string) => {
        try {
            const response = await fetch('/api/fetch-metadata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                throw new Error('获取网站信息失败');
            }

            const data = await response.json();
            // console.log('data', data);
            return {
                status: true,
                data: data
            };
        } catch (error) {
            console.error('获取网站信息出错:', error);
            alert('获取网站信息失败，请手动填写');
            return {
                status: false,
                error: '获取网站信息出错'
            };
        }
    };

    return (
        <SubmitView
            {...{
                data,
                submitting,
                onSubmit: handleSubmit,
                fetchWebsiteMetadata
            }}
        />
    );
}

export default SubmitContainer;
