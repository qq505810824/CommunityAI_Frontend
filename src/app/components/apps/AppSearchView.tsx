import SearchInputView from '../common/Views/SearchInputView';
interface ViewProps {
    onSearch: any;
}

function AppSearchView(props: ViewProps) {
    const { onSearch } = props;
    return (
        <>
            <div className="w-full flex flex-row items-center py-4 justify-between sticky top-0 z-10 bg-gray-100">
                <div className="flex-shrink-0">
                    <h1 className=" font-medium text-xl">AI 工具</h1>
                </div>
                <div className=" items-center flex justify-end">
                    <SearchInputView handleSearch={onSearch} />
                </div>
                {/* <div className="flex-shrink-0 hidden">
                    <Button color="primary"></Button>
                </div> */}
            </div>
        </>
    );
}

export default AppSearchView;
