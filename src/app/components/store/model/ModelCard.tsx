import { Typography } from '@mui/joy';
interface ViewProps {
    bot: any;
}

export default function ModelCard(props: ViewProps) {
    const { bot } = props;

    const handleClick = () => {
        window.open(
            'https://www.coze.cn/store/model/detail?mode=choose_bot&product_id=' + bot?.product_id,
            '_blank'
        );
    };

    return (
        <>
            <div
                className=" border rounded-md  hover:shadow-lg cursor-pointer p-4 bg-white"
                onClick={handleClick}
            >
                <div className="flex flex-row space-x-2 justify-between ">
                    <div className="space-y-1">
                        <p className="text-md">{bot?.name}</p>
                        <p
                            className="text-sm text-gray-600"
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 2,
                                height: '3em' // 根据行高设置最大高度
                            }}
                        >
                            {bot?.description}
                        </p>
                    </div>
                    <div className="w-[60px] min-w-[60px]">
                        <img src={bot?.icon} className="w-full object-cover rounded-md" />
                    </div>
                </div>

                <div className="flex flex-row   my-1 justify-between items-center">
                    <div className="flex flex-row space-x-2 text-sm ">
                        <Typography
                            className="text-xs text-gray-500 flex flex-row items-center"
                            startDecorator={
                                <img
                                    src={bot?.owner?.avatar_url}
                                    className=" rounded-full w-4 h-4 mr-1"
                                />
                            }
                            sx={{
                                color: 'gray',
                                fontSize: 14
                            }}
                        >
                            {bot?.owner?.name}{' '}
                            <span className="text-gray-400 ml-2">@{bot?.owner?.user_name}</span>
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
}
