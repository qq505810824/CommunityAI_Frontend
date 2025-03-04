import ModelCard from '@/app/components/store/model/ModelCard';
import ModelHeaderView from '@/app/components/store/model/ModelHeaderView';
import { Box } from '@mui/joy';
interface ViewProps {
    data: any;
    bots?: any;
}

function ModelStoreView(props: ViewProps) {
    const { bots } = props;
    return (
        <>
            <div className="flex w-full flex-row">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <ModelHeaderView />
                    <div className="w-full h-[280px] rounded-xl mb-6 px-4">
                        <div className=" w-full h-full relative rounded-xl flex items-center cursor-pointer">
                            <div className="ml-6 relative w-full sm:w-1/2 z-20 whitespace-pre-wrap">
                                <h1 className="!text-4xl text-white font-medium !mb-3 ">
                                    最强大模型，由你来评！
                                </h1>
                                <p className=" mb-5 opacity-70 whitespace-pre-wrap !text-[16px] text-white semi-typography-paragraph semi-typography-primary semi-typography-normal">
                                    系统将随机选取两个匿名模型展开对决，它们将同时回答你的问题。投票选择你更认可的一方吧！
                                    请注意：如果在聊天过程中暴露了模型身份，该次投票将会失效。详细规则
                                </p>
                                <button className=" px-4 py-2 rounded-md font-medium text-black text-sm focus:outline-none transition duration-150 ease-in-out  !bg-[#a6a6ff] hover:!bg-[#a6a6ff] active:!bg-[#a6a6ff]">
                                    开始模型对战
                                </button>
                            </div>
                            <div className=" absolute right-0 bottom-0 z-10">
                                <img
                                    src="https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/obric/coze/static/image/model-bg.7e3af5fd.png"
                                    className=" h-[250px] object-cover object-center rounded-xl"
                                />
                            </div>
                            <div className="absolute w-full h-full top-0  bottom-0 rounded-xl">
                                <img
                                    src="https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/obric/coze/static/image/header-bg.306909b3.png"
                                    className="w-full h-full object-cover object-center rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 space-y-6">
                        {Object.entries(bots)?.map(([botTypeId, botGroup]: any, index) => (
                            <div className="w-full" key={botTypeId}>
                                <p className="my-2 text-sm">{botGroup[0]?.bot_type?.name}</p>
                                <div className="flex-row   grid   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 w-full">
                                    {botGroup?.map((bot: any, p: number) => (
                                        <ModelCard bot={bot} key={p} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default ModelStoreView;
