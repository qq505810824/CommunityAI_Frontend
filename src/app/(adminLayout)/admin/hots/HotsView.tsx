import HotsItem from '@/app/components/admin/hots/Hotstem';
import TableSheet from '@/app/components/base/table';
import SearchInputView from '@/app/components/common/Views/SearchInputView';
import { HotModel } from '@/hooks/useHotData';
import { Button, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface ViewProps {
    data: any;
    isLoading: any;
    products: HotModel[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
    onDelete: (id: number) => void;
}

function HotsView(props: ViewProps) {
    const { isLoading, products, onClose, handleSearch, searching, onDelete } = props;
    const router = useRouter();
    const { t } = useTranslation();

    const exportDataToCsv = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        let csvContent =
            'category,rankPosition,title,coverUrl,collectCount,commentCount,fans,likeCount,shareCount,userId,userHeadUrl,userName,collectStatus,userType,photoId,photoType,videoDuration,video_tag_name_lv1,video_tag_name_lv2,note_counter_type_v1,note_counter_type_v2,userTypeFirst,userTypeSecond,publicTime\n';
        products.map((item) => {
            csvContent += item.category + ","
            csvContent += (item.rankPosition || 0) + ","
            csvContent += item.title + ","
            csvContent += item.coverUrl + ","
            csvContent += (item.collectCount || 0) + ","
            csvContent += (item.commentCount || 0) + ","
            csvContent += (item.fans || 0) + ","
            csvContent += (item.likeCount || 0) + ","
            csvContent += (item.shareCount || 0) + ","
            csvContent += item.userId + ","
            csvContent += item.userHeadUrl + ","
            csvContent += item.userName + ","
            csvContent += item.collectStatus + ","
            csvContent += item.userType + ","
            csvContent += item.photoId + ","
            csvContent += item.photoType + ","
            csvContent += item.videoDuration + ","
            csvContent += item.video_tag_name_lv1 + ","
            csvContent += item.video_tag_name_lv2 + ","
            csvContent += item.note_counter_type_v1 + ","
            csvContent += item.note_counter_type_v2 + ","
            csvContent += item.userTypeFirst + ","
            csvContent += item.userTypeSecond + ","
            csvContent += item.publicTime + "\n"
        })
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vocab_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    return (
        <React.Fragment>
            <div className="w-full flex justify-between items-center my-4">
                <Typography level="h3">热榜</Typography>
                <div className=' space-x-2'>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={() => router.push('/admin/hots/create')}
                    >
                        +新增
                    </Button>
                    <Button
                        variant="solid"
                        color="primary"
                        onClick={exportDataToCsv}
                    >
                        导出csv
                    </Button>
                </div>
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
            <div className="w-full overflow-x-scroll">
                {/* 给表格外层容器添加样式，使其内容超出时可横向滚动 */}
                <TableSheet>
                    <thead>
                        <tr>
                            <th className="text-center w-[50px]">排名</th>
                            <th className="text-center w-[200px]">标题</th>
                            <th className="text-center w-[100px]">标签</th>
                            <th className="text-center whitespace-nowrap w-[60px]">点赞数</th>
                            <th className="text-center whitespace-nowrap w-[60px]">评论数</th>
                            <th className="text-center whitespace-nowrap w-[60px]">收藏数</th>
                            <th className="text-center whitespace-nowrap w-[60px]">分享数</th>
                            <th className="text-center whitespace-nowrap w-[100px]" style={{ textAlign: 'center' }}>分类</th>
                            <th className="text-center whitespace-nowrap w-[100px]">发布时间</th>
                            <th className="text-center whitespace-nowrap w-[200px] hidden">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((row, index) => (
                            <HotsItem
                                product={row}
                                key={index}
                                onDelete={() => onDelete(row.id)}
                            />
                        ))}
                    </tbody>
                </TableSheet>
            </div>
            {/* 当没有提示信息且不在加载状态时显示提示 */}
            {products.length === 0 && !isLoading && (
                <Typography level="h4" sx={{ padding: 10 }}>
                    No prompts found.
                </Typography>
            )}
        </React.Fragment>
    );
}

export default HotsView;
