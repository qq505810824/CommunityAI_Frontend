import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const createAppByExecute = async (table: string, query: string) => {
    try {
        const { data, error } = await supabase.rpc('execute_sql', {
            query: `
          CREATE TABLE hots (
            id SERIAL PRIMARY KEY,
            name TEXT,
            created_at TIMESTAMP DEFAULT NOW()
          );
          ALTER TABLE hots ENABLE ROW LEVEL SECURITY;
        `
        });
        if (error) {
            throw error;
        }
        return { success: true, data };
    } catch (error) {
        console.error('创建应用失败:', error);
        return { success: false, error };
    }
};

export const updateAppByExecute = async (table: string, query: string) => {
    try {
        const { data, error } = await supabase.rpc('execute_sql', {
            query: `
      ALTER TABLE hots ADD COLUMN description TEXT;
    `
        });
        if (error) {
            throw error;
        }
        return { success: true, data };
    } catch (error) {
        console.error('创建应用失败:', error);
        return { success: false, error };
    }
};
