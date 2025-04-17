import PromptItem from '@/app/components/admin/prompts/PromptItem';
import TableSheet from '@/app/components/base/table';
import SearchInputView from '@/app/components/common/Views/SearchInputView';
import { PromptModel } from '@/hooks/usePromptData';
import { Button, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    data: any;
    isLoading: any;
    prompts: PromptModel[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
    onDelete: (id: number) => void;
}

function PromptView(props: ViewProps) {
    const { isLoading, prompts, onClose, handleSearch, searching, onDelete } = props;
    const router = useRouter();

    return (
        <>
            <div className="w-full flex justify-between items-center my-4">
                <Typography level="h3">Prompt知识库</Typography>
                <Button
                    variant="solid"
                    color="primary"
                    onClick={() => router.push('/admin/prompts/create')}
                >
                    +新增
                </Button>
            </div>
            <div>
                <SearchInputView
                    className={'w-full rounded-full mb-4'}
                    handleSearch={handleSearch}
                    loading={searching}
                    placeholder="Search"
                    sx={{
                        borderRadius: 100
                    }}
                />
            </div>
            {/* 给表格外层容器添加样式，使其内容超出时可横向滚动 */}
            <div className="w-full overflow-x-scroll">
                <TableSheet className=" ">
                    {' '}
                    {/* 给表格设置最小宽度 */}
                    <thead>
                        <tr>
                            <th className="text-center">标题</th>
                            <th className="text-center">标签</th>
                            <th className="text-center">浏览数</th>
                            <th className="text-center">点赞数</th>
                            <th className="text-center">收藏数</th>
                            <th className="text-center">分享数</th>
                            <th className="text-center">复制数</th>
                            <th className="text-center">创建者</th>
                            <th className="text-center">更新时间</th>
                            <th className="text-center">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prompts.map((row) => (
                            <PromptItem
                                prompt={row}
                                key={row.id}
                                onDelete={() => onDelete(row.id)}
                            />
                        ))}
                    </tbody>
                </TableSheet>
            </div>
            {/* 当没有提示信息且不在加载状态时显示提示 */}
            {prompts.length === 0 && !isLoading && (
                <Typography level="h4" sx={{ padding: 10 }}>
                    No prompts found.
                </Typography>
            )}
        </>
    );
}

export default PromptView;
