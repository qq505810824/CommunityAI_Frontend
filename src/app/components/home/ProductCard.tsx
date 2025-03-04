import { ChartPieIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: any;
}

export default function ProductCard(props: ViewProps) {
    const { product } = props;
    const router = useRouter();

    const handleClick = () => {
        router.push('https://www.coze.cn/store/agent/');
    };
    return (
        <>
            <div className="w-full flex flex-row space-x-2  hover:shadow-lg cursor-pointer  border rounded-lg p-4 bg-white ">
                <div className="flex-0">
                    <img src={product?.icon_url} className="w-[50px] rounded-md" />
                </div>
                <div className="flex-1 flex flex-col space-y-2 overflow-hidden text-ellipsis">
                    <p className="text-md">{product?.name}</p>
                    <div className="flex flex-row space-x-4  ">
                        <Typography
                            startDecorator={<UserIcon className="w-3" />}
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {product?.user_count || 0}
                        </Typography>
                        <Typography
                            startDecorator={<ChartPieIcon className="w-3" />}
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {product?.chat_conversation_count || 0}
                        </Typography>
                        <Typography
                            startDecorator={<HeartIcon className="w-3" />}
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {product?.favorite_count || 0}
                        </Typography>
                        <label
                            className=" text-gray-500 text-sm"
                            style={{
                                whiteSpace: 'nowrap', // 不换行
                                overflow: 'hidden', // 超出部分隐藏
                                textOverflow: 'ellipsis' // 显示省略号
                            }}
                        >
                            {' '}
                            {product?.desc}
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
