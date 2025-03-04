import FeedListCard from '@/app/components/home/FeedListCard';
import AgentCard from '@/app/components/store/agent/AgentCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box } from '@mui/joy';
interface ViewProps {
    data: any;
    feed_list: any[];
    products: any[];
}

function HomeView(props: ViewProps) {
    const { feed_list, products } = props;
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', p: 1 }}>
                <div className="w-full h-[220px] rounded-xl mb-6">
                    <div className=" w-full h-full relative rounded-xl flex items-center cursor-pointer">
                        <div className="ml-6 relative w-1/2 z-10 whitespace-pre-wrap">
                            <h1 className="!text-4xl text-white font-medium !mb-3 ">
                                ✨扣子现已支持 DeepSeek 最新模型
                            </h1>
                            <p className=" mb-5 opacity-70 whitespace-pre-wrap !text-[16px] text-white semi-typography-paragraph semi-typography-primary semi-typography-normal">
                                在扣子，体验 DeepSeek-R1 及 DeepSeek-V3 模型
                            </p>
                            <button className=" px-2 py-1 rounded-md text-white text-sm focus:outline-none transition duration-150 ease-in-out  !bg-[#FFFFFF1F] hover:!bg-[#FFFFFF33] active:!bg-[#FFFFFF47]">
                                立即体验
                            </button>
                        </div>
                        <div className="absolute w-full h-full top-0  bottom-0 rounded-xl">
                            <img
                                src="https://p3-bot-sign.byteimg.com/tos-cn-i-v4nquku3lp/5548f2aacce64db9b622372c332d69c4~tplv-v4nquku3lp-home-banner.webp?rk3s=50ccb0c5&x-expires=4624531163&x-signature=5kaoytPQGfST835UcGqh%2B4XXDYw%3D"
                                className="w-full h-full object-cover object-center rounded-xl"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-row space-x-4  grid grid-cols-3 gap-4 w-full">
                    <div className="col-span-2 ">
                        <div className="mb-2 flex flex-row items-center">
                            <h1 className=" text-xl">关注</h1>
                            <RefreshIcon
                                className=" text-gray-400 text-sm cursor-pointer"
                                sx={{ color: '#9ca3af', fontSize: 20, ml: 1 }}
                            />
                        </div>
                        <div className=" border rounded-lg bg-white p-4 space-y-8 overflow-auto">
                            {feed_list?.map((feed: any, index) => (
                                <FeedListCard feed={feed} key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="empty:hidden">
                        <div className="mb-2 w-full flex flex-row items-center justify-between">
                            <h1 className=" text-xl">智能体推荐</h1>
                            <div className=" text-sm cursor-pointer  flex flex-row items-center text-indigo-500 font-medium">
                                查看更多
                                <ChevronRightIcon
                                    className="text-indigo-100"
                                    sx={{ color: '#6366f1' }}
                                />
                            </div>
                        </div>
                        <div className=" space-y-4">
                            {products?.map((product: any, index) => (
                                <AgentCard product={product} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default HomeView;
