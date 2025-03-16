'use client';

import useAlert from '@/hooks/useAlert';
import { ArticleModel, useArticleData, useArticleOperations } from '@/hooks/useArticleData';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateArticleView from './CreateArticleView';

function CreateArticleContainer() {
    const router = useRouter();
    const [articles, setArticles] = useState<ArticleModel[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { addArticle, mutate } = useArticleOperations();
    const { data, isLoading: categoryLoading, isError } = useArticleData();

    useEffect(() => {
        console.log('apps', data);
        if (data) {
        }
    }, [data]);

    const handleSubmit = async (formData: ArticleModel) => {
        console.log('formData', formData);
        setSubmitting(true);
        try {
            const { data, error } = await addArticle(formData);
            if (error) {
                setAlert({
                    title: '创建文章失败！',
                    type: 'error'
                });
            } else {
                mutate();
                router.push('/articles');
                setAlert({
                    title: '文章创建成功！',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '文章创建失败！',
                type: 'error'
            });
            console.error('创建文章错误:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <CreateArticleView
            {...{
                submitting,
                onSubmit: handleSubmit
            }}
        />
    );
}

export default CreateArticleContainer;
