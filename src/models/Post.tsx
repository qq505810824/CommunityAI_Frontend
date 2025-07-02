import { AccountModel } from "./Account";
import { ChannelModel } from "./Channel";

export type PostModel = {
    id: number;
    title: string;
    description: string;

    owner: AccountModel
    channel: ChannelModel;
    favorit_count: number
    attachments?: []

    meta?: any;
    role?: string;

    created_at: string;
    updated_at: string;
}
