import { AccountModel } from './Account';

export type CommunityModel = {
    id?: number;
    name: string;
    description: string;
    region?: string;
    code?: string;
    owner: AccountModel;
    logo?: string;
    unreadPosts?: number;
    revenue?: number;

    theme: string;

    category?: string;

    publish: boolean;

    channels_count: number;
    courses_count: number;
    events_count: number;
    accounts_count: number;

    meta?: any;

    created_at?: string;
    updated_at?: string;
};
