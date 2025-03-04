import { formatK } from '@/utils/stringUtil';
import {
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
    PlayCircleIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Divider, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: any;
}

export default function AgentCard(props: ViewProps) {
    const { product } = props;
    const router = useRouter();

    const handleClick = () => {
        console.log('Clicked!'); // 添加调试信息
        if (product?.meta_info?.entity_type == 1) {
            window.open('https://www.coze.cn/store/agent/' + product?.meta_info?.id, '_blank');
        } else if (product?.meta_info?.entity_type == 6) {
            window.open('https://www.coze.cn/store/project/' + product?.meta_info?.id, '_blank');
        }
    };
    return (
        <>
            <div
                className=" border rounded-md  hover:shadow-lg cursor-pointer p-4 bg-white"
                onClick={handleClick}
            >
                <div className="flex flex-row space-x-2 mb-6">
                    <div className="w-[70px]  min-w-[70px]">
                        <img
                            src={product?.meta_info?.icon_url}
                            className="w-full h-[70px] object-cover rounded-md"
                        />
                    </div>
                    <div className="w-full overflow-hidden space-y-1 ">
                        <div className="flex flex-row items-start justify-between">
                            <h1
                                style={{
                                    whiteSpace: 'nowrap', // 不换行
                                    overflow: 'hidden', // 超出部分隐藏
                                    textOverflow: 'ellipsis' // 显示省略号
                                }}
                            >
                                {product?.meta_info?.name}
                            </h1>
                            <div className=" flex-shrink-0 bg-indigo-100 px-2 py-1 text-indigo-600 cursor-pointer text-sm rounded-md flex flex-row items-center">
                                <RateReviewOutlinedIcon sx={{ color: '#6366f1', fontSize: 14 }} />
                                <label className="ml-1 text-xs">应用</label>
                            </div>
                        </div>
                        <Typography
                            className="text-xs text-gray-500 flex flex-row items-center"
                            startDecorator={
                                <img
                                    src={product?.meta_info?.user_info?.avatar_url}
                                    className=" rounded-full w-4 min-w-4 mr-1"
                                />
                            }
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {product?.meta_info?.user_info?.name}
                        </Typography>
                        <p
                            className="text-sm text-gray-600"
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 3,
                                height: '4.5em' // 根据行高设置最大高度
                            }}
                        >
                            {product?.meta_info?.description}
                        </p>
                    </div>
                </div>
                <Divider />
                <div className="flex flex-row   mt-2 justify-between items-center">
                    <div className="flex flex-row space-x-4  ">
                        {product?.meta_info?.entity_type == 1 && (
                            <>
                                <Typography
                                    startDecorator={<UserIcon className="w-3" />}
                                    sx={{
                                        color: 'gray',
                                        fontSize: 12
                                    }}
                                >
                                    {formatK(product?.bot_extra?.user_count || 0)}
                                </Typography>

                                <Typography
                                    startDecorator={
                                        <ChatBubbleOvalLeftEllipsisIcon className="w-3" />
                                    }
                                    sx={{
                                        color: 'gray',
                                        fontSize: 12
                                    }}
                                >
                                    {formatK(product?.bot_extra?.chat_conversation_count || 0)}
                                </Typography>
                            </>
                        )}
                        {product?.meta_info?.entity_type == 6 && (
                            <>
                                <Typography
                                    startDecorator={<UserIcon className="w-3" />}
                                    sx={{
                                        color: 'gray',
                                        fontSize: 12
                                    }}
                                >
                                    {formatK(product?.project_extra?.user_count || 0)}
                                </Typography>
                                <Typography
                                    startDecorator={<PlayCircleIcon className="w-3" />}
                                    sx={{
                                        color: 'gray',
                                        fontSize: 12
                                    }}
                                >
                                    {formatK(product?.project_extra?.execute_count || 0)}
                                </Typography>
                            </>
                        )}
                        <Typography
                            startDecorator={<HeartIcon className="w-3" />}
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {formatK(product?.meta_info?.favorite_count || 0)}
                        </Typography>
                    </div>
                    {product?.meta_info?.entity_type == 6 && (
                        <Typography
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            立即试用
                        </Typography>
                    )}
                </div>
            </div>
        </>
    );
}
