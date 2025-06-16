import { usePromptOperations } from '@/hooks/usePromptData';
import { ChanHotsModel } from '@/models/ChanHots';
import { formatK } from '@/utils/stringUtil';
import SmsOutlinedIcon from '@mui/icons-material/SmsSharp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAltSharp';
import { Typography } from '@mui/joy';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import UserView from './UserView';
interface ViewProps {
    product: ChanHotsModel;
}

export default function HotsImageCard(props: ViewProps) {
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

    const getIconImage = (category: string) => { };

    return (
        <>
            <div className=" relative bg-gray-800 rounded-xl overflow-hidden card-hover border border-gold-400/20"
                onClick={handleClick}>
                <label className=" absolute z-10 left-2 top-1 text-sm">
                    {product.aweme_info.is_hot == 1 && (
                        <img
                            src="https://cdn-static.chanmama.com/sub-module/static-file/3/3/07a6777d89"
                            alt=""
                            className="w-6"
                        />
                    )}
                </label>
                <div className="w-full relative  min-w-[70px] gradient-gold">
                    <img
                        src={product.aweme_info.aweme_cover}
                        className="w-full h-[300px] object-cover rounded-t-md"
                        alt=""
                        onError={(e) => {
                            e.currentTarget.src = ''; // 如果加载失败，使用默认图像
                        }}
                    />
                    <div className=' absolute w-full bottom-0 p-2 flex flex-row items-center justify-between'>
                        <UserView
                            user={{
                                name: product.author_info.nickname,
                                avatar: product.author_info.avatar
                            }}
                            imgClassName={'w-5 h-5 '}
                        />
                        <label className=' text-gray-300 text-sm  whitespace-nowrap'>
                            {moment(product?.aweme_info.aweme_create_time).format('MM/DD HH:mm')}
                        </label>
                    </div>
                </div>
                <div className="p-4">
                    <p className="text-gray-300 text-sm mb-4"
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 2,
                            height: '3em' // 根据行高设置最大高度
                        }}>
                        {product.aweme_info.is_hot}{product?.aweme_info.aweme_title || ''}
                    </p>
                    <div className="flex items-center justify-between">
                        <Typography
                            startDecorator={<ThumbUpOffAltIcon sx={{ width: 16 }} />}
                            sx={{
                                color: '#d4af37',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}
                        >
                            {formatK(product?.aweme_info.digg_count || 0)}
                        </Typography>
                        <Typography
                            startDecorator={<SmsOutlinedIcon sx={{ width: 16 }} />}
                            sx={{
                                color: '#d4af37',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}
                        >
                            {formatK(product?.aweme_info.comment_count || 0)}
                        </Typography>


                    </div>
                </div>
            </div>
        </>
    );
}
