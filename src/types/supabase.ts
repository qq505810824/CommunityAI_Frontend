export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    name: string | null;
                    nickname: string | null;
                    age: string | null;
                    description: string | null;
                    sex: 'male' | 'female' | 'other' | null;
                    updated_at: string | null;
                    created_at: string | null;
                };
                Insert: {
                    id: string;
                    name?: string | null;
                    nickname?: string | null;
                    age?: string | null;
                    description?: string | null;
                    sex?: 'male' | 'female' | 'other' | null;
                    updated_at?: string | null;
                    created_at?: string | null;
                };
                Update: {
                    id?: string;
                    name?: string | null;
                    nickname?: string | null;
                    age?: string | null;
                    description?: string | null;
                    sex?: 'male' | 'female' | 'other' | null;
                    updated_at?: string | null;
                    created_at?: string | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
    };
}
