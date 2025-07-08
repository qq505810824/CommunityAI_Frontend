import { CommentModel } from '@/models/Comment';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const db = 'comments';
export const getAllApps = async (options?: any) => {
    try {
        // console.log('options', options);

        let query = supabase.from(db).select('*,owner(id,name)');

        if (options?.account_id) {
            // 只查当前用户的 like 关系
            // query = query.eq('account_comment.account_id', options.account_id);
        }

        if (options && options.post_id) {
            query = query.eq('post', options.post_id);
        }

        if (options && options.limit) {
            query = query.limit(options.limit);
        }
        // query = query.or(
        //     `content.ilike.%${options?.keyword || ''}%,description.ilike.%${options?.keyword || ''}%`
        // );

        // const { data, error } = await query;
        query = query.order(options?.order || 'created_at', {
            ascending: options.direction == 'asc' ? true : false
        });

        const { data, error } = await query;

        // const { data, error } = await supabase
        //     .from(db)
        //     .select('*')
        //     .or(`status.like.%${options?.status || ''}`)
        //     .order(options?.order || 'created_at', {
        //         ascending: options.direction == 'asc' ? true : false
        //     });

        if (error) {
            throw error;
        }

        // 只返回 is_liked 字段
        const result = Array.isArray(data)
            ? data.map((Comment) => ({
                  ...Comment,
                  is_favorit:
                      Array.isArray(Comment.account_Comment) && Comment.account_Comment.length > 0
              }))
            : [];

        return { data: result, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const getRandomApps = async (options?: any) => {
    try {
        // console.log('options', options);

        let query = supabase.rpc('random_comments', options);
        const { data, error } = await query;
        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const getAppDetail = async (id: number, accountId?: string) => {
    try {
        // 构建查询任务数组
        const tasks = [
            // supabase.rpc('increment_view', { row_id: id }),
            supabase.from(db).select('*').eq('id', id).single()
        ];

        // 如果有用户ID，添加收藏状态查询
        if (accountId) {
            // tasks.push(
            //     supabase
            //         .from('account_Comment')
            //         .select('*')
            //         .eq('Comment_id', id)
            //         .eq('account_id', accountId)
            //     // .single()
            // );
        }

        // 并行执行所有操作
        const [detailResult, collectResult] = await Promise.all(tasks);
        // console.log('collectResult', collectResult);

        if (detailResult.error) {
            throw detailResult.error;
        }

        return {
            data: {
                ...detailResult.data,
                is_collected: collectResult ? collectResult?.data?.length > 0 : false
            },
            error: null
        };
    } catch (error) {
        console.error('获取应用详情失败:', error);
        return { data: null, error };
    }
};

export const getAppDetailById = async (id: number) => {
    try {
        // 构建查询任务数组
        const { data, error } = await supabase.from(db).select('*').eq('id', id).single();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('获取应用详情失败:', error);
        return { data: null, error };
    }
};

export const createApp = async (appData: Omit<CommentModel, 'id'>) => {
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

export const likeApp = async (id: number, accountId?: string) => {
    try {
        let result;

        const { data, error } = await supabase
            .rpc('handle_like_Comment', { p_account_id: accountId, p_Comment_id: id })
            .single();

        if (error) throw error;
        result = { data, error: null };

        return { success: true, data: result.data };
    } catch (error) {
        console.error('更新应用失败:', error);
        return { success: false, error };
    }
};

export const updateApp = async (id: number, appData: Partial<CommentModel>, accountId?: string) => {
    try {
        let result;
        // 如果是更新 focus，使用 RPC
        if ('focus' in appData) {
            const { data, error } = await supabase
                .rpc(appData.focus == 1 ? 'increment_focus' : 'decrement_focus', { row_id: id })
                .single();

            if (error) throw error;
            result = { data, error: null };
        } else if ('like' in appData) {
            const { data, error } = await supabase
                .rpc('handle_like_Comment', { p_account_id: id, p_Comment_id: id })
                .single();

            if (error) throw error;
            result = { data, error: null };
        } else {
            // 其他更新操作保持不变
            const { data, error } = await supabase.from(db).update(appData).eq('id', id).select();

            if (error) throw error;
            result = { data, error: null };
        }

        return { success: true, data: result.data };
    } catch (error) {
        console.error('更新应用失败:', error);
        return { success: false, error };
    }
};

export const deleteApp = async (id: number) => {
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

export const searchApp = async (options?: any) => {
    try {
        let query = supabase.from(db).select('*');
        // console.log('options', options);

        if (options && options.category) {
            query = query.eq('category', options.category);
        }
        if (options && options.status) {
            query = query.or(`status.like.%${options?.status || ''}`);
        }
        query = query.or(
            `name.ilike.%${options?.keyword || ''}%,description.ilike.%${options?.keyword || ''}%`
        );

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const statisticsApp = async () => {
    try {
        // const { data, error } = await supabase
        //     .from(db)
        //     .select('"COUNT"(focus) as total_focus') // 使用 head: true 来获取单个结果（如果有多个聚合列）
        //     .single(); // 使用 .single() 来确保结果是一个对象而不是数组

        const { data, error } = await supabase.rpc('get_prompts_count');
        // const { data, error } = await supabase
        //     .rpc('execute_sql', {
        //         query: `
        //         SELECT
        //           COUNT(focus) AS total_focus
        //         FROM ${db}
        //       `
        //     });
        if (error) {
            console.log('error', error);

            throw new Error(`Database error: ${error.message}, Code: ${error.code}`);
        }

        // Extract the statistical results
        // const totalCollect = data ? Number(data.total_collect) : 0;

        return { data: data, error: null };
    } catch (error) {
        console.error('Failed to count the total number of app collections:', error);
        return { data: null, error: error instanceof Error ? error.message : String(error) };
    }
};
