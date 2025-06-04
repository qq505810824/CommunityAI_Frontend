import { EventForm } from '@/app/(adminLayout)/admin/forms/FormContainer';
import { useModalContext } from '@/context/modal-context';
import { usePromptOperations } from '@/hooks/usePromptData';
import { ClipboardDocumentIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/joy';
import copy from 'copy-to-clipboard';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Toast from '../base/toast';

interface ViewProps {
    product: EventForm;
    onDelete: () => void;
    onUpdataStatus: any;
}

export default function FormItem(props: ViewProps) {
    const { product, onDelete, onUpdataStatus } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        if (product) {
            window.open(`/forms/${product.id}`, '_blank');
        }
    };

    const handleEdit = () => {
        if (product) router.push(`/admin/forms/${product.id}/edit`);
    };

    const handleDelete = () => {
        setShowConfirmDelete({
            payload: {
                title: '刪除提示',
                content: '確定刪除嗎？'
            },
            onSaveCallback: () => {
                onDelete();
            }
        });
    };

    const handleStatus = (status: string) => {
        setShowConfirmDelete({
            payload: {
                title: '提示',
                content: '確定操作？'
            },
            onSaveCallback: () => {
                onUpdataStatus(product.id, status);
            }
        });
    };

    const handleSubmission = () => {
        if (product) {
            router.push(`/admin/forms/${product.id}/form_submissions`);
        }
    };

    const handleCopy = () => {
        copy(`https://hkcalendar.vercel.app/forms/${product.id}`);
        Toast.notify({
            message: '複製成功', // 使用翻譯
            type: 'success'
        });
    };
    return (
        <>
            <tr>
                <td>
                    <Tooltip title={product.name}>
                        <div
                            className="text-ellipsis overflow-hidden text-blue-500 underline cursor-pointer"
                            onClick={handleClick}
                        >
                            {product.name}
                        </div>
                    </Tooltip>
                </td>
                <td>{product.description}</td>
                {/* <td>{product.is_active ? '已發佈' : '未發佈'}</td> */}
                <td>{moment(product.created_at).format('YYYY-MM-DD HH:mm')}</td>
                <td>
                    <div className="flex flex-row items-center overflow-hidden space-x-2">
                        <label
                            className="flex flex-row items-center text-white cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 text-xs"
                            onClick={handleSubmission}
                        >
                            查看報名情況
                        </label>
                        <label
                            className="flex flex-row items-center text-blue-500 cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-xs"
                            onClick={handleEdit}
                        >
                            <PencilIcon className="w-3 h-3 mr-1" /> 编辑
                        </label>
                        <label
                            className="flex flex-row items-center text-blue-500 cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-xs"
                            onClick={handleCopy}
                        >
                            <ClipboardDocumentIcon className="h-3 w-3 mr-1" aria-hidden="true" />{' '}
                            複製連結
                        </label>
                        {/* <label
                            className="flex flex-row items-center text-red-500 cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-red-100 hover:bg-red-200 text-xs"
                            onClick={handleDelete}
                        >
                            <TrashIcon className="w-3 h-3 mr-1" /> 刪除
                        </label> */}
                    </div>
                </td>
            </tr>
        </>
    );
}
