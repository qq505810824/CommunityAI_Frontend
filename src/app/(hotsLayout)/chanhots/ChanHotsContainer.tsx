'use client';

import useAlert from '@/hooks/useAlert';
import { useChanHotsData } from '@/hooks/useChanHotsData';
import useLoad from '@/hooks/useLoad';
import { usePromptOperations } from '@/hooks/usePromptData';
import { ChanHotsModel } from '@/models/ChanHots';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChanHotsView from './ChanHotsView';

function ChanHotsContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<ChanHotsModel[]>([]);
    const { searchPrompt } = usePromptOperations();
    const [searching, setSearching] = useState(false);
    const [category, setCategory] = useState<any>('xhs');
    const [type, setType] = useState('美食');
    const [date, setDate] = useState('2025-04-29');

    const { data, isLoading, isError, mutate } = useChanHotsData();

    useEffect(() => {
        if (data && data.data) {
            console.log('data', data.data.list);
            setProducts(data.data.list);
        }
        return () => { };
    }, [router, data]);

    useEffect(() => {
        fetch('https://api-service.chanmama.com/v5/home/aweme/search?anchor_info_type=&anchor_info_title=&gender_type=-1&age_types=&province=&page=1&video_tag=%E5%B1%85%E5%AE%B6&video_sub_tag=&video_third_tag=&keyword=&digg=&follower_counts=&durations=&hour_ranges=&sort=digg_count&size=50&time=24h&goods_relatived=0&fans_hottest=0&group_buy_relatived=0&aweme_graph_type=0&is_hot=0&filter_delete=1&order_by=desc&from=detail&product_title=&poi_name=&spu_name=&blue_words=', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTAwMDAsImFwcFZlcnNpb24iOiIiLCJleHBpcmVfdGltZSI6MTc0NzI0OTIwMCwiaWF0IjoxNzQ2NjY4MzE0LCJpZCI6MTQyOTc3MjksImtpZCI6IkNBU0VSLUVLR1RRSDVIT1dMQy1YUzkxNDQiLCJyayI6IlRDN2l1In0.fD1_fPJcwwBZZGJ9z5V5jRmJpKSJiRqnGyW8BXEBTGs'
            },
        }).then((res) => {
            console.log('res', res);

        })
    }, [])

    const handleSearch = async (keyword: string) => { };

    const refresh = () => {
        // mutate()
    };

    const changeCategory = (filterKey: string, filterValue: string) => {
        // console.log(filterKey, filterValue);
        // if (filterKey == 'category') {
        //     setCategory(filterValue);
        // } else if (filterKey == 'type') {
        //     setType(filterValue);
        // } else if (filterKey == 'date') {
        //     setDate(filterValue);
        // }
    };

    return (
        <ChanHotsView
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

export default ChanHotsContainer;
