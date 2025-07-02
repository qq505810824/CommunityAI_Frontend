import { AccountModel } from './Account';
import { CommunityModel } from './Community';

export type ChannelModel = {
    id: number;
    name: string;
    description: string;
    logo: string;

    owner: AccountModel;

    community: CommunityModel;

    category?: string;

    publish: boolean;

    posts_count: number;

    meta?: any;

    created_at: string;
    updated_at: string;
};
