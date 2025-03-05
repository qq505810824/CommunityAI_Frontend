import { Chip, Typography } from '@mui/joy';
interface ViewProps {
    intelligence: any;
}

export default function DevelopCard(props: ViewProps) {
    const { intelligence } = props;

    const handleClick = () => {
        window.open(
            'https://www.coze.cn/store/model/detail?mode=choose_bot&product_id=' +
                intelligence?.product_id,
            '_blank'
        );
    };

    return (
        <>
            <div
                className="border rounded-md space-y-2 hover:shadow-lg cursor-pointer p-4 bg-white"
                onClick={handleClick}
            >
                <div className="w-full flex flex-row items-center">
                    <div className="flex flex-col flex-1">
                        <p>{intelligence?.basic_info?.name}</p>
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
                            {intelligence?.basic_info?.description}
                        </p>
                    </div>
                    <div className="w-[60px] min-w-[6px]">
                        <img
                            src={intelligence?.basic_info?.icon_url}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    {intelligence?.type == 1 && (
                        <Chip
                            size="sm"
                            sx={{
                                bgcolor: '#f3f4f6',
                                color: '#4b5563',
                                fontSize: 12,
                                paddingX: 1,
                                borderRadius: 12
                            }}
                        >
                            智能体
                        </Chip>
                    )}
                    {intelligence?.type == 2 && (
                        <Chip
                            size="sm"
                            sx={{
                                bgcolor: '#e0eaff',
                                color: '#6366f1',
                                fontSize: 12,
                                paddingX: 1,
                                borderRadius: 12
                            }}
                        >
                            应用
                        </Chip>
                    )}
                    <div className="flex flex-row space-x-2 text-sm text-gray-600 ">
                        <Typography
                            className="text-xs text-gray-500 flex flex-row items-center"
                            startDecorator={
                                <img
                                    src={intelligence?.owner_info?.avatar_url}
                                    className=" rounded-full w-4 h-4 mr-1"
                                />
                            }
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {intelligence?.owner_info?.nickname}{' '}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
}
