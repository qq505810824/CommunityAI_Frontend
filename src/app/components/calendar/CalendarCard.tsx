import { formatK } from '@/utils/stringUtil';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: any;
}

export default function CalendarCard(props: ViewProps) {
    const { product } = props;
    const router = useRouter();

    const handleClick = () => {
        router.push(`/calendar/${product.id}`);
    };

    return (
        <>
            <div
                className="border rounded-md space-y-2 hover:shadow-lg cursor-pointer bg-white"
                onClick={handleClick}
            >
                <div className="w-full h-[250px]">
                    <img
                        src={
                            'https://www.mocalendar.com/storage/events/tb-MVeD284VesCAYc1VoxbhcLEqFXc7TcL3qCI6fk7P.jpeg'
                        }
                        className="w-full h-full object-cover rounded-t-3xlmd"
                        alt=""
                    />
                </div>
                <div className="p-2">
                    <div className="flex flex-row space-x-2 justify-between ">
                        <div className="space-y-2">
                            <p className="text-md font-bold">{'九澳高頂燒烤公園'}</p>
                            <span className="text-sm text-orange-500">10月10日 - 11月-11</span>
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
                                {
                                    '簡介：位於九澳高頂馬路末段，離路環東北步行徑入口不遠。面積約2,788平方米。園內設有停車場及公共電話亭。備有一般燒烤的設施及別具特色的戶外野餐桌椅。由於靠近公路旁，容易到達，甚受市民歡迎。'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row   my-1 justify-between items-center">
                        <label className="text-sm font-semibold">進行中</label>
                        <label className="text-sm text-gray-500">
                            {formatK(product?.meta_info?.heat || 0)}
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
