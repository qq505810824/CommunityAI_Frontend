'use client';

import useAlert from '@/hooks/useAlert';
import { AppModel, useAppsByCategory } from '@/hooks/useAppsData';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AppView from './AppView';

interface DisplayData {
    category: string;
    apps: AppModel[]
}

function AppContainer() {

    const [displayData, setDisplayData] = useState<DisplayData>();

    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState<any>(null);
    // 创建一个 ref 来跟踪 apps 是否已被处理
    const processedAppsRef = useRef(false);

    const { apps, isLoading: categoryLoading, isError } = useAppsByCategory(category);

    useEffect(() => {
        setCategory(searchParams.get('type') || null);
        if (!searchParams.get('type')) {
            getProducts('AI 搜索引擎');
        }
    }, [router, searchParams]);

    useEffect(() => {
        if (category != null) getProducts(category);
    }, [category]);

    useEffect(() => {
        if (apps && apps.length > 0 && !processedAppsRef.current) {
            console.log('apps by category:', apps);

            setDisplayData((prevData: DisplayData | undefined) => {
                if (prevData) {
                    return {
                        category,
                        apps: [...prevData.apps, ...apps]
                    };
                }
                return {
                    category,
                    apps: apps
                };
            });
            processedAppsRef.current = true;
        }
    }, [router, apps, category]);

    // 当 category 变化时重置处理标记
    useEffect(() => {
        processedAppsRef.current = false;
    }, [category]);

    const getProducts = async (category: string) => {
        const res = await axios.get('./home/tools.json');
        // console.log('res', res.data.apps[0]);
        // console.log('category', category);
        if (category) {
            const apps: any = res.data.apps;
            // console.log('apps', apps);
            if (category) {
                const datas = apps.filter((app: any) => app.category?.includes(category));
                // console.log('product', datas);
                setDisplayData({
                    category,
                    apps: datas
                });
            }
        }

    };

    const handleSearch = (content: string) => {
        router.push('/search?s=' + content);
    };

    // if (isLoading) return <div>加载中...</div>;
    if (isError) return <div>加载失败</div>;

    return (
        <AppView
            {...{
                data: displayData,
                onSearch: handleSearch
            }}
        />
    );
}

export default AppContainer;
