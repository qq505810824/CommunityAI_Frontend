import FilterView from '@/app/components/prompts/FilterView';
import PromptCard from '@/app/components/prompts/PromptCard';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { PromptModel } from '@/hooks/usePromptData';
import { Box, Typography } from '@mui/joy';
interface ViewProps {
    data: any;
    isLoading: any;
    prompts: PromptModel[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
}
function DemoHeroGeometric() {
    return <HeroGeometric badge="Prompt知识库" title1="属于你的知识库" title2="Digital Vision" />;
}
function PromptView(props: ViewProps) {
    const { isLoading, prompts, onClose, handleSearch, searching } = props;

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
                    {prompts.length == 0 && !isLoading && (
                        <Typography level="h4" sx={{ padding: 10 }}>
                            No prompts found.
                        </Typography>
                    )}
                    <div className="flex-row   pb-10 px-4 grid   sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full sm:max-w-7xl">
                        {prompts?.map((product, index) => (
                            <PromptCard prompt={product} key={index} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default PromptView;
