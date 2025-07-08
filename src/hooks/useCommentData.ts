import { CommentModel } from '@/models/Comment';
import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    getRandomApps,
    likeApp,
    searchApp,
    statisticsApp,
    updateApp
} from '@/service/comment_server';
import moment from 'moment';

import useSWR from 'swr';

export const showCommentValues = (item: CommentModel) => {
    let status = '';

    return {
        ...item,
        status: status,
        created_at: moment(item.created_at).fromNow()
    };
};

// 应用数据 fetcher 函数
const appsFetcher = async (options?: {}) => {
    const { data, error } = await getAllApps(options);
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useCommentData = (options: any) => {
    const { data, error, isLoading, mutate } = useSWR(
        options?.post_id ? 'comments_' + options.post_id : null,
        () => appsFetcher(options),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true
            // dedupingInterval: 60000 // 1分钟内不重复请求
        }
    );

    return {
        data: data as CommentModel[],
        isLoading,
        isError: error,
        mutate
    };
};

export const useAllCommentData = (options: any) => {
    const { data, error, isLoading, mutate } = useSWR('comments_all', () => appsFetcher(options), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data as CommentModel[],
        isLoading,
        isError: error,
        mutate
    };
};

// 自定义 hook 使用 SWR 获取所有应用
export const randomCommentData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(() => options, getRandomApps, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data?.data as CommentModel[],
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

export const useCommentDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_comment_' + id,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CommentModel | undefined,
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

export const useCommentDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_comment_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CommentModel | undefined,
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

export const useCommentStatisticsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_comment_statistics',
        () => appStatisticsFetcher(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CommentModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useCommentOperations = () => {
    const addComment = async (appData: Omit<CommentModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateComment = async (id: number, updatedData: Partial<CommentModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteComment = async (id: number) => {
        return await deleteApp(id);
    };

    const searchComment = async (options?: any) => {
        return handleAppOperation(async () => {
            return await searchApp(options);
        });
    };

    const likeComment = async (id: number, accountId: string) => {
        return handleAppOperation(async () => {
            return await likeApp(id, accountId);
        });
    };

    const mutate = async (options?: any) => {
        return handleAppOperation(async () => {
            return useCommentData(options);
        });
    };
    return { addComment, updateComment, deleteComment, searchComment, likeComment, mutate };
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
