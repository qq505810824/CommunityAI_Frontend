import { useModalContext } from '@/context/modal-context';
import { ArticleModel, useArticleOperations } from '@/hooks/useArticleData';
import { PlusIcon } from '@heroicons/react/24/outline';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import MoreVert from '@mui/icons-material/MoreVert';
import { Button, Menu, MenuItem } from '@mui/joy';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MenuButton from '@mui/joy/MenuButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    data: ArticleModel[];
    onSearch?: any;
    handleDeleteById?: any;
}

function PositionedMenu(props: any) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            >
                <MoreVert />
            </MenuButton>
            <Menu placement="bottom-end">
                <MenuItem onClick={props && props.handleUpdate}>
                    <ListItemDecorator>
                        <Edit />
                    </ListItemDecorator>{' '}
                    Edit post
                </MenuItem>
                <ListDivider />
                <MenuItem color="danger" onClick={props && props.handleDelete}>
                    <ListItemDecorator>
                        <DeleteForever />
                    </ListItemDecorator>{' '}
                    Delete
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}

function ArticleView(props: ViewProps) {
    const { data, onSearch, handleDeleteById } = props;
    const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
    const [currentArticleId, setCurrentArticleId] = useState<number | null>(null);
    const { setShowConfirmDelete } = useModalContext();
    const { deleteArticle, mutate } = useArticleOperations(); // 使用合并后的 hook
    const router = useRouter();

    const handleUpdate = (id: number) => {
        router.push(`/articles/${id}/edit`);
    };
    const handleDelete = async (id: number) => {
        console.log('id', id);
        setShowConfirmDelete({
            payload: {},
            onSaveCallback: async () => {
                const { error } = await deleteArticle(id); // 调用 deleteArticle
                if (error) {
                    console.error('删除失败:', error);
                } else {
                    mutate();
                }
            }
        });
    };

    const handleSelectArticle = (id: number) => {
        setSelectedArticles((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedArticles(
            selectedArticles.length === data.length ? [] : data.map((article) => article?.id || 0)
        );
    };

    return (
        <div className="w-full p-4 space-y-4">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Articles</h1>
                <Button
                    startDecorator={<PlusIcon className="w-4" />}
                    onClick={() => {
                        router.push('/articles/create');
                    }}
                >
                    新增
                </Button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col" className="px-4 py-3 bg-gray-50 w-10">
                                    <div className="flex justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedArticles.length === data.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 bg-gray-50 text-left text-sm font-medium  uppercase tracking-wider"
                                >
                                    标题
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 bg-gray-50 text-left text-sm font-medium  uppercase tracking-wider"
                                >
                                    作者
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 bg-gray-50 text-left text-sm font-medium  uppercase tracking-wider"
                                >
                                    发布日期
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 bg-gray-50 text-left text-sm font-medium  uppercase tracking-wider"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 bg-gray-50 text-left text-sm font-medium  uppercase tracking-wider"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((article) => (
                                <tr key={article.id} className="transition-colors hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap w-10">
                                        <div className="flex justify-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedArticles.includes(article.id)}
                                                onChange={() => handleSelectArticle(article.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            <a
                                                className=" hover:underline text-blue-500"
                                                onClick={() => {
                                                    router.push(`/articles/${article.id}`);
                                                }}
                                            >
                                                {article.title}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{}</div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {article.created_at}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {article.status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-left">
                                        {PositionedMenu({
                                            handleDelete: () => handleDelete(article.id || 0),
                                            handleUpdate: () => handleUpdate(article.id || 0)
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ArticleView;
