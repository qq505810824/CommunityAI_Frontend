import { AccountModel } from './Account';
import { ChannelModel } from './Channel';

export type PostModel = {
    id?: number;
    title: string;
    description: string;

    owner?: AccountModel;
    channel?: ChannelModel;
    favorit_count?: number;
    comment_count?: number;
    meta?: any;
    role?: string;

    is_favorit?: boolean;

    uploadFiles?: File[];
    files_url?: any;

    created_at?: string;
    updated_at?: string;
};
