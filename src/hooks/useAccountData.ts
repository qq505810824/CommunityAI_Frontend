import { AccountModel } from '@/models/Account';
import {
    collectCalendar,
    collectPrompt,
    deleteApp,
    getAllAccounts,
    getAppDetail,
    getMyCollectCalendars,
    searchApp,
    updateApp
} from '@/service/account_server';
import useSWR from 'swr';

// 应用数据 fetcher 函数
const appsFetcher = async () => {
    const { data, error } = await getAllAccounts();
    if (error) throw error;
    return data || [];
};

export const useAccountData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR('all-account', appsFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1分钟内不重复请求
        ...options
    });

    return {
        data: data as AccountModel[],
        isLoading,
        isError: error,
        mutate
    };
};

export const useMyCollectCalendarsData = (account_id: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'my_calendars_' + account_id,
        () => getMyCollectCalendars(account_id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // 1分钟内不重复请求
            ...options
        }
    );

    return {
        data: data,
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailFetcher = async (id: string) => {
    const { data, error } = await getAppDetail(id);
    if (error) throw error;
    return data || [];
};

export const useAccountDetailData = (id: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_account_' + id,
        () => appDetailFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as AccountModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useAccountOperations = () => {
    // const { mutate } = usePromptData(); // 移动到顶层

    const updateAccount = async (id: string, updatedData: Partial<AccountModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteAccount = async (id: string) => {
        return await deleteApp(id);
    };

    const searchAccount = async (key: string) => {
        return handleAppOperation(async () => {
            return await searchApp(key);
        });
    };

    const collectCalendarById = async (id: number, accountId: string) => {
        try {
            const result = await collectCalendar(id, accountId);
            // 直接返回 service 层的结果，不再包装
            return result;
        } catch (error) {
            console.error('收藏操作失败:', error);
            return { success: false, error };
        }
    };

    const collectPromptById = async (id: number, accountId: string) => {
        try {
            const result = await collectPrompt(id, accountId);
            // 直接返回 service 层的结果，不再包装
            return result;
        } catch (error) {
            console.error('收藏操作失败:', error);
            return { success: false, error };
        }
    };

    return { updateAccount, deleteAccount, searchAccount, collectCalendarById, collectPromptById };
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
