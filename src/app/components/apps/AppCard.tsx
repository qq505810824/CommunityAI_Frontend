import { HeartIcon, PlayCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import { Divider, Typography } from '@mui/joy';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
interface ViewProps {
    data: any;
    keyword?: string;
}

export default function AppCard(props: ViewProps) {
    const { data, keyword } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    // const [keyword, setKeyword] = useState('');

    useEffect(() => {
        // console.log(keyword);
    }, [keyword]);
    // useEffect(() => {
    //     setKeyword(searchParams.get('s') || '');
    // }, [searchParams]);
    const handleClick = () => {
        // console.log('Clicked!'); // 添加调试信息
        window.open(data?.data_url);
    };
    return (
        <>
            <div
                className="relative border rounded-md hover:shadow-lg cursor-pointer p-4 bg-white group"
                onClick={handleClick}
            >
                {/* 悬浮提示框 */}
                <div
                    className="absolute left-0 top-full z-10 w-full bg-black border rounded-md p-3 shadow-lg 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 mt-2"
                >
                    <p className="text-sm text-white">{data?.description}</p>
                </div>
                <div className="flex flex-row space-x-2 mb-6">
                    <div className="w-[70px]  min-w-[70px]">
                        <img
                            src={data?.img_src || './logo/docai.png'}
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
                                {data?.title
                                    ?.split(new RegExp(`(${keyword})`, 'gi'))
                                    .map((part: any, index: number) =>
                                        part.toLowerCase() === keyword?.toLowerCase() ? (
                                            <span key={index} style={{ color: 'red' }}>
                                                {part}
                                            </span>
                                        ) : (
                                            part
                                        )
                                    )}
                            </h1>
                            <div className="hidden flex-shrink-0 bg-indigo-100 px-2 py-1 text-indigo-600 cursor-pointer text-sm rounded-md flex flex-row items-center">
                                <RateReviewOutlinedIcon sx={{ color: '#6366f1', fontSize: 14 }} />
                                <label className="ml-1 text-xs">应用</label>
                            </div>
                        </div>
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
                            {data?.description
                                ?.split(new RegExp(`(${keyword})`, 'gi'))
                                .map((part: any, index: number) =>
                                    part.toLowerCase() === keyword?.toLowerCase() ? (
                                        <span key={index} style={{ color: 'red' }}>
                                            {part}
                                        </span>
                                    ) : (
                                        part
                                    )
                                )}
                        </p>
                    </div>
                </div>
                <Divider />
                <div className="flex flex-row   mt-2 justify-between items-center">
                    <div className="flex flex-row space-x-4  ">
                        <Typography
                            startDecorator={<UserIcon className="w-3" />}
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {0}
                        </Typography>
                        <Typography
                            startDecorator={<PlayCircleIcon className="w-3" />}
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            0
                        </Typography>
                        <Typography
                            startDecorator={<HeartIcon className="w-3" />}
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {0}
                        </Typography>
                    </div>
                    <Typography
                        sx={{
                            color: 'gray',
                            fontSize: 12
                        }}
                    ></Typography>
                </div>
            </div>
        </>
    );
}
