import FilterView from '@/app/components/chan_hots/FilterView';
import HotsCard from '@/app/components/chan_hots/HotsCard';
import { ChanHotsModel } from '@/models/ChanHots';
import { Box } from '@mui/joy';

interface ViewProps {
    isLoading: any;
    products: ChanHotsModel[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
    changeCategory?: any;
    categorys: any[];
}

function ChanHotsView(props: ViewProps) {
    const { isLoading, products, onClose, handleSearch, searching, changeCategory, categorys } =
        props;

    return (
        <>
            <div className="flex w-full h-full flex-col items-start justify-start">
                <div className="mb-8">
                    <h1 className="text-4xl font-luxury font- bold text-gold-400 mb-2">
                        Trend Signal
                    </h1>
                    <p className="text-gray-300">
                        Trend Signal detects market trends for smarter trading decisions.
                    </p>
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <FilterView
                        onSearch={handleSearch}
                        onClose={onClose}
                        changeCategory={changeCategory}
                        categorys={categorys}
                    />
                    <div className="  grid flex-row   pb-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full sm:max-w-7xl">
                        {products?.map((product, index) => (
                            <HotsCard product={product} key={index} />
                        ))}
                    </div>
                    <div className=" hidden sm:block w-full sm:max-w-7xl px-4 overflow-auto">
                        {/* <HotsList products={products} /> */}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default ChanHotsView;
