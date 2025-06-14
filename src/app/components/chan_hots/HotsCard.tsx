import { usePromptOperations } from '@/hooks/usePromptData';
import { ChanHotsModel } from '@/models/ChanHots';
import { formatK } from '@/utils/stringUtil';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import UserView from './UserView';
interface ViewProps {
    product: ChanHotsModel;
}

export default function HotsCard(props: ViewProps) {
    const { product } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const handleClick = () => {
        window.open(product.aweme_info.aweme_url, '_blank');
        // window.open(`https://www.douyin.com/video/${product.aweme_info.music_id}`, '_blank');
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

    const getIconImage = (category: string) => {};

    return (
        <>
            <div
                className=" relative overflow-x-hidden  hover:shadow-lg cursor-pointer p-2 space-y-2 bg-gray-800 rounded-xl overflow-hidden card-hover border border-gold-400/20"
                onClick={handleClick}
            >
                <label className=" absolute right-2 top-1 text-sm">
                    {product.aweme_info.is_hot == 1 && (
                        <img
                            src="https://cdn-static.chanmama.com/sub-module/static-file/3/3/07a6777d89"
                            alt=""
                            className="w-6"
                        />
                    )}
                </label>
                <div className="flex flex-row space-x-2">
                    <div className=" relative w-[70px]  min-w-[70px]">
                        <img
                            src={product.aweme_info.aweme_cover}
                            className="w-full h-[100px] object-cover rounded-md"
                            alt=""
                            onError={(e) => {
                                e.currentTarget.src = ''; // 如果加载失败，使用默认图像
                            }}
                        />
                    </div>
                    <div className="w-full overflow-hidden space-y-1 ">
                        <UserView
                            user={{
                                name: product.author_info.nickname,
                                avatar: product.author_info.avatar
                            }}
                            imgClassName={'w-4 h-4 '}
                        />
                        <Typography level="body-xs" sx={{ color: '#d1d5db' }}>
                            发布于: {product?.aweme_info.aweme_create_time_format}
                        </Typography>
                        <p
                            className="text-gray-300 text-sm"
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 4,
                                height: '6em' // 根据行高设置最大高度
                            }}
                        >
                            {product?.aweme_info.aweme_title || '暂无标题'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center overflow-hidden space-x-2">
                    {/* {prompt?.tags?.map((tag: any, index: number) => (
                        <TagView tag={tag} key={index} />
                    ))} */}
                    {/* <label className="text-sm font-semibold">
                        {product.userType || product.video_tag_name_lv1}
                    </label>{' '}
                    <label className="text-sm  text-gray-500">{product.video_tag_name_lv2}</label> */}
                </div>
                <div className="flex flex-row  overflow-x-hidden  justify-between items-center">
                    <div className="flex flex-row space-x-4  ">
                        <>
                            <Typography
                                startDecorator={<SmsOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: '#d1d5db',
                                    fontSize: 12
                                }}
                            >
                                {formatK(product?.aweme_info.comment_count || 0)}
                            </Typography>
                            <Typography
                                startDecorator={<StarBorderOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: '#d1d5db',
                                    fontSize: 12
                                }}
                            >
                                {formatK(product?.aweme_info.collect_count || 0)}
                            </Typography>
                            <Typography
                                startDecorator={<ShareOutlinedIcon sx={{ width: 12 }} />}
                                sx={{
                                    color: '#d1d5db',
                                    fontSize: 12
                                }}
                            >
                                {formatK(product?.aweme_info.share_count || 0)}
                            </Typography>
                            <Typography
                                startDecorator={
                                    <ThumbUpOffAltIcon sx={{ width: 12, color: '#d4af37' }} />
                                }
                                sx={{
                                    color: '#d4af37',
                                    fontSize: 12
                                }}
                            >
                                {formatK(product?.aweme_info.digg_count || 0)}
                            </Typography>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}
