import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useAppContext } from '@/context/app-context';
import { useCommentOperations } from '@/hooks/useCommentData';
import { CommentModel } from '@/models/Comment';
import moment from 'moment';

interface ViewProps {
    comment: CommentModel;
}

export default function CommentItem({ comment }: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext();
    const { likeComment } = useCommentOperations();
    const { user_id } = useAppContext();
    // const [isLike, setIsLike] = useState(Comment?.is_favorit);
    // const [likes, setLikes] = useState(Comment.favorit_count || 0);
    const handleLike = async () => {
        // if (isLike) return;
        // setLikes((likes: number) => likes + 1);
        // setIsLike(true);
        // const res = await likeComment(Comment.id || 0, user_id);
    };

    const handleComment = async () => {
        // if (isLike) return;
        // setLikes((likes: number) => likes + 1);
        // setIsLike(true);
        // const res = await likeComment(Comment.id || 0, user_id);
    };

    return (
        <>
            <div className="w-full flex flex-row space-x-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-medium text-blue-700">
                        {comment?.owner?.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                    </span>
                </div>
                <div className="flex flex-col space-y-2 w-full">
                    <span className="text-gray-500 ">{comment?.owner?.name}</span>
                    <p className=" ">{comment.content}</p>
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-sm text-gray-500">
                            {moment(comment.created_at).fromNow()}
                        </span>
                        {/* <div className="flex items-center space-x-4">
                            <button
                                className={`flex items-center space-x-2 text-gray-500 hover:text-red-500 ${isLike ? 'text-red-500' : 'text-gray-500'}`}
                                onClick={handleLike}
                            >
                                <Heart className="w-4 h-4" />
                                <span>{likes || 0}</span>
                            </button>
                            <button className="hidden flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
