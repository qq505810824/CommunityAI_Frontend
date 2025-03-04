import { Search } from '@mui/icons-material';
import { Button, Input } from '@mui/joy';
interface ViewProps {}

function ModelHeaderView(props: ViewProps) {
    return (
        <>
            <div className="w-full flex flex-row items-center py-4 justify-between sticky top-0 z-30 bg-gray-100 px-4">
                <div className="flex-shrink-0">
                    <h1 className=" font-medium text-xl">模型广场</h1>
                </div>
                <div className="flex-1 items-center flex justify-center">
                    <Input
                        size="sm"
                        placeholder="搜索"
                        className="sm:w-1/3 w-2/3"
                        startDecorator={<Search />}
                    />
                </div>
                <div className="flex-shrink-0 space-x-2">
                    <Button color="neutral">规矩</Button>
                    <Button color="neutral">模型合作</Button>
                </div>
            </div>
        </>
    );
}

export default ModelHeaderView;
