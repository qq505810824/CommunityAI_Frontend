'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TemplateView from './TemplateView';

const apiSetting = new Api();

function TemplateContainer() {
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
        const res = await axios.get('./template/template.json');
        console.log('res', res.data.data);
        setProducts(res.data.data.products);
    };

    return (
        <TemplateView
            {...{
                data,
                products
            }}
        />
    );
}

export default TemplateContainer;
