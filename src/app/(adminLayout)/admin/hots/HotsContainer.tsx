'use client';

import useAlert from '@/hooks/useAlert';
import { HotModel, useHotsData, useHotsOperations } from '@/hooks/useHotData';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HotsView from './HotsView';

function HotsContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);
    const { searchHots, deleteHots } = useHotsOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useHotsData();

    const [category, setCategory] = useState<any>('xhs');
    const [type, setType] = useState('美食');
    const [date, setDate] = useState('2025-04-29');

    useEffect(() => {
        getProducts(category, type, date);
    }, [category, type, date]);

    const getProducts = async (category: string, type: string, date: string) => {
        const res = await axios.get(`../hots/${category}-${type}-${date}.json`);
        // console.log('res', res.data.apps[0]);
        // console.log('res', res.data.data.list);
        const newData = res.data.data.list?.map((item: HotModel) => {
            return {
                ...item,
                category: category,
                // commentCount: formatK(item.commentCount || 0),
                // collectCount: formatK(item.collectCount || 0),
                // shareCount: formatK(item.shareCount || 0),
                // likeCount: formatK(item.likeCount || 0),
                userType: item.userType || item.userTypeFirst,
                video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1,
                video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2,
                // publicTime: moment(item.publicTime).format('MM-DD HH:mm')
            };
        });

        // setProducts(newData);
    };


    useEffect(() => {
        if (data) {
            console.log('data', data);

            const newData = data?.map((item) => {
                return {
                    ...item,
                    category: category,
                    video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1,
                    video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2,
                    publicTime: moment(item.publicTime).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.publicTime).format('MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
        return () => { };
    }, [router, data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchHots(value);
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: HotModel) => {
                return {
                    ...item,
                    category: category,
                    video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1,
                    video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2,
                    publicTime: moment(item.publicTime).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.publicTime).format('MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
    };
    const handleDelete = async (id: number) => {
        const res: any = await deleteHots(id);
        console.log('res', res);
        if (res.success) {
            mutate();
            setAlert({
                title: '删除成功',
                type: 'success'
            });
        }
    };

    return (
        <HotsView
            {...{
                data,
                isLoading,
                products,
                onClose: mutate,
                handleSearch,
                searching,
                onDelete: handleDelete
            }}
        />
    );
}

export default HotsContainer;
