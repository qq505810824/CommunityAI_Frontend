import ChatInput from '@/app/components/formulabot/chat/input';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import { Divider, Typography } from '@mui/joy';

interface ViewProps {
    data?: any;
}

function DashboardView(props: ViewProps) {
    const { data } = props;
    return (
        <>
            <div className=" w-full flex  justify-center">
                <div className="w-[800px] min-w-[300px] space-y-4">
                    <div>
                        <Typography level="body-md" sx={{ fontSize: 34 }}>
                            Good Morning, Friend{' '}
                        </Typography>
                        <div className="flex justify-between items-center">
                            <Typography level="body-md" sx={{ fontSize: 34, color: '#858481' }}>
                                What can I do for you?
                            </Typography>
                            <button className="    rounded-md bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 flex items-center justify-center">
                                Getting started
                            </button>
                        </div>
                    </div>
                    <ChatInput />
                    <div className=" grid grid-cols-4 gap-4">
                        <div>
                            <div className="w-10 h-10 flex justify-center items-center  bg-[#f3e8ff] rounded-full">
                                <FileUploadOutlinedIcon sx={{ fontSize: 18 }} />
                            </div>

                            <Typography level="title-md" sx={{ fontSize: 18 }}>
                                Upload data
                            </Typography>
                            <Typography level="body-md" sx={{ fontSize: 14 }}>
                                Upload spreadsheets, PDFs or integrate one of our data connectors.
                            </Typography>
                        </div>
                        <div>
                            <div className="w-10 h-10 flex justify-center items-center  bg-[#ffe4e6] rounded-full">
                                <TextsmsOutlinedIcon sx={{ fontSize: 14 }} />
                            </div>
                            <Typography level="title-md" sx={{ fontSize: 18 }}>
                                Ask Questions
                            </Typography>
                            <Typography level="body-md" sx={{ fontSize: 14 }}>
                                Generate charts, tables, insights, advanced models & more.
                            </Typography>
                        </div>
                        <div>
                            <div className="w-10 h-10 flex justify-center items-center  bg-[#e0fefe] rounded-full">
                                <ViewColumnOutlinedIcon sx={{ fontSize: 18 }} />
                            </div>
                            <Typography level="title-md" sx={{ fontSize: 18 }}>
                                Add AI-based columns
                            </Typography>
                            <Typography level="body-md" sx={{ fontSize: 14 }}>
                                Write a prompt to have it executed across all rows with Enrichments.
                            </Typography>
                        </div>
                        <div>
                            <div className="w-10 h-10 flex justify-center items-center  bg-[#dff3ef] rounded-full">
                                <LightbulbOutlinedIcon sx={{ fontSize: 18 }} />
                            </div>
                            <Typography level="title-md" sx={{ fontSize: 18 }}>
                                No data? No problem.
                            </Typography>
                            <Typography level="body-md" sx={{ fontSize: 14 }}>
                                I can help with anything, like Excel formulas, SQL queries, VBA, &
                                more.
                            </Typography>
                        </div>
                    </div>
                    <Divider>Visual indicator</Divider>
                </div>
            </div>
        </>
    );
}

export default DashboardView;
