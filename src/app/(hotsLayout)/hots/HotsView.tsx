import FilterView from '@/app/components/hots/FilterView';
import HotsCard from '@/app/components/hots/HotsCard';
import UserView from '@/app/components/hots/UserView';
import { HotModel } from '@/hooks/useHotData';
import { Box, Typography } from '@mui/joy';
import Table from '@mui/joy/Table';

interface ViewProps {
    isLoading: any;
    products: HotModel[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
    changeCategory?: any;
}

function HotsView(props: ViewProps) {
    const { isLoading, products, onClose, handleSearch, searching, changeCategory } = props;

    return (
        <>
            <div className="flex w-full h-full flex-row">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    {/* {DemoHeroGeometric()} */}
                    <FilterView
                        onSearch={handleSearch}
                        onClose={onClose}
                        changeCategory={changeCategory}
                    />

                    <div className="w-full sm:max-w-7xl px-4 my-4 hidden">
                        <Typography
                            level="h4"
                            sx={{
                                borderLeft: 4,
                                borderLeftColor: '#3b82f6',
                                pl: 1,
                                color: '#3b82f6'
                            }}
                        >
                            作品
                        </Typography>
                    </div>
                    <div className="flex-row   pb-10 px-4 grid   sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full sm:max-w-7xl">
                        {products?.map((product, index) => (
                            <HotsCard product={product} key={index} />
                        ))}
                    </div>
                    <div className="w-full sm:max-w-7xl px-4 overflow-auto">
                        <Table aria-label="basic table  " stickyHeader>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>排名</th>
                                    <th style={{ width: '500px' }}>基本信息</th>
                                    <th style={{ width: '50px' }}>分类</th>
                                    <th style={{ width: '50px' }}>评论</th>
                                    <th style={{ width: '50px' }}>收藏</th>
                                    <th style={{ width: '50px' }}>分享</th>
                                    <th style={{ width: '50px' }}>点赞</th>
                                    <th style={{ width: '50px' }}>操作</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {products?.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.rankPosition}</td>
                                        <td>
                                            <div className="flex flex-row space-x-2">
                                                <div className="w-[60px]  min-w-[60px]">
                                                    <img
                                                        src={product?.coverUrl}
                                                        className="w-full h-[70px] object-cover rounded-md"
                                                        alt=""
                                                        onError={(e) => {
                                                            e.currentTarget.src = ''; // 如果加载失败，使用默认图像
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-between ">
                                                    <Typography
                                                        level="body-sm"
                                                        className="text-sm text-black"
                                                        style={{
                                                            display: '-webkit-box',
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                            WebkitLineClamp: 2,
                                                            height: '3em' // 根据行高设置最大高度
                                                        }}
                                                    >
                                                        {product?.title}
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
                                        <td>6</td>
                                        <td>24</td>
                                        <td>4</td>
                                        <td>4</td>
                                        <td>4</td>
                                        <td>4</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Box>
            </div>
        </>
    );
}

export default HotsView;
