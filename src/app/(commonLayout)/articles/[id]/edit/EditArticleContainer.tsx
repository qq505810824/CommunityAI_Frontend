'use client';

import useAlert from '@/hooks/useAlert';
import { ArticleModel, useArticleDetailData, useArticleOperations } from '@/hooks/useArticleData';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditArticleView from './EditArticleView';

function EditArticleContainer() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { updateArticle, mutate } = useArticleOperations();
    const params = useParams();
    const [article, setArticle] = useState<ArticleModel>();

    const {
        data,
        isLoading: categoryLoading,
        isError
    } = useArticleDetailData(Number(params['id']));

    useEffect(() => {
        // console.log('apps', data);
        if (data) {
            setArticle(data);
        }
    }, [data]);

    const handleSubmit = async (formData: ArticleModel) => {
        // console.log('formData', formData);
        setSubmitting(true);
        try {
            const { data, error } = await updateArticle(Number(params['id']), formData);
            if (error) {
                setAlert({
                    title: '更新文章失败！',
                    type: 'error'
                });
            } else {
                mutate();
                router.push('/articles');
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
        <EditArticleView
            {...{
                data: article,
                submitting,
                onSubmit: handleSubmit
            }}
        />
    );
}

export default EditArticleContainer;
