'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AppModel } from '../AppContainer';
import SubmitView from './SubmitView';

const apiSetting = new Api();

function SubmitContainer() {
    const [data, setData] = React.useState<AppModel>({
        title: '',
        category: '',
        description: '',
        data_url: '',
        img_src: ''
    });
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [product, setProduct] = useState<any[]>([]);
    const [category, setCategory] = useState<any>(null);

    useEffect(() => {
    }, [])

    const handleSubmit = () => {

    }
    return (
        <SubmitView
            {...{
                data,
                onSubmit: handleSubmit
            }}
        />
    );
}

export default SubmitContainer;
