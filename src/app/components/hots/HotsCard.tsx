import { ContentType, HotModel, PhotoType } from '@/hooks/useHotData';
import { usePromptOperations } from '@/hooks/usePromptData';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
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

    const handleCopy = async () => {
        console.log('copy');
        // if (prompt) {
        //     const res = await updatePrompt(prompt?.id, {
        //         copy: 1
        //     });
        //     console.log('res', res);
        // }
    };

    const getIconImage = (category: string) => {
        switch (category) {
            case ContentType.Douyin:
                return 'https://chs.newrank.cn/main/logo/logo-douyin.png';
            case ContentType.KuaiShou:
                return 'https://chs.newrank.cn/main/logo/logo-kuaishou.png';
            case ContentType.XiaoHongShu:
                return 'https://chs.newrank.cn/main/logo/logo-xiaohongshu.png';
        }
    };

    return (
        <>

            <div
                className=" relative border rounded-md overflow-x-hidden  hover:shadow-lg cursor-pointer p-2 space-y-2 bg-white"
                onClick={handleClick}
            >
                <label className=' absolute right-2 top-1 text-sm'>{product.rankPosition}</label>
                <div className="flex flex-row space-x-2">
                    <div className=" relative w-[70px]  min-w-[70px]">
                        <img
                            src={product.coverUrl}
                            className="w-full h-[100px] object-cover rounded-md"
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = ''; // 如果加载失败，使用默认图像
                            }}
                        />
                        <img
                            className=" absolute top-0 left-0 w-4 h-4 rounded-full"
                            src={getIconImage(product.category || '')}
                        ></img>
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
                            level="title-sm"
                            className="text-sm text-[#333]"
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 4,
                                height: '6em' // 根据行高设置最大高度
                            }}
                        >
                            {product?.title || '暂无标题'}
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-row items-center overflow-hidden space-x-2">
                    {/* {prompt?.tags?.map((tag: any, index: number) => (
                        <TagView tag={tag} key={index} />
                    ))} */}
                    <label className="text-sm font-semibold">
                        {product.userType || product.video_tag_name_lv1}
                    </label>{' '}
                    <label className="text-sm  text-gray-500">{product.video_tag_name_lv2}</label>
                </div>
                <div className="flex flex-row  overflow-x-hidden  justify-between items-center">
                    <div className="flex flex-row space-x-4  ">
                        <>
                            <Typography
                                startDecorator={<SmsOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {product?.commentCount || 0}
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
                                startDecorator={<ShareOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {product?.shareCount || 0}
                            </Typography>
                            <Typography
                                startDecorator={
                                    <ThumbUpOffAltIcon sx={{ width: 12, color: 'red' }} />
                                }
                                sx={{
                                    color: 'red',
                                    fontSize: 12
                                }}
                            >
                                {product?.likeCount || 0}
                            </Typography>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}
