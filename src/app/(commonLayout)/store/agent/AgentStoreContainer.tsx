'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AgentStoreView from './AgentStoreView';

const apiSetting = new Api();

function AgentStoreContainer() {
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
        const res = await axios.get('./agent_recommend.json');
        console.log('res', res.data.data);
        setProducts(res.data.data.products);
    };

    return (
        <AgentStoreView
            {...{
                data,
                products
            }}
        />
    );
}

export default AgentStoreContainer;
