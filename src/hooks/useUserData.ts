import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    searchApp,
    statisticsApp,
    updateApp
} from '@/service/users_server';
import useSWR from 'swr';

// 定义应用数据类型
export type UserModel = {
    id: string;
    email?: string;
    name: string;
    created_at?: string;
    password?: string;
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
        data: data as UserModel[],
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailFetcher = async (name: string, password: string) => {
    const { data, error } = await getAppDetail(name, password);
    if (error) throw error;
    return data || [];
};

export const useHotsDetailData = (name: string, password: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_users_' + name,
        () => appDetailFetcher(name, password),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as UserModel | undefined,
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
        data: data as UserModel | undefined,
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
        data: data as UserModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useUsersOperations = () => {
    // const { mutate } = usePromptData(); // 移动到顶层
    const addUser = async (appData: Omit<UserModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateHots = async (id: number, updatedData: Partial<UserModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteHots = async (id: number) => {
        return await deleteApp(id);
    };
    const detailById = async (email: string, password: string) => {
        return await getAppDetail(email, password);
    };
    const searchHots = async (key: string, options?: string) => {
        return handleAppOperation(async () => {
            return await searchApp(key, options);
        });
    };
    return { addUser, updateHots, deleteHots, searchHots, detailById };
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
