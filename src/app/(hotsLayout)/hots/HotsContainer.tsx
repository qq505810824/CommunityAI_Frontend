'use client';

import useAlert from '@/hooks/useAlert';
import { HotModel, IPlatform } from '@/hooks/useHotData';
import useLoad from '@/hooks/useLoad';
import { usePromptOperations } from '@/hooks/usePromptData';
import { formatK } from '@/utils/stringUtil';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HotsView from './HotsView';

function HotsContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<HotModel[]>([]);
    const { searchPrompt } = usePromptOperations();
    const [searching, setSearching] = useState(false);
    const [category, setCategory] = useState<any>('xhs');
    const [type, setType] = useState('美食');
    const [date, setDate] = useState(moment().add(-1, 'day').format('YYYY-MM-DD'));

    // const { data, isLoading: promptsLoading, isError, mutate } = usePromptData();

    // useEffect(() => {
    //     if (data) {
    //         const newData = data?.map((item) => {
    //             return {
    //                 ...item,
    //                 tags: (item.tags && JSON.parse(item.tags).slice(0, 4)) || [],
    //                 collect: formatK(item.collect || 0),
    //                 focus: formatK(item.focus || 0),
    //                 share: formatK(item.share || 0),
    //                 copy: formatK(item.copy || 0),
    //                 created_at: moment(item.created_at).fromNow(),
    //                 updated_at: moment(item.updated_at).fromNow()
    //             };
    //         });
    //         setProducts(newData);
    //     }
    //     return () => { };
    // }, [router, data]);
    useEffect(() => {
        // fetchData()
    }, []);

    const fetchData = async (category: string, type: string, date: string) => {
        const api = (IPlatform as Record<string, any>)[category].api;
        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rankType: 1,
                    rankDate: date,
                    type: [type],
                    size: 25,
                    start: 1,
                    secondType: '',
                    rankRealType: 1
                })
            });
            const data = await response.json();
            console.log('data', data);
            const newData = data.data.list?.map((item: HotModel) => {
                return {
                    ...item,
                    category: category,
                    commentCount: formatK(item.commentCount || 0),
                    collectCount: formatK(item.collectCount || 0),
                    shareCount: formatK(item.shareCount || 0),
                    likeCount: formatK(item.likeCount || 0),
                    video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1,
                    video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2,
                    publicTime: moment(item.publicTime).format('MM-DD HH:mm')
                };
            });

            setProducts(newData);
        } catch (error) {}
    };

    useEffect(() => {
        fetchData(category, type, date);
        // getProducts(category, type, date);
    }, [category, type, date]);

    const getProducts = async (category: string, type: string, date: string) => {
        const res = await axios.get(`./hots/${category}-${type}-${date}.json`);
        // console.log('res', res.data.apps[0]);
        // console.log('res', res.data.data.list);
        const newData = res.data.data.list?.map((item: HotModel) => {
            return {
                ...item,
                category: category,
                commentCount: formatK(item.commentCount || 0),
                collectCount: formatK(item.collectCount || 0),
                shareCount: formatK(item.shareCount || 0),
                likeCount: formatK(item.likeCount || 0),
                video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1,
                video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2,
                publicTime: moment(item.publicTime).format('MM-DD HH:mm')
            };
        });

        setProducts(newData);
    };

    const handleSearch = async (keyword: string) => {
        if (!keyword) {
            fetchData(category, type, date);
            // getProducts(category, type, date);
            return;
        }
        console.log('search value', keyword);
        const filterData = _.filter(products, (item) => _.includes(item.title, keyword));
        console.log(filterData);
        const newData = filterData?.map((item: any) => {
            return {
                ...item,
                commentCount: formatK(item.commentCount || 0),
                collectCount: formatK(item.collectCount || 0),
                shareCount: formatK(item.shareCount || 0),
                likeCount: formatK(item.likeCount || 0),
                video_tag_name_lv1: item.video_tag_name_lv1 || item.note_counter_type_v1,
                video_tag_name_lv2: item.video_tag_name_lv2 || item.note_counter_type_v2,
                publicTime: moment(item.publicTime).format('MM-DD HH:mm')
            };
        });
        setProducts(newData);

        // setSearching(true);
        // const res: any = await searchPrompt(value);
        // setSearching(false);
        // if (res.data) {
        //     const newData = res.data.map((item: HotModel) => {
        //         return {
        //             ...item,
        //             commentCount: formatK(item.commentCount || 0),
        //             collectCount: formatK(item.collectCount || 0),
        //             shareCount: formatK(item.shareCount || 0),
        //             likeCount: formatK(item.likeCount || 0),
        //             publicTime: moment(item.publicTime).format('MM-DD HH:mm')
        //         };
        //     });
        //     setProducts(newData);
        // }
    };

    const refresh = () => {
        // mutate()
    };

    const changeCategory = (filterKey: string, filterValue: string) => {
        console.log(filterKey, filterValue);

        if (filterKey == 'category') {
            setCategory(filterValue);
        } else if (filterKey == 'type') {
            setType(filterValue);
        } else if (filterKey == 'date') {
            setDate(filterValue);
        }
    };

    return (
        <HotsView
            {...{
                isLoading: false,
                products,
                onClose: refresh,
                handleSearch,
                searching,
                changeCategory
            }}
        />
    );
}

export default HotsContainer;
