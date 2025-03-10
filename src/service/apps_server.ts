import { AppModel } from '@/hooks/useAppsData';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const db = 'apps_db';
export const getAllApps = async () => {
    try {
        const { data, error } = await supabase.from(db).select('*');

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const createApp = async (appData: AppModel) => {
    try {
        const { data, error } = await supabase.from(db).insert([appData]).select();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('创建应用失败:', error);
        return { success: false, error };
    }
};
