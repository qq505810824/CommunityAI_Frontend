'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DevelopView from './DevelopView';

const apiSetting = new Api();

function DevelopContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [intelligences, setIntelligences] = useState<any[]>([]);

    useEffect(() => {
        getProducts();
        return () => { };
    }, [router]);

    const getProducts = async () => {
        const res = await axios.get('../develop.json');
        console.log('res', res.data.data);
        setIntelligences(res.data.data.intelligences);
    };

    return (
        <DevelopView
            {...{
                data,
                intelligences
            }}
        />
    );
}

export default DevelopContainer;
