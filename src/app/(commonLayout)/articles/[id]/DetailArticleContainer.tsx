'use client';

import { ArticleModel, useArticleDetailData } from '@/hooks/useArticleData';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailArticleView from './DetailArticleView';

function DetailArticleContainer() {
    const router = useRouter();
    const params = useParams()
    const [article, setArticle] = useState<ArticleModel>()

    const {
        data,
        isLoading: categoryLoading,
        isError
    } = useArticleDetailData(Number(params['id']));

    useEffect(() => {
        console.log('apps', data);
        if (data) {
            setArticle({
                ...data,
                created_at: moment(data.created_at).format('YYYY-MM-DD HH:mm')
            })
        }

    }, [data]);

    return (
        <DetailArticleView
            {...{
                data: article,
                onSearch: null
            }}
        />
    );
}

export default DetailArticleContainer