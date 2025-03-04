import DevelopCard from '@/app/components/space/develop/DevelopCard';
import TemplateHeaderView from '@/app/components/template/TemplateHeaderView';
import { Box } from '@mui/joy';
interface ViewProps {
    data: any;
    intelligences: any[];
}

function DevelopView(props: ViewProps) {
    const { intelligences } = props;

    return (
        <>
            <div className="flex w-full flex-row">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <TemplateHeaderView />

                    <div className="flex-row  px-4 grid   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {intelligences?.map((intelligence, index) => (
                            <DevelopCard intelligence={intelligence} key={index} />
                        ))}
                    </div>
                </Box>
            </div>
        </>
    );
}

export default DevelopView;
