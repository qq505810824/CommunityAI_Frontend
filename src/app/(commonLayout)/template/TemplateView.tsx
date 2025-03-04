import TemplateCard from '@/app/components/template/TemplateCard';
import TemplateHeaderView from '@/app/components/template/TemplateHeaderView';
import { Box } from '@mui/joy';
interface ViewProps {
    data: any;
    products: any[];
}

function TemplateView(props: ViewProps) {
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
                    <TemplateHeaderView />

                    <div className="flex-row  px-4 grid   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {products?.map((product, index) => (
                            <TemplateCard product={product} key={index} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default TemplateView;
