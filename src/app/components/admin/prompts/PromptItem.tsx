import { useModalContext } from '@/context/modal-context';
import { PromptModel, usePromptOperations } from '@/hooks/usePromptData';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/joy';
import { useRouter } from 'next/navigation';
import TagView from '../../prompts/TagView';
interface ViewProps {
    prompt: PromptModel;
    onDelete: () => void;
}

export default function PromptItem(props: ViewProps) {
    const { prompt, onDelete } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        if (prompt) router.push(`/prompts/${prompt.id}`);
    };

    const handleEdit = () => {
        if (prompt) router.push(`/admin/prompts/${prompt.id}/edit`);
    };

    const handleDelete = () => {
        setShowConfirmDelete({
            payload: {
                title: '删除提示',
                content: '确定删除该提示吗？'
            },
            onSaveCallback: () => {
                onDelete();
            }
        });
    };
    return (
        <>
            <tr>
                <td>
                    <Tooltip title={prompt.title}>
                        <div
                            className="text-ellipsis overflow-hidden text-blue-500 underline cursor-pointer"
                            onClick={handleClick}
                        >
                            {prompt.title}
                        </div>
                    </Tooltip>
                </td>
                <td>
                    <div className="flex flex-row items-center  overflow-hidden space-x-2">
                        {prompt?.tags?.map((tag: any, index: number) => (
                            <TagView tag={tag} key={index} />
                        ))}
                    </div>
                </td>
                <td>{prompt.view || 0}</td>
                <td>{prompt.focus || 0}</td>
                <td>{prompt.collect || 0}</td>
                <td>{prompt.share || 0}</td>
                <td>{prompt.copy || 0}</td>
                <td>
                    <label className="text-blue-500">{prompt.account?.name || 'Admin'}</label>
                </td>
                <td>{prompt.updated_at}</td>
                <td>
                    <div className="flex flex-row items-center overflow-hidden space-x-2">
                        <label
                            className="flex flex-row items-center text-blue-500 cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-xs"
                            onClick={handleEdit}
                        >
                            <PencilIcon className="w-3 h-3 mr-1" /> 编辑
                        </label>
                        <label
                            className="flex flex-row items-center text-red-500 cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-red-100 hover:bg-red-200 text-xs"
                            onClick={handleDelete}
                        >
                            <TrashIcon className="w-3 h-3 mr-1" /> 删除
                        </label>
                    </div>
                </td>
            </tr>
        </>
    );
}
