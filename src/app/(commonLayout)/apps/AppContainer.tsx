'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AppView from './AppView';

const apiSetting = new Api();

export type AppModel = {
    title: string,
    category: string,
    description: string,
    data_url: string,
    img_src: string
}

function AppContainer() {
    const [data, setData] = React.useState({
        category: '',
        apps: []
    });
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [product, setProduct] = useState<any[]>([]);
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
        setCategory(searchParams.get('type') || null);
        if (!searchParams.get('type')) {
            getProducts('AI 搜索引擎');
        }
    }, [router, searchParams]);

    useEffect(() => {
        if (category != null) getProducts(category);
    }, [category]);

    const getProducts = async (category: string) => {
        const res = await axios.get('./home/tools.json');
        // console.log('res', res.data.apps[0]);
        // console.log('category', category);


        const apps = res.data.apps;
        if (category) {
            const datas = apps.filter((app: any) => app.category.includes(category));
            // console.log('product', datas);
            setData({
                category,
                apps: datas
            });
        }
    };

    const handleSearch = (content: string) => {
        router.push('/search?s=' + content);
    };

    return (
        <AppView
            {...{
                data,
                onSearch: handleSearch
            }}
        />
    );
}

export default AppContainer;
