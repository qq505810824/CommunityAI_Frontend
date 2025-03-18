import BackView from "@/app/components/base/back/BackView";
import TagView from "@/app/components/prompts/TagView";
import UserView from "@/app/components/prompts/UserView";
import { PromptModel } from "@/hooks/usePromptData";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { IconButton, Typography } from "@mui/joy";
import copy from "copy-to-clipboard";

interface ViewProps {
    data: any;
    prompt: PromptModel | undefined;
}

function PromptDetailView(props: ViewProps) {
    const { prompt } = props;

    const handleCopy = (e: any) => {
        e.stopPropagation()
        copy(prompt?.prompt || '')
    };
    return (
        <>
            <div className="w-full flex flex-col sm:flex-row px-4 sm:px-10 py-4 gap-4  ">
                <div className="w-full  sm:w-1/3 space-y-4">
                    <BackView title="Back" />
                    <Typography level="h4">{prompt?.title}</Typography>
                    <UserView user={prompt?.account} />
                    <p className=" font-sans text-[#374151] text-sm whitespace-pre-wrap" style={{ lineHeight: '1.6' }}>
                        {prompt?.description}
                    </p>
                    <div className="flex flex-row flex-wrap items-center gap-2">
                        {prompt?.tags?.map((tag: any, index: number) => (
                            <TagView tag={tag} key={index} />
                        ))}
                    </div>
                </div>
                <div className=" w-full sm:w-2/3 mt-8 space-y-2">
                    <div className="flex flex-row items-center justify-end gap-2">
                        <IconButton>
                            <FavoriteBorderOutlinedIcon sx={{ width: '18px' }} />
                        </IconButton>
                        <IconButton>
                            <StarBorderOutlinedIcon sx={{ width: '18px' }} />
                        </IconButton>
                        <IconButton onClick={handleCopy}>
                            <ContentCopyOutlinedIcon sx={{ width: '18px' }} />
                        </IconButton>
                        <IconButton>
                            <ShareOutlinedIcon sx={{ width: '18px' }} />
                        </IconButton>
                    </div>
                    <div className=" border text-[#374151] bg-slate-50 rounded-md text-md font-sans h-[800px] p-4 overflow-x-scroll whitespace-pre-wrap">
                        {prompt?.prompt}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromptDetailView;
