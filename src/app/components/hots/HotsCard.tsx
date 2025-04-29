import { HotModel } from '@/hooks/useHotData';
import { usePromptOperations } from '@/hooks/usePromptData';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import CopyButton from './CopyButton';
import UserView from './UserView';
interface ViewProps {
    product: HotModel;
}

export default function HotsCard(props: ViewProps) {
    const { product } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const handleClick = () => {
        // if (prompt) router.push(`/prompts/${prompt.id}`);
    };

    const handleCopy = async () => {
        console.log('copy');
        // if (prompt) {
        //     const res = await updatePrompt(prompt?.id, {
        //         copy: 1
        //     });
        //     console.log('res', res);
        // }
    };

    return (
        <>
            <div
                className=" border rounded-md overflow-x-hidden  hover:shadow-lg cursor-pointer p-4 space-y-2 bg-white"
                onClick={handleClick}
            >
                <div className="flex flex-row space-x-2">
                    <div className="w-[70px]  min-w-[70px]">
                        <img
                            src={product.coverUrl}
                            className="w-full h-[100px] object-cover rounded-md"
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = ''; // 如果加载失败，使用默认图像
                            }}
                        />
                    </div>
                    <div className="w-full overflow-hidden space-y-1 ">
                        <div className="flex flex-row items-center justify-between hidden">
                            <CopyButton content={product?.title} callback={handleCopy} />
                        </div>
                        <UserView
                            user={{
                                id: product.userId || '',
                                name: product.userName || '',
                                avatar: product.userHeadUrl || ''
                            }}
                            imgClassName={'w-4 h-4 '}
                        />
                        <Typography level="body-xs" sx={{ color: '#6b7280' }}>
                            发布于: {product?.publicTime}
                        </Typography>
                        <Typography
                            level="body-sm"
                            className="text-sm text-black"
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 4,
                                height: '6em' // 根据行高设置最大高度
                            }}
                        >
                            {product?.title}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-row items-center overflow-hidden space-x-2">
                    {/* {prompt?.tags?.map((tag: any, index: number) => (
                        <TagView tag={tag} key={index} />
                    ))} */}
                </div>
                <div className="flex flex-row  overflow-x-hidden  justify-between items-center">
                    <div className="flex flex-row space-x-4  ">
                        <>
                            <Typography
                                startDecorator={<RemoveRedEyeOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {product?.collectCount || 0}
                            </Typography>
                            <Typography
                                startDecorator={<StarBorderOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {product?.collectCount || 0}
                            </Typography>
                            <Typography
                                startDecorator={<ThumbUpOffAltIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {product?.collectCount || 0}
                            </Typography>

                            <Typography
                                startDecorator={<ContentCopyOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {product?.collectCount || 0}
                            </Typography>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}
