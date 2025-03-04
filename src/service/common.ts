import { API_PREFIX } from '@/config';
import type { CommonResponse, LoginResponse } from '@/models/common';
import type { Fetcher } from 'swr';
import { del, get, post, put } from './base';

export const login: Fetcher<
    LoginResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(API_PREFIX + url, { body }, { needAllResponseContent: true, isLoginAPI: true });
};

export const getTags: Fetcher<CommonResponse, { url: string; params: Record<string, any> }> = ({
    url,
    params
}) => {
    return get<CommonResponse>(API_PREFIX + url, { params });
};

export const updateLinkSetInfo: Fetcher<
    CommonResponse,
    { id: number; name: string; description: string }
> = ({ id, name, description }) => {
    return put<CommonResponse>(`link_sets/${id}.json`, { body: { name, description } });
};

export const deleteLinkSet: Fetcher<CommonResponse, string> = (id) => {
    return del<CommonResponse>(`link_sets/${id}.json`);
};

export const fetchAppDetail = ({ url, id }: { url: string; id: string }) => {
    return get<CommonResponse>(`${url}/${id}`);
};
