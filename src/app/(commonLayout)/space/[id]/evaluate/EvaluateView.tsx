import PluginCard from '@/app/components/store/plugin/PluginCard';
import StoreSearchView from '@/app/components/store/StoreSearchView';
import { Box } from '@mui/joy';
interface ViewProps {
    data: any;
    products: any[];
}

function EvaluateView(props: ViewProps) {
    const { products } = props;

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
                    <StoreSearchView />

                    <div className="flex-row  px-4 grid   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {products?.map((product, index) => (
                            <PluginCard product={product} key={index} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default EvaluateView;
