import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    searchApp,
    statisticsApp,
    updateApp
} from '@/service/calendar_server';

import useSWR from 'swr';

// 定义应用数据类型
export interface CalendarModel {
    id: number;
    name: string;
    category: string;
    image_url: string;
    description: string;
    from_date: string;
    to_date: string;
    pre_from_date: string;
    pre_to_date: string;
    view_count: number;
    reference_url: string;
    status: string;
    created_at: string;
    updated_at: string;

    is_collected?: boolean;
}

// 应用数据 fetcher 函数
const appsFetcher = async (options?: {}) => {
    const { data, error } = await getAllApps(options);
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useCalendarData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(() => options, appsFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data as CalendarModel[],
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

export const useCalendarDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_calendar_' + id,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CalendarModel | undefined,
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

export const useCalendarDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_calendar_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CalendarModel | undefined,
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

export const useCalendarStatisticsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_calendar_statistics',
        () => appStatisticsFetcher(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CalendarModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useCalendarOperations = () => {
    // const { mutate } = usePromptData(); // 移动到顶层
    const addCalendar = async (appData: Omit<CalendarModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateCalendar = async (id: number, updatedData: Partial<CalendarModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteCalendar = async (id: number) => {
        return await deleteApp(id);
    };

    const searchCalendar = async (options?: any) => {
        return handleAppOperation(async () => {
            return await searchApp(options);
        });
    };
    return { addCalendar, updateCalendar, deleteCalendar, searchCalendar };
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
