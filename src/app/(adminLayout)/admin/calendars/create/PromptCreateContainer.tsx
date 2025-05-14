'use client';

import useAlert from '@/hooks/useAlert';
import { PromptModel, usePromptOperations } from '@/hooks/usePromptData';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import PromptCreateEditView from './PromptCreateEditView';

const PromptCreateContainer = () => {
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [prompt, setPrompt] = useState<PromptModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { addPrompt } = usePromptOperations();
    const router = useRouter();

    const handleSubmit = async (formData: PromptModel) => {
        // 处理表单提交
        console.log(formData);
        const newFormData = {
            ...formData
            // user: localStorage?.getItem('user_id') || null
        };
        setSubmitting(true);
        try {
            const { data, error } = await addPrompt(newFormData);
            if (error) {
                console.error('创建文章错误:', error);
                setAlert({
                    title: '创建文章失败！',
                    type: 'error'
                });
            } else {
                router.push(`/admin/prompts`);
                setAlert({
                    title: '文章创建成功！',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '文章更新失败！',
                type: 'error'
            });
            console.error('创建文章错误:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PromptCreateEditView
            {...{
                prompt,
                handleSubmit
            }}
        />
    );
};

export default PromptCreateContainer;
