import BackView from '@/app/components/base/back/BackView';
import { CalendarModel } from '@/hooks/useCalendarData';
import { CalendarIcon } from '@heroicons/react/24/outline';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Button, Typography } from '@mui/joy';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 导入 remark-gfm

interface ViewProps {
    data: any;
    product: CalendarModel | undefined;
}

function CalendarDetailView(props: ViewProps) {
    const { product } = props;

    const [description, setDescription] = useState(``);
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView title="Back" />
                    <div className="w-full  flex flex-col sm:flex-row justify-center space-y-4  ">
                        <div className="w-full sm:2/3 space-y-4  overflow-x-auto">
                            <Typography level="h4">{product?.name}</Typography>
                            <p className="text-sm font-semibold flex flex-row items-center text-orange-500 ">
                                <CalendarIcon className="w-4 mr-2" />
                                {product?.from_date} - {product?.to_date}
                            </p>
                            <p className="text-sm font-semibold flex flex-row items-center text-orange-500 ">
                                <AccessTimeOutlinedIcon
                                    sx={{ fontSize: 16, color: '#f97316', mr: 1 }}
                                />
                                {product?.from_date} - {product?.to_date}
                            </p>

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
                                            <img
                                                {...props}
                                                className=" rounded-lg h-[200px]"
                                                alt=""
                                            /> // 设置图片最大高度为200px
                                        )
                                    }}
                                >
                                    {product?.description}
                                </ReactMarkdown>
                            </div>
                            <div>
                                {product?.reference_url && (
                                    <Button
                                        startDecorator={
                                            <ShareOutlinedIcon sx={{ width: '18px' }} />
                                        }
                                        onClick={() => {
                                            window.open(product?.reference_url, '_blank');
                                        }}
                                    >
                                        相關網址
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="w-full sm:1/3">
                            <img
                                src={product?.image_url}
                                className="w-[400px] h-auto object-cover"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarDetailView;
