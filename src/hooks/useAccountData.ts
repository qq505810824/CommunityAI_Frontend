import {
    collectPrompt
} from '@/service/account_server';


export const useAccontOperations = () => {
    // const { mutate } = usePromptData(); // 移动到顶层
    const collectPromptById = async (promptId: number, accountId: string) => {
        try {
            const result = await collectPrompt(promptId, accountId);
            // 直接返回 service 层的结果，不再包装
            return result;
        } catch (error) {
            console.error('收藏操作失败:', error);
            return { success: false, error };
        }
    };

    return { collectPromptById };
};

// 删除或修改通用处理函数，因为它改变了返回值结构
// const handleAppOperation = async (operation: () => Promise<any>) => {
//     try {
//         const { data, error } = await operation();
//         if (error) throw error;
//         return { data, error: null };
//     } catch (error) {
//         return { data: null, error };
//     }
// };
