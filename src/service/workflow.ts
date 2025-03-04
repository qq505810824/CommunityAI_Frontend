import { ParametersResponse } from '@/models/workflow';
import { Fetcher } from 'swr';
import { get, ssePost } from './base';
const baseURL = process.env.NEXT_PUBLIC_DIFY_SERVER;

export const fetchAppParams: Fetcher<ParametersResponse, { url: string }> = () => {
    return get<ParametersResponse>(baseURL + '/parameters', {}, { isDifyAPI: true });
};

// export const sendWorkflowMessage: Fetcher<
//     ResultResponse,
//     { url: string; body: Record<string, any> }
// > = ({ url, body }) => {
//     return post<ResultResponse>(baseURL + '/workflows/run', { body }, { isDifyAPI: true });
// };

export const sendWorkflowMessage = async (
    body: Record<string, any>,
    {
        onWorkflowStarted,
        onNodeStarted,
        onNodeFinished,
        onWorkflowFinished,
        onTextChunk,
        onTextReplace
    }: {
        onWorkflowStarted: any;
        onNodeStarted: any;
        onNodeFinished: any;
        onWorkflowFinished: any;
        onTextChunk: any;
        onTextReplace: any;
    }
) => {
    return ssePost(
        baseURL + '/workflows/run',
        {
            body: {
                ...body,
                response_mode: 'streaming'
            }
        },
        {
            onNodeStarted,
            onWorkflowStarted,
            onWorkflowFinished,
            onNodeFinished,
            onTextChunk,
            onTextReplace
        }
    );
};
