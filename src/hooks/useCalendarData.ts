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
import moment from 'moment';

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
    pdf_url?: string;
    status: string;
    created_at: string;
    updated_at: string;
    region?: string;

    is_collected?: boolean;
    uploadFiles?: File[];
}

export enum EnumRegion {
    mo = '澳門',
    hk = '香港'
}

export const showCalendarValues = (item: CalendarModel) => {
    let status = '';
    const nowDate = moment().format('YYYY-MM-DD');
    // console.log('nowDate', nowDate);
    const from_date = moment(item.from_date).format('YYYY-MM-DD');
    const to_date = moment(item.to_date).format('YYYY-MM-DD');
    const diffDay = moment(item.from_date).diff(nowDate, 'day');

    if (nowDate < from_date) {
        status = '尚餘' + diffDay + '天';
    } else if (nowDate >= from_date && nowDate <= to_date) {
        status = '進行中';
    } else if (nowDate > to_date) {
        status = '已結束';
    }
    return {
        ...item,
        from_date: moment(item.from_date).format('MM月DD日'),
        to_date: moment(item.to_date).format('MM月DD日'),
        status: status,
        created_at: moment(item.created_at).fromNow(),
        updated_at: moment(item.updated_at).fromNow()
    };
};

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

    const mutate = async (options?: any) => {
        return handleAppOperation(async () => {
            return useCalendarData(options);
        });
    };
    return { addCalendar, updateCalendar, deleteCalendar, searchCalendar, mutate };
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
