import FilterView from '@/app/components/hots/FilterView';
import HotsCard from '@/app/components/hots/HotsCard';
import HotsList from '@/app/components/hots/HotsList';
import { HotModel } from '@/hooks/useHotData';
import { Box, Typography } from '@mui/joy';

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
                        <HotsList products={products} />
                    </div>
                </Box>
            </div>
        </>
    );
}

export default HotsView;
