'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import { useSearchApps } from '@/hooks/useAppsData';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import SearchView from './SearchView';

const apiSetting = new Api();

function SearchContainer() {
    const [displayData, setDisplayData] = React.useState({
        keyword: '',
        apps: []
    });
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [keyword, setKeyword] = useState<any>(null);

    const { apps, isLoading, isError } = useSearchApps(keyword);
    // 创建一个 ref 来跟踪 apps 是否已被处理

    const processedAppsRef = useRef(false);

    // 添加一个状态来跟踪 getProducts 是否已执行完成
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        console.log('搜索关键词:', keyword);
        console.log('搜索结果:', apps);
    }, [keyword, apps]);

    useEffect(() => {
        const s = searchParams.get('s');
        setKeyword(s || null);
        if (s) {
            getProducts(s || '');
            // console.log('s', searchParams.get('s'));
        }
    }, [router, searchParams]);

    useEffect(() => {
        if (apps && apps.length > 0 && !processedAppsRef.current && productsLoaded) {
            console.log('apps by category:', apps);

            setDisplayData((prevData) => ({
                keyword,
                apps: [...prevData.apps, ...(apps as never[])]
            }));
            processedAppsRef.current = true;
        }
    }, [router, apps, keyword, productsLoaded]);

    // 当 category 变化时重置处理标记
    useEffect(() => {
        processedAppsRef.current = false;
        setProductsLoaded(false);
    }, [keyword]);

    const getProducts = async (keyword: string) => {
        const res = await axios.get('./home/tools.json');
        // console.log('res', res.data.apps[0]);
        // console.log('keyword', keyword);
        if (keyword) {
            const apps: any = res.data.apps;
            const datas = apps.filter(
                (app: any) =>
                    new RegExp(keyword, 'i').test(app.title) ||
                    new RegExp(keyword, 'i').test(app.description)
            );
            // console.log('product', datas);
            setDisplayData({
                keyword: keyword,
                apps: datas
            });

            // 标记 getProducts 已完成
            setProductsLoaded(true);
        }
    };

    const handleSearch = (content: string) => {
        setKeyword(content);
        getProducts(content);
    };

    return (
        <SearchView
            {...{
                data: displayData,
                onSearch: handleSearch
            }}
        />
    );
}

export default SearchContainer;
