import { useModalContext } from '@/context/modal-context';
import { EnumRegion } from '@/hooks/useCalendarData';
import { usePromptOperations } from '@/hooks/usePromptData';
import { CalendarModel } from '@/models/Calendar';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Chip, Tooltip } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: CalendarModel;
    onDelete: () => void;
    onUpdataStatus: any;
}

export default function CalendarItem(props: ViewProps) {
    const { product, onDelete, onUpdataStatus } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        if (product) {
            window.open(`/calendar/${product.id}`, '_blank');
        }
    };

    const handleEdit = () => {
        if (product) router.push(`/admin/calendars/${product.id}/edit`);
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
                <td>{product.category}</td>
                <td>{EnumRegion[(product.region || 'hk') as keyof typeof EnumRegion]}</td>
                <td>{product.view_count || 0}</td>
                <td className={``}>
                    <Chip color={product.status == 'draft' ? 'danger' : 'success'} size="sm">
                        {product.status == 'draft' ? '待審核' : '已審核'}
                    </Chip>
                </td>
                <td>
                    {product.pre_from_date} - {product.pre_to_date}
                </td>
                <td>
                    {product.from_date} - {product.to_date}
                </td>
                <td>{product.updated_at}</td>
                <td>{product.owner?.name}</td>
                <td>
                    <div className="flex flex-row items-center overflow-hidden space-x-2">
                        <label
                            className="flex flex-row items-center text-white cursor-pointer whitespace-nowrap px-2 py-1 rounded-md  bg-orange-500 hover:bg-orange-600 text-xs"
                            onClick={() =>
                                handleStatus(product.status == 'draft' ? 'success' : 'draft')
                            }
                        >
                            {product.status == 'draft' ? '通過審核' : '存草稿'}
                        </label>
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
                            <TrashIcon className="w-3 h-3 mr-1" /> 刪除
                        </label>
                    </div>
                </td>
            </tr>
        </>
    );
}
