'use client';

import useAlert from '@/hooks/useAlert';
import { useCampaignData, useCampaignOperations } from '@/hooks/useCampaignData';
import useLoad from '@/hooks/useLoad';
import { CampaignModel } from '@/models/Campaign';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CampaignView from './CampaignView';

function CampaignContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<CampaignModel[]>([]);
    const { searchCampaign, deleteCampaign, updateCampaign } = useCampaignOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useCampaignData({});

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
        return () => {};
    }, [data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchCampaign({ keyword: value });
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: CampaignModel) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
    };
    const handleDelete = async (id: number) => {
        const res: any = await deleteCampaign(id);
        console.log('res', res);
        if (res.success) {
            mutate();
            setAlert({
                title: '删除成功',
                type: 'success'
            });
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        console.log('id,status', id, status);
    };

    return (
        <CampaignView
            {...{
                data,
                isLoading,
                products,
                onClose: mutate,
                handleSearch,
                searching,
                onDelete: handleDelete,
                onUpdataStatus: handleUpdateStatus
            }}
        />
    );
}

export default CampaignContainer;
