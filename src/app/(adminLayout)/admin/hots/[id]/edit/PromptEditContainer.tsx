'use client';

import useAlert from '@/hooks/useAlert';
import { PromptModel, usePromptDetailByIdData, usePromptOperations } from '@/hooks/usePromptData';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PromptEditView from './PromptEditView';

const PromptEditContainer = () => {
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [prompt, setPrompt] = useState<PromptModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { updatePrompt } = usePromptOperations();
    const router = useRouter();

    const {
        data,
        isLoading: categoryLoading,
        isError
    } = usePromptDetailByIdData(Number(params['id']));

    useEffect(() => {
        if (data) {
            setPrompt(data);
        }
    }, [data]);

    const handleSubmit = async (formData: PromptModel) => {
        // 处理表单提交
        console.log(formData);
        const newFormData = {
            ...formData
            // user: localStorage?.getItem('user_id') || null
        };
        setSubmitting(true);
        try {
            const { data, error } = await updatePrompt(Number(params['id']), newFormData);
            if (error) {
                console.error('更新文章错误:', error);
                setAlert({
                    title: '更新文章失败！',
                    type: 'error'
                });
            } else {
                setAlert({
                    title: '文章更新成功！',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '文章更新失败！',
                type: 'error'
            });
            console.error('更新文章错误:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PromptEditView
            {...{
                prompt,
                handleSubmit
            }}
        />
    );
};

export default PromptEditContainer;
