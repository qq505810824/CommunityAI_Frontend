'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ModelStoreView from './ModelStoreView';

const apiSetting = new Api();

function ModelStoreContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [bots, setBots] = useState<any[]>([]);

    useEffect(() => {
        getProducts();
        return () => {};
    }, [router]);

    const getProducts = async () => {
        const res = await axios.get('./model_bot.json');
        const bots = res.data.data.bots;
        const groupedBots = bots.reduce((acc: any, bot: any) => {
            const botTypeId = bot.bot_type.id;
            if (!acc[botTypeId]) {
                acc[botTypeId] = []; // 如果该类型不存在，初始化一个空数组
            }
            acc[botTypeId].push(bot); // 将当前 bot 添加到对应的数组中
            return acc;
        }, {});
        setBots(groupedBots);
    };

    return (
        <ModelStoreView
            {...{
                data,
                bots
            }}
        />
    );
}

export default ModelStoreContainer;
