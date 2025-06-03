import { useModalContext } from '@/context/modal-context';
import { usePromptOperations } from '@/hooks/usePromptData';
import { UserModel } from '@/hooks/useUserData';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    user: UserModel;
    onDelete: () => void;
}

export default function UserItem(props: ViewProps) {
    const { user, onDelete } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        if (user) router.push(`/accounts/${user.id}`);
    };

    const handleEdit = () => {
        if (user) router.push(`/admin/accounts/${user.id}/edit`);
    };

    const handleDelete = () => {
        setShowConfirmDelete({
            payload: {
                title: '删除用户',
                content: '确定删除该用户吗？'
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
                    <Tooltip title={user.name}>
                        <div
                            className="text-ellipsis overflow-hidden text-blue-500 underline cursor-pointer"
                            onClick={handleClick}
                        >
                            {user.email}
                        </div>
                    </Tooltip>
                </td>
                <td>{user.created_at}</td>
                <td>
                    <div className="flex flex-row items-center overflow-hidden space-x-2 hidden">
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
