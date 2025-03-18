
interface ViewProps {
    prompt: string
}

export default function PromptInfoView(props: ViewProps) {
    const { prompt } = props;

    return (
        <>
            <div className=" border text-[#374151] bg-slate-50 rounded-md text-md font-sans h-[800px] p-4 overflow-x-scroll whitespace-pre-wrap">
                {prompt}
            </div>
        </>
    );
}
