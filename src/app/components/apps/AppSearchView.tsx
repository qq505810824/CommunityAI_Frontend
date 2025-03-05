import { Search } from '@mui/icons-material';
import { Input } from '@mui/joy';
interface ViewProps { }

function AppSearchView(props: ViewProps) {
    return (
        <>
            <div className="w-full flex flex-row items-center py-4 justify-between sticky top-0 z-10 bg-gray-100">
                <div className="flex-shrink-0">
                    <h1 className=" font-medium text-xl">AI 工具</h1>
                </div>
                <div className="flex-1 w-fll items-center flex justify-end">
                    <Input
                        size="sm"
                        placeholder="搜索"
                        className="sm:w-1/3 w-2/3"
                        startDecorator={<Search />}
                    />
                </div>
                {/* <div className="flex-shrink-0 hidden">
                    <Button color="primary"></Button>
                </div> */}
            </div>
        </>
    );
}

export default AppSearchView;
