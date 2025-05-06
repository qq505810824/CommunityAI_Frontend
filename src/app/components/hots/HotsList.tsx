import { ContentType, HotModel, PhotoType } from '@/hooks/useHotData';
import { Table, Typography } from '@mui/joy';
import UserView from './UserView';

interface ViewProps {
    products: HotModel[];
}

export default function HotsList(props: ViewProps) {
    const { products } = props;

    const handleClick = (product: HotModel) => {
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
            <Table aria-label="basic table  "
            // stickyHeader
            >
                <thead>
                    <tr>
                        <th style={{ width: '50px', textAlign: 'center' }}>排名</th>
                        <th style={{ width: '500px' }}>基本信息</th>
                        <th style={{ width: '100px', textAlign: 'center' }}>分类</th>
                        <th style={{ width: '50px', textAlign: 'center' }}>评论</th>
                        <th style={{ width: '50px', textAlign: 'center' }}>收藏</th>
                        <th style={{ width: '50px', textAlign: 'center' }}>分享</th>
                        <th style={{ width: '50px', textAlign: 'center' }}>点赞</th>
                        {/* <th style={{ width: '50px', textAlign: 'center' }}>操作</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {products?.map((product, index) => (
                        <tr
                            key={index}
                            className=" cursor-pointer"
                            onClick={() => {
                                handleClick(product);
                            }}
                        >
                            <td className=" items-center text-center">{product.rankPosition}</td>
                            <td>
                                <div className="flex flex-row space-x-2">
                                    <div className=" relative w-[60px]  min-w-[60px]">
                                        <img
                                            src={product?.coverUrl}
                                            className="w-full h-[70px] object-cover rounded-md"
                                            alt=""
                                            onError={(e) => {
                                                e.currentTarget.src = ''; // 如果加载失败，使用默认图像
                                            }}
                                        />
                                        <img
                                            className=" absolute top-0 left-0 w-4 h-4 rounded-full"
                                            src={getIconImage(product?.category || '')}
                                        ></img>
                                    </div>
                                    <div className="flex flex-col justify-between ">
                                        <Typography
                                            level="title-sm"
                                            className="text-sm text-[#000] hover:text-blue-500"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                WebkitLineClamp: 2,
                                                height: '3em' // 根据行高设置最大高度
                                            }}
                                        >
                                            {product?.title || '暂无标题'}
                                        </Typography>
                                        <div className="flex flex-row items-center space-x-4">
                                            <UserView
                                                user={{
                                                    id: product?.userId || '',
                                                    name: product?.userName || '',
                                                    avatar: product?.userHeadUrl || ''
                                                }}
                                                imgClassName={'w-4 h-4 '}
                                            />
                                            <label className="text-xs text-gray-500">
                                                发布于: {product?.publicTime}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className=" items-center text-center">
                                <p className=" font-semibold">
                                    {product.userType || product.video_tag_name_lv1}
                                </p>
                                <p className=" text-gray-500">{product.video_tag_name_lv2}</p>
                            </td>
                            <td className=" items-center text-center">
                                {product?.commentCount || 0}
                            </td>
                            <td className=" items-center text-center">
                                {product?.collectCount || 0}
                            </td>
                            <td className=" items-center text-center">
                                {product?.shareCount || 0}
                            </td>
                            <td className=" items-center text-center">
                                <label className="text-red-500">{product?.likeCount || 0}</label>
                            </td>

                            {/* <td className=" items-center text-center">4</td> */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
