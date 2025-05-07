import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    searchApp,
    statisticsApp,
    updateApp
} from '@/service/hots_server';
import useSWR from 'swr';

// 定义应用数据类型
export type HotModel = {
    id: number;
    category?: string;

    rankPosition?: number;
    title?: string;
    coverUrl?: string;
    hotWords?: [];

    collectCount?: number;
    commentCount?: number;
    fans?: number;
    likeCount?: number;
    shareCount?: number;

    userId?: string;
    userHeadUrl?: string;
    userName?: string;
    // collectStatus?: number;

    userType?: string;

    photoId?: string;
    photoType?: string;

    videoDuration?: number;
    tag_main?: string;
    tag_sub?: string;

    video_tag_name_lv1?: string;
    video_tag_name_lv2?: string;

    note_counter_type_v1?: string;
    note_counter_type_v2?: string;

    userTypeFirst?: string;
    userTypeSecond?: string;

    publicTime?: string;

    created_at: string;
    updated_at: string;
};

export enum PhotoType {
    Video = 'video',
    Normal = 'normal'
}

export enum ContentType {
    XiaoHongShu = 'xhs',
    Douyin = 'dy',
    KuaiShou = 'ks'
}

export const IPlatform = {
    xhs: {
        name: '小红书',
        video_link: 'https://www.xiaohongshu.com/explore/',
        icon: 'https://chs.newrank.cn/main/logo/logo-xiaohongshu.png'
    },
    dy: {
        name: '抖音',
        video_link: 'https://www.douyin.com/video/',
        icon: 'https://chs.newrank.cn/main/logo/logo-douyin.png'
    },
    ks: {
        name: '快手',
        video_link: 'https://www.kuaishou.com/short-video/',
        icon: 'https://chs.newrank.cn/main/logo/logo-kuaishou.png'
    }
};

// 应用数据 fetcher 函数
const appsFetcher = async (options: string) => {
    console.log('options', options);
    const { data, error } = await getAllApps(options);
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useHotsData = (category: string, options = {}) => {
    console.log('category', category);

    const { data, error, isLoading, mutate } = useSWR(
        ['all-hots', category],
        ([_, category]) => appsFetcher(category),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // 1分钟内不重复请求
            ...options
        }
    );

    return {
        data: data as HotModel[],
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailFetcher = async (id: number, accountId?: string) => {
    const { data, error } = await getAppDetail(id, accountId);
    if (error) throw error;
    return data || [];
};

export const useHotsDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_hots_' + id,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as HotModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailByIdFetcher = async (id: number) => {
    const { data, error } = await getAppDetailById(id);
    if (error) throw error;
    return data || [];
};

export const useHotsDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_hots_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as HotModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

const appStatisticsFetcher = async () => {
    const { data, error } = await statisticsApp();
    if (error) throw error;
    return data || [];
};

export const useHotsStatisticsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_hots_statistics',
        () => appStatisticsFetcher(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as HotModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useHotsOperations = () => {
    // const { mutate } = usePromptData(); // 移动到顶层
    const addHots = async (appData: Omit<HotModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateHots = async (id: number, updatedData: Partial<HotModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteHots = async (id: number) => {
        return await deleteApp(id);
    };

    const searchHots = async (key: string, options?: string) => {
        return handleAppOperation(async () => {
            return await searchApp(key, options);
        });
    };
    return { addHots, updateHots, deleteHots, searchHots };
};

// 处理应用操作的通用函数
const handleAppOperation = async (operation: () => Promise<any>) => {
    try {
        const { data, error } = await operation();
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
