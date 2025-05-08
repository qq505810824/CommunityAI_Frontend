

export interface SpuInfo {
    poi_id: string;
    product_id: string;
    product_title: string;
    web_url: string;
}

export interface AuthorTag {
    first: string;
    primary: boolean;
    second: string[];
    third: string[] | null;
}

export interface AuthorInfo {
    distinct: string;
    total_comment: number;
    author_id: string;
    following_count: number;
    label: string;
    mm_index: number;
    verify_name: string;
    comment_avg: number;
    is_delete: number;
    mark_delete: number;
    self_shop_id: string;
    share_avg: number;
    is_brand_self_author: boolean;
    self_brand_code: string;
    short_id: string;
    total_amount_30: number;
    total_favorited: number;
    unique_id: string;
    avatar: string;
    dongtai_count: number;
    total_share: number;
    update_time: string;
    verification_type: number;
    aweme_count: number;
    gender: number;
    tags: AuthorTag[];
    follower_count: number;
    city: string;
    country: string;
    digg_avg: number;
    nickname: string;
    province: string;
    single_tags: AuthorTag;
    birthday: string;
    is_shop_author: boolean;
    school_name: string;
    signature: string;
    commerce: number;
}

export interface AwemeInfo {
    play_count_v2_text: string;
    product_volume_exist: boolean;
    aweme_id: string;
    aweme_title: string;
    digg_count: number;
    is_delete: number;
    mark_delete: number;
    play_url: string;
    update_time: string;
    product_volume_text: string;
    aweme_create_time: string;
    collect_count: number;
    forward_count: number;
    product_amount_text_cmm_ind: string;
    product_amount_text: string;
    total_amount_text: string;
    author_id: string;
    good_sales: number;
    play_count_v2: number;
    hot_words: string[];
    is_data_today_refreshed: boolean;
    search_world: string[];
    total_volume: number;
    aweme_cover: string;
    category: string;
    group_purchase_label: string;
    play_count: number;
    product_amount: number;
    product_volume: number;
    share_count: number;
    total_amount: number;
    aweme_create_time_format: string;
    download_count: number;
    music_id: string;
    total_volume_text: string;
    promotion_id: string;
    total_amount_text_cmm_ind: string;
    is_data_refreshing: boolean;
    play_count_v1: number;
    product_amount_exist: boolean;
    platform: string;
    play_count_text: string;
    comment_count: number;
    exist: boolean;
    mm_index: number;
    total_volume_text_cmm_ind: string;
    aweme_url: string;
    duration: number;
    product_volume_text_cmm_ind: string;
    is_hot: number
}

export interface PoiInfo {
    poi_id: string;
    poi_name: string;
}

export interface ProductInfo {
    promotion_id: string;
    title: string;
    image: string;
    link: string;
}

export interface ChanHotsModel {
    spu_info: SpuInfo;
    author_info: AuthorInfo;
    aweme_info: AwemeInfo;
    is_aweme_unlock: number;
    is_fav: number;
    poi_info: PoiInfo;
    product_info: ProductInfo;
}