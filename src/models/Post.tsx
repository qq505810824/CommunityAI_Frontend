import { AccountModel } from "./Account";
import { ChannelModel } from "./Channel";

export type PostModel = {
    id: number;
    title: string;
    description: string;

    owner: AccountModel
    channel_id: string;
    channel: ChannelModel;

    meta?: any;

    created_at: string;
    updated_at: string;
}
