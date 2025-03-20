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
