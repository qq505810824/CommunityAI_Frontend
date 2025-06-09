import { AccountModel } from '@/models/Account';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const db = 'account';

export const collectPrompt = async (promptId: number, accountId: string) => {
    try {
        const { data: existingCollects, error: checkError } = await supabase
            .from('account_prompts')
            .select('*')
            .eq('account_id', accountId)
            .eq('prompt_id', promptId);

        if (checkError) {
            throw checkError;
        }

        const isCollected = existingCollects && existingCollects.length > 0;

        if (isCollected) {
            // 使用事务同时处理取消收藏和减少计数
            const { data, error } = await supabase.rpc('handle_uncollect', {
                p_account_id: accountId,
                p_prompt_id: promptId
            });

            if (error) throw error;

            return { success: true, action: 'uncollect' };
        } else {
            // 使用事务同时处理添加收藏和增加计数
            const { data, error } = await supabase.rpc('handle_collect', {
                p_account_id: accountId,
                p_prompt_id: promptId
            });

            if (error) throw error;

            return { success: true, action: 'collect' };
        }
    } catch (error) {
        console.error('收藏操作失败:', error);
        return { success: false, error };
    }
};

export const collectCalendar = async (id: number, accountId: string) => {
    try {
        const { data: existingCollects, error: checkError } = await supabase
            .from('account_calendar')
            .select('*')
            .eq('account_id', accountId)
            .eq('calendar_id', id);

        if (checkError) {
            throw checkError;
        }

        const isCollected = existingCollects && existingCollects.length > 0;

        if (isCollected) {
            // 使用事务同时处理取消收藏和减少计数
            const { data, error } = await supabase.rpc('handle_uncollect_calendar', {
                p_account_id: accountId,
                p_calendar_id: id
            });

            if (error) throw error;

            return { success: true, action: 'uncollect' };
        } else {
            // 使用事务同时处理添加收藏和增加计数
            const { data, error } = await supabase.rpc('handle_collect_calendar', {
                p_account_id: accountId,
                p_calendar_id: id
            });

            if (error) throw error;

            return { success: true, action: 'collect' };
        }
    } catch (error) {
        console.error('收藏操作失败:', error);
        return { success: false, error };
    }
};

// 获取用户收藏的prompts列表
export const getUserCollections = async (accountId: string) => {
    try {
        const { data, error } = await supabase
            .from('prompts')
            .select(
                `
                *,
                account_prompts!inner(*)
            `
            )
            .eq('account_prompts.account_id', accountId);

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('获取收藏列表失败:', error);
        return { success: false, error };
    }
};

// 获取用户收藏的calendar列表
export const getMyCollectCalendars = async (accountId: string) => {
    try {
        const { data, error } = await supabase
            .from('calendars')
            .select(
                `id,name,category,image_url,
                account_calendar!inner(*) `
            )
            .eq('account_calendar.account_id', accountId);

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('获取收藏列表失败:', error);
        return { success: false, error };
    }
};

export const getAllAccounts = async () => {
    try {
        const { data, error } = await supabase
            .from(db)
            .select('*')
            .order('updated_at', { ascending: true });

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const getAppDetail = async (id: string) => {
    try {
        // 构建查询任务数组

        const { data, error } = await supabase.from(db).select('*').eq('id', id).single();

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('获取应用详情失败:', error);
        return { data: null, error };
    }
};

export const updateApp = async (id: string, appData: Partial<AccountModel>) => {
    try {
        // 其他更新操作保持不变
        const { data, error } = await supabase.from(db).update(appData).eq('id', id).select();
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('更新应用失败:', error);
        return { success: false, error };
    }
};

export const deleteApp = async (id: string) => {
    try {
        const { data, error } = await supabase.from(db).delete().eq('id', id);

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
            .or(`name.ilike.%${key}%,email.ilike.%${key}%,nickname.ilike.%${key}%`);

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};
