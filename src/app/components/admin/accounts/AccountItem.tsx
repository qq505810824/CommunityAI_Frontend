import { useModalContext } from '@/context/modal-context';
import { usePromptOperations } from '@/hooks/usePromptData';
import { AccountModel } from '@/models/Account';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    account: AccountModel;
    onDelete: () => void;
}

export default function AccountItem(props: ViewProps) {
    const { account, onDelete } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        if (account) router.push(`/accounts/${account.id}`);
    };

    const handleEdit = () => {
        if (account) router.push(`/admin/accounts/${account.id}/edit`);
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
                    <Tooltip title={account.name}>
                        <div
                            className="text-ellipsis overflow-hidden text-blue-500 underline cursor-pointer"
                            onClick={handleClick}
                        >
                            {account.name}
                        </div>
                    </Tooltip>
                </td>
                <td>{account.nickname}</td>
                <td>{account.email}</td>
                <td>{account.created_at}</td>
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
