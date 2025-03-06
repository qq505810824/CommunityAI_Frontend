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
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <AppSearchView onSearch={onSearch} />

                    <div className="w-full my-4">
                        <p className="text-xl text-black font-semibold ">
                            搜索 " {data?.keyword} "的结果
                        </p>
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
