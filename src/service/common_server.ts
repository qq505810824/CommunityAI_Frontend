import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
/**
 * 
 * @param table_name 
 * @param query 
 * column text,
 * column text array,可以设置放array
 * column numberic,
 * column float4,
 * column int,
 * column varchar,
 * column date,
 * column time,timetz,timetamptz,
 * column bool,
 * 
 * @returns 
 */
export const createAppByExecute = async (table_name: string, query: string) => {
    try {
        const { data, error } = await supabase.rpc('execute_sql', {
            query: `
          CREATE TABLE ${table_name} (
            id SERIAL PRIMARY KEY,
            ${query},
            created_at TIMESTAMP DEFAULT NOW()
          );

          -- 启用 RLS
          ALTER TABLE ${table_name} ENABLE ROW LEVEL SECURITY;

          -- 开放所有 Policy
          CREATE POLICY "Allow all access" ON dynamic_table FOR ALL TO public USING (true) WITH CHECK (true);
        `
        });

        // const { data, error } = await supabase.rpc('execute_sql', {
        //     query: `
        //   CREATE TABLE hots (
        //     id SERIAL PRIMARY KEY,
        //     name TEXT,
        //     created_at TIMESTAMP DEFAULT NOW()
        //   );

        //   -- 启用 RLS
        //   ALTER TABLE hots ENABLE ROW LEVEL SECURITY;

        //   -- 开放所有 Policy
        //   CREATE POLICY "Allow all access" ON dynamic_table FOR ALL TO public USING (true) WITH CHECK (true);
        // `
        // });
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
