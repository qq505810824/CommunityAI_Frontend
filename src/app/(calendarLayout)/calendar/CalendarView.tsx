import CalendarCard from '@/app/components/calendar/CalendarCard';
import FilterView from '@/app/components/calendar/FilterView';
import { Box } from '@mui/joy';
interface ViewProps {
    data: any;
    isLoading: any;
    products: any[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
}

function CalendarView(props: ViewProps) {
    const { isLoading, products, onClose, handleSearch, searching } = props;

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
                    <FilterView onSearch={handleSearch} onClose={onClose} />

                    {/* {(isLoading || searching) && <LoadView />} */}
                    {/* <div className='h-10'>
                        {(isLoading || searching) && <LoadView />}
                    </div> */}
                    {/* {products.length == 0 && !isLoading && (
                        <Typography level="h4" sx={{ padding: 10 }}>
                            No Calendar found.
                        </Typography>
                    )} */}
                    <div className="flex-row   pb-10 px-4 grid my-4  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full sm:max-w-7xl">
                        {products?.map((product, index) => (
                            <CalendarCard product={product} key={index} />
                        ))}
                        <CalendarCard product={''} key={1} />
                    </div>
                </Box>
            </div>
        </>
    );
}

export default CalendarView;
