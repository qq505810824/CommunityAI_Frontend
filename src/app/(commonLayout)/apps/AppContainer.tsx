'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AppView from './AppView';

const apiSetting = new Api();

function AppContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [product, setProduct] = useState<any[]>([]);
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
        setCategory(searchParams.get('type') || null);
        if (!searchParams.get('type')) {
            getProducts('home');
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
            const product = apps.find((app: any) => app.name == category);
            // console.log('product', product);
            if (product) {
                setProduct(product);
            } else {
                setProduct(res.data.apps[0]);
            }
        } else {
            setProduct(res.data.apps[0]);
        }
    };

    return (
        <AppView
            {...{
                data,
                product
            }}
        />
    );
}

export default AppContainer;
