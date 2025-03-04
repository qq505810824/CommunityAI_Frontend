'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import HomeView from './HomeView';

const apiSetting = new Api();

function HomeContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);

    const [feed_list, setFeedList] = useState<any[]>([]);

    useEffect(() => {
        getProducts();
        getFeedList();
        return () => {};
    }, [router]);

    const getProducts = async () => {
        const res = await axios.get('./home/products.json');
        setProducts(res.data.data.products);
    };

    const getFeedList = async () => {
        const res = await axios.get('./home/feed_list.json');
        console.log('res', res.data.data);
        setFeedList(res.data.data.feed_list);
    };

    return (
        <HomeView
            {...{
                data,
                feed_list,
                products
            }}
        />
    );
}

export default HomeContainer;
