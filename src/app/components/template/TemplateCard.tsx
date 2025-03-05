import { formatK } from '@/utils/stringUtil';
import { Typography } from '@mui/joy';
interface ViewProps {
    product: any;
}

export default function TemplateCard(props: ViewProps) {
    const { product } = props;

    const handleClick = () => {
        window.open(
            'https://www.coze.cn/store/model/detail?mode=choose_bot&product_id=' +
                product?.product_id,
            '_blank'
        );
    };

    return (
        <>
            <div
                className="border rounded-md space-y-2 hover:shadow-lg cursor-pointer p-4 bg-white"
                onClick={handleClick}
            >
                <div className="w-full h-[150px]">
                    <img
                        src={product?.meta_info?.covers[0]?.url}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="flex flex-row space-x-2 justify-between ">
                    <div className="space-y-2">
                        <p className="text-md">{product?.meta_info?.name}</p>
                        <div className="flex flex-row space-x-2 text-sm ">
                            <Typography
                                className="text-xs text-gray-500 flex flex-row items-center"
                                startDecorator={
                                    <img
                                        src={product?.meta_info?.user_info?.avatar_url}
                                        className=" rounded-full w-4 h-4 mr-1"
                                    />
                                }
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {product?.meta_info?.user_info?.name}{' '}
                            </Typography>
                        </div>
                        <p
                            className="text-sm text-gray-400"
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 2,
                                height: '3em' // 根据行高设置最大高度
                            }}
                        >
                            {product?.meta_info?.description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row   my-1 justify-between items-center">
                    {product?.meta_info?.price && (
                        <label>
                            ￥
                            {(
                                Number(product?.meta_info?.price?.amount) /
                                Math.pow(10, product?.meta_info?.price?.decimal_num)
                            ).toFixed(product?.meta_info?.price?.decimal_num)}
                        </label>
                    )}
                    {!product?.meta_info?.price && <label className=" font-semibold">免费</label>}
                    <label className="text-sm text-gray-500">
                        {formatK(product?.meta_info?.heat || 0)}
                    </label>
                </div>
            </div>
        </>
    );
}
