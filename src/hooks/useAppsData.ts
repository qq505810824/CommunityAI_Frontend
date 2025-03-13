import { createApp, getAllApps } from '@/service/apps_server';
import useSWR from 'swr';

// 定义应用数据类型
export interface AppModel {
    id?: string;
    title: string;
    description: string;
    category: string;
    img_src: string;
    data_url: string;
    // 添加其他应用属性...
}

// 应用数据 fetcher 函数
const appsFetcher = async () => {
    const { data, error } = await getAllApps();
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useAppsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR('all-apps', appsFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1分钟内不重复请求
        ...options
    });

    return {
        apps: data as AppModel[],
        isLoading,
        isError: error,
        mutate
    };
};

// 根据类别筛选应用
export const useAppsByCategory = (category: string) => {
    const { apps, isLoading, isError, mutate } = useAppsData();

    const filteredApps =
        apps && category ? apps.filter((app) => app.category.includes(category)) : apps || [];

    return {
        apps: filteredApps as AppModel[],
        isLoading,
        isError,
        mutate
    };
};

// 根据关键词搜索应用
export const useSearchApps = (keyword: string) => {
    const { apps, isLoading, isError, mutate } = useAppsData();

    const searchedApps =
        apps && keyword
            ? apps.filter(
                (app) =>
                    app.title?.toLowerCase().includes(keyword.toLowerCase()) ||
                    app.description?.toLowerCase().includes(keyword.toLowerCase())
            )
            : [];

    return {
        apps: searchedApps as AppModel[],
        isLoading,
        isError,
        mutate
    };
};

export const useCreateApp = () => {
    const { mutate } = useAppsData();

    const addNewApp = async (appData: Omit<AppModel, 'id'>) => {
        try {
            const { data, error } = await createApp(appData);
            if (error) throw error;

            // 创建成功后刷新应用列表
            await mutate();

            return { data, error: null };
        } catch (error) {
            return { data: null, error };
        }
    };

    return { addNewApp };
};
