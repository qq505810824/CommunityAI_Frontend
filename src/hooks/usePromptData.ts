import { AccountModel } from '@/models/Account';
import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    searchApp,
    statisticsApp,
    updateApp
} from '@/service/prompts_server';
import useSWR from 'swr';

// 定义应用数据类型
export interface PromptModel {
    id: number;
    title: string;
    description: string;
    prompt: string;
    type: string;
    tags?: any;
    copy?: number;
    focus?: number;
    share?: number;
    view?: number;
    collect?: number;
    user?: string | null;
    account?: AccountModel;
    created_at: string;
    updated_at: string;

    is_collected?: boolean;
}

// 应用数据 fetcher 函数
const appsFetcher = async () => {
    const { data, error } = await getAllApps();
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const usePromptData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR('all-prompts', appsFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1分钟内不重复请求
        ...options
    });

    return {
        data: data as PromptModel[],
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

export const usePromptDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_prompt_' + id,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as PromptModel | undefined,
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

export const usePromptDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_prompt_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as PromptModel | undefined,
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

export const usePromptStatisticsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_prompt_statistics',
        () => appStatisticsFetcher(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as PromptModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const usePromptOperations = () => {
    // const { mutate } = usePromptData(); // 移动到顶层
    const addPrompt = async (appData: Omit<PromptModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updatePrompt = async (id: number, updatedData: Partial<PromptModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deletePrompt = async (id: number) => {
        return await deleteApp(id);
    };

    const searchPrompt = async (key: string) => {
        return handleAppOperation(async () => {
            return await searchApp(key);
        });
    };
    return { addPrompt, updatePrompt, deletePrompt, searchPrompt };
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
