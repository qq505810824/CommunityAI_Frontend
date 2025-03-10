'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Card, Typography } from '@mui/joy';
import { BarChart } from '@mui/x-charts';
import { useDashboardData } from './hooks/useDashboardData';

// 侧边栏组件
const Sidebar = () => (
    <div className="w-64 min-h-screen bg-[#6B35E8] text-white p-4">
        <div className="text-2xl font-bold mb-8">Inventor.io</div>
        <nav>
            {[
                { name: 'Home', icon: '🏠' },
                { name: 'Products', icon: '📦' },
                { name: 'Categories', icon: '📑' },
                { name: 'Stores', icon: '🏪' },
                { name: 'Finances', icon: '💰' },
                { name: 'Settings', icon: '⚙️' }
            ].map((item) => (
                <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer mb-2"
                >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                </div>
            ))}
        </nav>
        <div className="mt-auto pt-8">
            <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer">
                <span>➕</span>
                <span>Add product</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer">
                <span>🚪</span>
                <span>Log out</span>
            </div>
        </div>
    </div>
);

// 活动统计卡片组件
const ActivityCard = ({ quantity, label }: { quantity: number; label: string }) => (
    <Card className="flex-1 p-4">
        <Typography level="h2" className="text-center text-3xl font-bold">
            {quantity}
        </Typography>
        <Typography className="text-center text-gray-600">{label}</Typography>
        <Typography level="body-sm" className="text-center">
            Qty
        </Typography>
    </Card>
);

// 商品类别图标
const CategoryIcon = ({ icon }: { icon: string }) => (
    <div className="bg-[#F3F0FF] p-4 rounded-lg">
        <Typography className="text-2xl text-center">{icon}</Typography>
    </div>
);

export default function Dashboard() {
    const { activityData, salesData, stockData, storesData } = useDashboardData();

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-[#F8F9FA]">
                {/* 搜索栏 */}
                <div className="flex justify-between items-center mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 rounded-full border w-[300px]"
                        />
                        <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                </div>

                {/* 最近活动 */}
                <Typography level="h4" className="mb-4">
                    Recent activity
                </Typography>
                <div className="grid grid-cols-5 gap-4 mb-8">
                    <ActivityCard quantity={activityData.NEW_ITEMS} label="NEW ITEMS" />
                    <ActivityCard quantity={activityData.NEW_ORDERS} label="NEW ORDERS" />
                    <ActivityCard quantity={activityData.REFUNDS} label="REFUNDS" />
                    <ActivityCard quantity={activityData.MESSAGE} label="MESSAGE" />
                    <ActivityCard quantity={activityData.GROUPS} label="GROUPS" />
                </div>

                {/* 销售图表和商品类别 */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <Card className="col-span-2">
                        <Typography level="h4" className="mb-4">
                            Sales
                        </Typography>
                        <BarChart
                            series={[{ data: salesData.map((d) => d.value) }]}
                            height={200}
                            xAxis={[{ data: salesData.map((d) => d.name), scaleType: 'band' }]}
                        />
                    </Card>
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <Typography level="h4">Top item categories</Typography>
                            <Typography level="body-sm" className="text-primary cursor-pointer">
                                VIEW ALL
                            </Typography>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <CategoryIcon icon="👕" />
                            <CategoryIcon icon="🎩" />
                            <CategoryIcon icon="👜" />
                            <CategoryIcon icon="⛸️" />
                            <CategoryIcon icon="🎒" />
                            <CategoryIcon icon="👓" />
                        </div>
                    </Card>
                </div>

                {/* 库存和店铺列表 */}
                <div className="grid grid-cols-2 gap-6">
                    <Card>
                        <Typography level="h4" className="mb-4">
                            Stock numbers
                        </Typography>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Typography color="primary">Low stock items</Typography>
                                <Typography>{stockData.lowStockItems}</Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography>Item categories</Typography>
                                <Typography>{stockData.itemCategories}</Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography>Refunded items</Typography>
                                <Typography>{stockData.refundedItems}</Typography>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <Typography level="h4">Stores list</Typography>
                            <Typography level="body-sm" className="text-primary cursor-pointer">
                                VIEW ALL
                            </Typography>
                        </div>
                        <div className="space-y-4">
                            {storesData.map((store) => (
                                <div
                                    key={store.location}
                                    className="flex justify-between items-center"
                                >
                                    <div>
                                        <Typography>{store.location}</Typography>
                                        <Typography level="body-sm" className="text-gray-600">
                                            {store.employees} employees
                                        </Typography>
                                    </div>
                                    <div className="text-right">
                                        <Typography>{store.items} items</Typography>
                                        <Typography level="body-sm" className="text-gray-600">
                                            {store.orders} orders
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
