import { createApp, deleteApp, getAllApps, getArticleDetail, updateApp } from '@/service/articles_server';
import useSWR from 'swr';

// 定义应用数据类型
export interface ArticleModel {
    id: number;
    title: string;
    description: string;
    status: number;
    created_at: string;
    updated_at: string
}

// 应用数据 fetcher 函数
const appsFetcher = async () => {
    const { data, error } = await getAllApps();
    if (error) throw error;
    return data || [];
};




// 自定义 hook 使用 SWR 获取所有应用
export const useArticleData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR('all-articles', appsFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1分钟内不重复请求
        ...options
    });

    return {
        data: data as ArticleModel[],
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailFetcher = async (id: number) => {
    const { data, error } = await getArticleDetail(id);
    if (error) throw error;
    return data || [];
};

export const useArticleDetailData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR("detail_article_" + id, () => appDetailFetcher(id), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 20000, // 1分钟内不重复请求
        ...options
    });
    return {
        data: data as ArticleModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useArticleOperations = () => {
    const { mutate } = useArticleData(); // 移动到顶层
    const addArticle = async (appData: Omit<ArticleModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateArticle = async (id: number, updatedData: Partial<ArticleModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteArticle = async (id: number) => {
        return handleAppOperation(async () => {
            return await deleteApp(id);
        });
    };
    return { addArticle, updateArticle, deleteArticle, mutate };
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