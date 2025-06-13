import BookCard from '@/app/components/books/BookCard';
import LoadView from '@/app/components/prompts/LoadView';
import { BookModel } from '@/models/Book';
import { Box, Typography } from '@mui/joy';
interface ViewProps {
    data: any;
    isLoading: any;
    products: BookModel[];
    onClose: () => void;
    handleSearch: any;
    onSwitchCategory: any;
    searching?: boolean;
    filters?: any;
    setFilters?: any;
}

function BooksView(props: ViewProps) {
    const {
        isLoading,
        products,
        onClose,
        handleSearch,
        onSwitchCategory,
        searching,
        filters,
        setFilters
    } = props;

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

                    {/* {(isLoading || searching) && <LoadView />} */}
                    <div>{(isLoading || searching) && <LoadView />}</div>
                    {products.length == 0 && !isLoading && !searching && (
                        <Typography level="h4" sx={{ padding: 10 }}>
                            No Data.
                        </Typography>
                    )}
                    <div className="flex-row   pb-10 px-4 grid my-4  sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 w-full sm:max-w-7xl">
                        {products?.map((product, index) => (
                            <BookCard product={product} key={index} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default BooksView;
