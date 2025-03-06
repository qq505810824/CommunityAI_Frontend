import AppCard from '@/app/components/apps/AppCard';
import AppSearchView from '@/app/components/apps/AppSearchView';
import { Box } from '@mui/joy';
interface ViewProps {
    data: any;
    onSearch: any;
}

function SearchView(props: ViewProps) {
    const { data, onSearch } = props;
    return (
        <>
            <div className="flex flex-row px-2 sm:px-8">
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <AppSearchView onSearch={onSearch} />

                    <div className="w-full flex flex-row items-center my-4">
                        搜索
                        <p className="text-xl text-black font-semibold ">
                            " {data?.keyword} "
                        </p>
                        的结果 ( {data?.apps?.length} )
                    </div>
                    <div className="flex-row   grid   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {data?.apps?.map((data: any, index: number) => (
                            <AppCard data={data} key={index} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default SearchView;
