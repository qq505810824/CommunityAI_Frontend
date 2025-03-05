'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AppView from '../apps/AppView';

const apiSetting = new Api();

function HomeContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        getProducts();
        return () => {};
    }, [router]);

    const getProducts = async () => {
        const res = await axios.get('./home/tools.json');
        setProducts(res.data.apps[0]['datas']);
    };

    return (
        <AppView
            product={undefined}
            {...{
                data,
                products
            }}
        />
    );
}

export default HomeContainer;
