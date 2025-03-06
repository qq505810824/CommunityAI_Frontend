'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SearchView from './SearchView';

const apiSetting = new Api();

function SearchContainer() {
    const [data, setData] = React.useState({
        keyword: '',
        apps: []
    });
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [product, setProduct] = useState<any[]>([]);
    const [keyword, setKeyword] = useState<any>(null);

    useEffect(() => {
        setKeyword(searchParams.get('s') || null);
        if (searchParams.get('s')) {
            getProducts(searchParams.get('s') || '');
            // console.log('s', searchParams.get('s'));
        }
    }, [router, searchParams]);

    const getProducts = async (keyword: string) => {
        const res = await axios.get('./home/tools.json');
        // console.log('res', res.data.apps[0]);
        // console.log('keyword', keyword);

        const apps = res.data.apps;
        if (keyword) {
            const datas = apps.filter(
                (app: any) =>
                    new RegExp(keyword, 'i').test(app.title) ||
                    new RegExp(keyword, 'i').test(app.description)
            );
            // console.log('product', datas);
            setData({
                keyword,
                apps: datas
            });
        } else {
        }
    };

    const handleSearch = (content: string) => {
        router.push('/search?s=' + content);
    };

    return (
        <SearchView
            {...{
                data,
                onSearch: handleSearch
            }}
        />
    );
}

export default SearchContainer;
