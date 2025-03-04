import { Search } from '@mui/icons-material';
import { Input } from '@mui/joy';
interface ViewProps {}

function TemplateHeaderView(props: ViewProps) {
    return (
        <>
            <div className="w-full flex flex-row items-center py-4 justify-between sticky top-0 z-10 bg-gray-100 px-4">
                <div className="flex-shrink-0">
                    <h1 className=" font-medium text-xl">模版</h1>
                </div>
                <div className="flex-1 items-center flex justify-center">
                    <Input
                        size="sm"
                        placeholder="搜索"
                        className="sm:w-1/3 w-2/3"
                        startDecorator={<Search />}
                    />
                </div>
                <div className="flex-shrink-0"></div>
            </div>
        </>
    );
}

export default TemplateHeaderView;
