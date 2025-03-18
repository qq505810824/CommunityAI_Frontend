import BackView from '@/app/components/base/back/BackView';
import OperationView from '@/app/components/prompts/OperationView';
import PromptInfoView from '@/app/components/prompts/PromptInfoView';
import TagView from '@/app/components/prompts/TagView';
import UserView from '@/app/components/prompts/UserView';
import { PromptModel } from '@/hooks/usePromptData';
import { Typography } from '@mui/joy';

interface ViewProps {
    data: any;
    prompt: PromptModel | undefined;
}

function PromptDetailView(props: ViewProps) {
    const { prompt } = props;


    return (
        <>
            <div className="w-full flex flex-col sm:flex-row px-4 sm:px-10 py-4 gap-4  ">
                <div className="w-full  sm:w-1/3 space-y-4">
                    <BackView title="Back" />
                    <Typography level="h4">{prompt?.title}</Typography>
                    <UserView
                        user={prompt?.account}
                        imgClassName={"w-10 h-10"}
                        textClassName={{
                            fontSize: 16
                        }}
                    />
                    <p
                        className=" font-sans text-[#374151] text-sm whitespace-pre-wrap"
                        style={{ lineHeight: '1.6' }}
                    >
                        {prompt?.description}
                    </p>
                    <div className="flex flex-row flex-wrap items-center gap-2">
                        {prompt?.tags?.map((tag: any, index: number) => (
                            <TagView tag={tag} key={index} />
                        ))}
                    </div>
                </div>
                <div className=" w-full sm:w-2/3 mt-8 space-y-2">
                    <OperationView prompt={prompt} />
                    <PromptInfoView prompt={prompt?.prompt || ''} />
                </div>
            </div>
        </>
    );
}

export default PromptDetailView;
