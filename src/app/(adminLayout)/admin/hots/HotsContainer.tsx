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

    const [category, setCategory] = useState<any>('xhs');
    const [type, setType] = useState('美食');
    const [date, setDate] = useState('2025-04-29');
    const [keyword, setKeyword] = useState('');


    const { data, isLoading, isError, mutate } = useHotsData(`category.like.%${category}%,tag_main.ilike.%${type}%,publicTime.ilike.%${date}%`);


    // 提取构建搜索条件的函数
    const buildSearchConditions = (category: string, type: string, date: string) => {
        const searchConditions: string[] = [];
        if (category) {
            searchConditions.push(`category.like.%${category}%`);
        }
        if (type) {
            searchConditions.push(`tag_main.ilike.%${type}%`);
        }
        if (date) {
            searchConditions.push(`publicTime.ilike.%${date}%`);
        }
        return searchConditions;
    };

    useEffect(() => {
        // 调用构建搜索条件的函数
        const searchConditions = buildSearchConditions(category, type, date);
        if (searchConditions.length > 0) {
            const combinedOptions = searchConditions.join(',');
            // handleSearch('', combinedOptions);
        }
    }, [category, type, date]);

    useEffect(() => {
        // getProducts(category, type, date)
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
                tag_main: item.video_tag_name_lv1 || item.note_counter_type_v1,
                tag_sub: item.video_tag_name_lv2 || item.note_counter_type_v2
                // publicTime: moment(item.publicTime).format('MM-DD HH:mm')
            };
        });

        setProducts(newData);
    };

    useEffect(() => {
        if (data) {
            console.log('data', data);

            const newData = data?.map((item) => {
                return {
                    ...item,
                    // category: category,
                    // userType: item.userType || item.userTypeFirst,
                    // video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1 || '',
                    // video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2 || '',
                    publicTime: moment(item.publicTime).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.publicTime).format('MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
        return () => { };
    }, [router, data]);

    const handleSearch = async (value: string, options?: string) => {
        console.log('search value', options);
        setKeyword(value);
        setSearching(true);
        const searchConditions = buildSearchConditions(category, type, date);
        const res: any = await searchHots(value, options || searchConditions.join(','));
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: HotModel) => {
                return {
                    ...item,
                    // category: category,
                    userType: item.userType || item.userTypeFirst,
                    video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1 || '',
                    video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2 || '',
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
            // mutate();
            setAlert({
                title: '删除成功',
                type: 'success'
            });
        }
    };

    const changeCategory = (filterKey: string, filterValue: string) => {
        // console.log(filterKey, filterValue);

        // 构建搜索条件数组
        if (filterKey === 'category') {
            setCategory(filterValue);
            const searchConditions = buildSearchConditions(filterValue, type, date);
            handleSearch("", searchConditions.join(','))
        } else if (filterKey === 'type') {
            setType(filterValue);
            const searchConditions = buildSearchConditions(category, filterValue, date);
            handleSearch("", searchConditions.join(','))
        } else if (filterKey === 'date') {
            setDate(filterValue);
            const searchConditions = buildSearchConditions(category, type, filterValue);
            handleSearch("", searchConditions.join(','))
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
                changeCategory,
                onDelete: handleDelete,
                filterOption: {
                    category,
                    type,
                    date
                }
            }}
        />
    );
}

export default HotsContainer;
