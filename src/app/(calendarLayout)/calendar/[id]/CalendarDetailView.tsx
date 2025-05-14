import BackView from '@/app/components/base/back/BackView';
import { PromptModel } from '@/hooks/usePromptData';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Button, Typography } from '@mui/joy';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 导入 remark-gfm

interface ViewProps {
    data: any;
    prompt: PromptModel | undefined;
}

function CalendarDetailView(props: ViewProps) {
    const { prompt } = props;

    const [description, setDescription] = useState(`每月相聚，桌遊的魅力世界

日期：2025年5月24日(星期六)

時間：晚上8:00

地點：澳門林茂塘海邊馬路信潔花園地下A舖一樓

對象：本會會員

內容：桌遊學習及體驗

報名費：澳門幣20元

報名連結：https://docs.google.com/forms/d/1_JRM7uOocNJ27VweCDvjrRITeP271zpx2YuXAdGbPQQ/edit

        `)
    return (
        <>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='w-full sm:max-w-7xl px-4 py-4 flex flex-col  '>
                    <BackView title="Back" />
                    <div className="w-full sm:max-w-7xl flex flex-col sm:flex-row justify-center  ">

                        <div className="w-full sm:1/2 space-y-4  overflow-x-auto">

                            <Typography level="h4">{'prompt?.title'}</Typography>
                            <p className='text-sm font-semibold'>報名日期:</p>
                            <p className='text-sm font-semibold'>活動日期:</p>

                            <div className=" break-words">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        a: ({ node, ...props }) => (
                                            <a
                                                target="_blank"
                                                {...props}
                                                className=" no-underline hover:underline text-blue-500"
                                            /> // 自定义链接样式为蓝色
                                        ),
                                        img: ({ node, ...props }) => (
                                            <img {...props} className=" rounded-lg h-[200px]" /> // 设置图片最大高度为200px
                                        )
                                    }}
                                >
                                    {description
                                        ?.replace(/\n\n/g, '\n\n')
                                        .replace(/\n/g, '  \n')}
                                </ReactMarkdown>
                            </div>
                            <div>
                                <Button startDecorator={<ShareOutlinedIcon sx={{ width: '18px' }} />}>相關網址</Button>
                            </div>
                        </div>
                        <div className="w-full sm:1/2">
                            <img
                                src={'https://www.mocalendar.com/storage/events/tb-MVeD284VesCAYc1VoxbhcLEqFXc7TcL3qCI6fk7P.jpeg'}
                                className="w-full h-auto object-cover rounded-t-3xlmd"
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarDetailView;
