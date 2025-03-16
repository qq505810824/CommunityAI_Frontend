import BackView from '@/app/components/base/back/BackView';
import { useModalContext } from '@/context/modal-context';
import { ArticleModel, useArticleOperations } from '@/hooks/useArticleData';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    data: ArticleModel | undefined;
    onSearch?: any;
    handleDeleteById?: any;
}

function DetailArticleView(props: ViewProps) {
    const { data, onSearch, handleDeleteById } = props;
    const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
    const [currentArticleId, setCurrentArticleId] = useState<number | null>(null);
    const { setShowConfirmDelete } = useModalContext();
    const { deleteArticle, mutate } = useArticleOperations(); // 使用合并后的 hook
    const router = useRouter();

    return (
        <>
            <div className="w-full justify-center flex flex-col items-center">
                <div className=" w-[680px] my-2">
                    <BackView title="返回" />
                </div>
                {data && (
                    <div className="w-[680px] overflow-hidden  px-4">
                        <h1 className="article-title text-black text-2xl sm:text-4xl font-bold">
                            {data.title}
                        </h1>
                        <div className="w-full flex my-4 justify-end">
                            <p className="article-meta">
                                <span className="article-date">{data.created_at}</span>
                                <span className="article-status">{data.status}</span>
                            </p>
                        </div>
                        <div className="my-4  ">
                            <div
                                className="text-md  "
                                dangerouslySetInnerHTML={{ __html: data.description }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default DetailArticleView;
