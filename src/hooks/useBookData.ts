import { BookModel } from '@/models/Book';
import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    getRandomApps,
    searchApp,
    updateApp
} from '@/service/book_server';

import useSWR from 'swr';


export const showCalendarValues = (item: BookModel) => {

};

// 应用数据 fetcher 函数
const appsFetcher = async (options?: {}) => {
    const { data, error } = await getAllApps(options);
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useBookData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR("boos", () => appsFetcher(options), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data as BookModel[],
        isLoading,
        isError: error,
        mutate
    };
};

// 自定义 hook 使用 SWR 获取所有应用
export const randomBookData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(() => options, getRandomApps, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data?.data as BookModel[],
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

export const useBookDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_book_' + id,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as BookModel | undefined,
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

export const useBookDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_book_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as BookModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useBookOperations = () => {
    const addBook = async (appData: Omit<BookModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateBook = async (id: number, updatedData: Partial<BookModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteBook = async (id: number) => {
        return await deleteApp(id);
    };

    const searchBook = async (options?: any) => {
        return handleAppOperation(async () => {
            return await searchApp(options);
        });
    };

    const mutate = async (options?: any) => {
        return handleAppOperation(async () => {
            return useBookData(options);
        });
    };
    return { addBook, updateBook, deleteBook, searchBook, mutate };
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
