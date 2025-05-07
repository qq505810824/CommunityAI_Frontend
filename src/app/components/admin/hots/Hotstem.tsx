import { useModalContext } from '@/context/modal-context';
import { ContentType, HotModel, IPlatform, PhotoType } from '@/hooks/useHotData';
import { usePromptOperations } from '@/hooks/usePromptData';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: HotModel;
    onDelete: () => void;
}

export default function HotsItem(props: ViewProps) {
    const { product, onDelete } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        if (product.category == ContentType.Douyin) {
            if (product.photoType == PhotoType.Video) {
                window.open(`https://www.douyin.com/video/${product.photoId}`, '_blank');
            } else {
                window.open(`https://www.douyin.com/video/${product.photoId}`, '_blank');
            }
        } else if (product.category == ContentType.KuaiShou) {
            if (product.photoType == PhotoType.Video) {
                window.open(`https://www.kuaishou.com/short-video/${product.photoId}`, '_blank');
            } else {
                window.open(`https://www.kuaishou.com/short-video/${product.photoId}`, '_blank');
            }
        } else if (product.category == ContentType.XiaoHongShu) {
            if (product.photoType == PhotoType.Video) {
                window.open(`https://www.xiaohongshu.com/explore/${product.photoId}`, '_blank');
            } else {
                window.open(`https://www.xiaohongshu.com/explore/${product.photoId}`, '_blank');
            }
        }
    };

    const handleEdit = () => {
        if (product) router.push(`/admin/hots/${product.id}/edit`);
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
                <td>{product.rankPosition}</td>
                <td>
                    {product.category && (IPlatform as Record<string, any>)[product.category].name}
                </td>
                <td>
                    <Tooltip title={product.title}>
                        <div
                            className="text-ellipsis overflow-hidden text-blue-500 underline cursor-pointer"
                            onClick={handleClick}
                        >
                            {product.title}
                        </div>
                    </Tooltip>
                </td>
                <td>
                    <div className="flex flex-row items-center  overflow-hidden space-x-2">
                        {/* {prompt?.tags?.map((tag: any, index: number) => (
                            <TagView tag={tag} key={index} />
                        ))} */}
                    </div>
                </td>
                <td>{product.likeCount || 0}</td>
                <td>{product.commentCount || 0}</td>
                <td>{product.collectCount || 0}</td>
                <td>{product.shareCount || 0}</td>
                <td style={{ textAlign: 'center' }}>
                    <p className=" font-semibold">
                        {product.tag_main}
                    </p>
                    {product.tag_sub}
                </td>
                <td>{product.publicTime}</td>
                <td className="hidden">
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
