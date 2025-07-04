'use client';

import useAlert from '@/hooks/useAlert';
import { useAllChannelData, useChannelOperations } from '@/hooks/useChannelData';
import useLoad from '@/hooks/useLoad';
import { ChannelModel } from '@/models/Channel';
import { CommunityModel } from '@/models/Community';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChannelView from './ChannelView';

function ChannelContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<ChannelModel[]>([]);
    const { searchChannel, deleteChannel, updateChannel } = useChannelOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useAllChannelData();

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
        return () => { };
    }, [data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchChannel({ keyword: value });
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: CommunityModel) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
    };
    const handleDelete = async (id: number, community_id: number) => {
        const res: any = await deleteChannel(id, community_id);
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
        <ChannelView
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

export default ChannelContainer;
