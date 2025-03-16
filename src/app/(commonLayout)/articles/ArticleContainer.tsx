'use client';

import { ArticleModel, useArticleData, useArticleOperations } from '@/hooks/useArticleData';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArticleView from './ArticleView';

function ArticleContainer() {
    const router = useRouter();
    const [articles, setArticles] = useState<ArticleModel[]>([]);

    const { data, isLoading: categoryLoading, isError } = useArticleData();

    const { deleteArticle } = useArticleOperations();

    useEffect(() => {
        console.log('apps', data);
        if (data) {
            const newData = data.map((item) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD')
                };
            });
            setArticles(newData);
        }
    }, [data]);

    return (
        <ArticleView
            {...{
                data: articles,
                onSearch: null
            }}
        />
    );
}

export default ArticleContainer;
