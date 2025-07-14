// 定义应用数据类型
export interface AccountModel {
    id?: string;
    email?: string;
    name: string;
    nickname?: string;
    avatar: string;
    age?: number;
    sex?: string;
    created_at?: string;
    updated_at?: string;
    password?: string;
    confirmPassword?: string;
}
