import AppCard from '@/app/components/apps/AppCard';
import AppSearchView from '@/app/components/apps/AppSearchView';
import { Box, Typography } from '@mui/joy';
interface ViewProps {
    data: any;
    onSearch?: any;
}

function AppView(props: ViewProps) {
    const { data, onSearch } = props;
    return (
        <>
            <div className="flex flex-row px-2 sm:px-8">
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <AppSearchView onSearch={onSearch} />
                    <div className="w-full hidden flex  py-6 px-4  flex-row-reverse flex-wrap ">
                        <div
                            className="h-[270px] w-[480px] overflow-hidden rounded-xl relative cursor-pointer"
                            style={{
                                backgroundImage:
                                    'url("https://p6-flow-product-sign.byteimg.com/tos-cn-i-13w3uml6bg/f3f161a5a98948c7a1137b78bf7d1f30~tplv-13w3uml6bg-crop-center-v1:160:90.image?rk3s=2e2596fd&x-expires=1742308067&x-signature=jLzy9X9pOHjcexOINXWUIhquCXQ%3D")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <img
                                className=" rounded-md"
                                src="https://p9-flow-product-sign.byteimg.com/tos-cn-i-13w3uml6bg/f3f161a5a98948c7a1137b78bf7d1f30~tplv-13w3uml6bg-crop-center-v1:960:540.image?rk3s=2e2596fd&x-expires=1742308067&x-signature=wFWEiDCqBtGLksswQK9takS%2BPhI%3D"
                            />
                            <div className=" absolute bottom-0 p-4 flex flex-row">
                                <img
                                    src="https://p6-flow-product-sign.byteimg.com/tos-cn-i-13w3uml6bg/3eb6d4705a0b4720b36cd8b0696a959b~tplv-13w3uml6bg-resize:128:128.image?rk3s=2e2596fd&x-expires=1742218996&x-signature=Mlck1bH7GivU9SaTghzw0OET5JU%3D"
                                    className="w-[70px] rounded-md"
                                />
                                <div className=" text-white px-2">
                                    <p className="text-xs">生活方式</p>
                                    <p className=" text-xl font-semibold">觉醒回声</p>
                                    <Typography
                                        className="text-xs text-gray-500 flex flex-row items-center"
                                        startDecorator={
                                            <img
                                                src="https://p6-flow-product-sign.byteimg.com/tos-cn-i-13w3uml6bg/78f519713ce46901120fb7695f257c9a.png~tplv-13w3uml6bg-resize:128:128.image?rk3s=2e2596fd&x-expires=1742218996&x-signature=XuxvoLyw%2F0YNHvyb0YNAABInfOI%3D"
                                                className=" rounded-full w-4 mr-1"
                                            />
                                        }
                                        sx={{
                                            color: 'white',
                                            fontSize: 12
                                        }}
                                    >
                                        扣子官方
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 py-6 cursor-pointer">
                            <img
                                src="https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/mf/marketplace/static/image/brand-daily-rec.bd752b96.png"
                                className="w-[80px]"
                            />
                            <p className="text-4xl my-2 font-semibold">
                                {' '}
                                让每一次聆听都化作「觉醒」
                            </p>
                            <p className="text-md my-2 text-gray-500">
                                欢迎来到「觉醒电台」，这里有四位独具魅力的主播，陪你畅聊科技前沿、哲学思...
                            </p>
                            <button className="px-8 py-2 mt-4 text-white bg-[#1D1C23] rounded-full text-sm">
                                立即聊聊
                            </button>
                        </div>
                    </div>
                    <div className="w-full my-4">
                        <p className="text-xl text-black font-semibold border-l-4 pl-2 border-l-indigo-500">
                            {data?.category}
                        </p>
                    </div>
                    <div className="flex-row   grid   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {data?.apps?.map((item: any, index: number) => (
                            <AppCard data={item} key={index} keyword={data?.keyword} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default AppView;
