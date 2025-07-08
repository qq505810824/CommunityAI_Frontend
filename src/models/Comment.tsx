import { AccountModel } from './Account';
import { PostModel } from './Post';

export type CommentModel = {
    id?: number;
    content: string;

    owner?: AccountModel;
    post?: PostModel;

    meta?: any;

    like_count?: number;

    created_at?: string;
};
