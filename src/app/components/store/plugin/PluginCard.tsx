import { formatK } from '@/utils/stringUtil';
import { Typography } from '@mui/joy';
interface ViewProps {
    product: any;
}

export default function PluginCard(props: ViewProps) {
    const { product } = props;

    return (
        <>
            <div className=" space-y-4">
                <div className=" border rounded-md  hover:shadow-lg cursor-pointer p-4 bg-white">
                    <div className="flex flex-row space-x-2 ">
                        <div className="w-[50px] h-[50px] min-w-[50px] flex items-center  rounded-md border">
                            <img
                                src={product?.meta_info?.icon_url}
                                className="w-full object-fit rounded-md "
                            />
                        </div>
                    </div>
                    <div className="my-4 space-y-1">
                        <p className="text-md">{product?.meta_info?.name}</p>
                        <Typography
                            className="text-xs text-gray-500 flex flex-row items-center"
                            startDecorator={
                                <img
                                    src={product?.meta_info?.user_info?.avatar_url}
                                    className=" rounded-full w-4 mr-1"
                                />
                            }
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {product?.meta_info?.user_info?.name}
                        </Typography>
                        <p className="text-gray-500 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                            {product?.meta_info?.description}
                        </p>
                    </div>
                    <div className="flex flex-row   my-1 justify-between items-center">
                        <div className="flex flex-row space-x-2 text-sm ">
                            <span className="text-sm text-gray-400">
                                {formatK(product?.plugin_extra?.bots_use_count || 0)}
                            </span>
                            <span className="text-sm text-gray-400">智能体使用 ·</span>
                            <span className="text-sm text-gray-400">
                                {formatK(product?.meta_info?.favorite_count || 0)}
                            </span>
                            <span className="text-sm text-gray-400">收藏</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
