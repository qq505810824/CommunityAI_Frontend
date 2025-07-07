import { AccountModel } from './Account';
import { CommunityModel } from './Community';
import { PostModel } from './Post';

export type ChannelModel = {
    id?: number;
    name: string;
    description: string;
    logo?: string;

    owner?: AccountModel;

    community?: CommunityModel;

    category?: string;

    publish: boolean;
    tier?: 'basic' | 'premium' | 'all';

    posts_count?: number;
    last_post?: PostModel;

    meta?: any;

    created_at?: string;
    updated_at?: string;
};
