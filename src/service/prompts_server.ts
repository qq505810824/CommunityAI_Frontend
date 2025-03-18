import { PromptModel } from '@/hooks/usePromptData';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const db = 'prompts';
export const getAllApps = async () => {
    try {
        const { data, error } = await supabase.from(db).select('*, account(id,name,email,avatar)');

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const getAppDetail = async (id: number) => {
    try {
        const { data, error } = await supabase
            .from(db)
            .select('*, account(id,name,email,avatar)')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const createApp = async (appData: Omit<PromptModel, 'id'>) => {
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

export const updateApp = async (id: number, appData: Partial<PromptModel>) => {
    try {
        const { data, error } = await supabase.from(db).update(appData).eq('id', id).select();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('更新应用失败:', error);
        return { success: false, error };
    }
};

export const deleteApp = async (id: number) => {
    try {
        const { error } = await supabase.from(db).delete().eq('id', id);

        if (error) {
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error('删除应用失败:', error);
        return { success: false, error };
    }
};

export const searchApp = async (key: string) => {
    try {
        const { data, error } = await supabase
            .from(db)
            .select('*')
            .or(
                `title.ilike.%${key}%,description.ilike.%${key}%,prompt.ilike.%${key}%,tags.ilike.%${key}%`
            );

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};
