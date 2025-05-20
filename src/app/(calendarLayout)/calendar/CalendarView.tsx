import CalendarCard from '@/app/components/calendar/CalendarCard';
import FilterView from '@/app/components/calendar/FilterView';
import LoadView from '@/app/components/prompts/LoadView';
import { CalendarModel } from '@/hooks/useCalendarData';
import { Box, Typography } from '@mui/joy';
interface ViewProps {
    data: any;
    isLoading: any;
    products: CalendarModel[];
    onClose: () => void;
    handleSearch: any;
    onSwitchCategory: any;
    searching?: boolean;
    filters?: any;
    setFilters?: any;
}

function CalendarView(props: ViewProps) {
    const { isLoading, products, onClose, handleSearch, onSwitchCategory, searching, filters, setFilters } = props;

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
                        onSwitchCategory={onSwitchCategory}
                        onClose={onClose}
                        filters={filters}
                        setFilters={setFilters}
                    />

                    {/* {(isLoading || searching) && <LoadView />} */}
                    <div>{(isLoading || searching) && <LoadView />}</div>
                    {products.length == 0 && !isLoading && !searching && (
                        <Typography level="h4" sx={{ padding: 10 }}>
                            No Data.
                        </Typography>
                    )}
                    <div className="flex-row   pb-10 px-4 grid my-4  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full sm:max-w-7xl">
                        {products?.map((product, index) => (
                            <CalendarCard product={product} key={index} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default CalendarView;
