import BackView from '@/app/components/base/back/BackView';
import PdfView from '@/app/components/common/Widget/PdfView';
import { useModalContext } from '@/context/modal-context';
import { CalendarModel } from '@/hooks/useCalendarData';
import { CalendarIcon } from '@heroicons/react/24/outline';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Button, Tooltip, Typography } from '@mui/joy';
import { Share2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './style.css';

interface ViewProps {
    data: any;
    product: CalendarModel | undefined;
}

function removeContainerClass(html: string) {
    // 去掉 class="container"
    html = html.replace(/class\s*=\s*["']container["']/g, '');
    // 去掉 class="xxx container yyy"
    html = html.replace(/class\s*=\s*["']([^"']*\s)?container(\s[^"']*)?["']/g, (match, p1, p2) => {
        // 保留其他 class
        let classes = match.match(/class\s*=\s*["']([^"']*)["']/)?.[1] || '';
        let filtered = classes
            .split(/\s+/)
            .filter((c) => c && c !== 'container')
            .join(' ');
        return filtered ? `class="${filtered}"` : '';
    });
    return html;
}

function processHtml(html: string) {
    // 去掉 container class
    html = removeContainerClass(html);

    // 给所有 a 标签加 target="_blank" rel="noopener noreferrer"
    html = html.replace(/<a\s+([^>]*?)>/gi, (match, p1) => {
        // 如果已经有 target 或 rel，先去掉再加
        let newAttrs = p1
            .replace(/\s*target\s*=\s*(['"]).*?\1/gi, '')
            .replace(/\s*rel\s*=\s*(['"]).*?\1/gi, '')
            .trim();
        return `<a ${newAttrs} target="_blank" rel="noopener noreferrer">`;
    });
    return html;
}

function CalendarDetailView(props: ViewProps) {
    const { product } = props;
    const router = useRouter();
    const { setShowShareQRcode } = useModalContext();

    const [description, setDescription] = useState(``);
    const handleClickShare = () => {
        setShowShareQRcode({
            payload: {
                link: `https://hkcalendar.vercel.app/share/calendars/${product?.id}`,
                name: product?.name
            }
        });
    };

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView
                        title="Back"
                        onClick={() => {
                            router.push('/calendar');
                        }}
                    />
                    <div className="w-full  flex flex-col sm:flex-row justify-center space-y-4   sm:space-x-8 ">
                        <div className="w-full sm:2/3 space-y-4  overflow-x-auto">
                            <div className="flex items-center justify-between space-x-4 flex-row">
                                <Typography level="h4">{product?.name}</Typography>
                                <Tooltip title="Share">
                                    <Share2Icon
                                        className=" text-[#f97316] text-md hover:text-orange-600 cursor-pointer w-10"
                                        onClick={handleClickShare}
                                    />
                                </Tooltip>
                            </div>
                            <p className="text-sm font-semibold flex flex-row items-center text-orange-500 ">
                                <CalendarIcon className="w-4 mr-2" />
                                {product?.from_date} - {product?.to_date}
                            </p>
                            <p className="text-sm font-semibold flex flex-row items-center text-orange-500 ">
                                <AccessTimeOutlinedIcon
                                    sx={{ fontSize: 16, color: '#f97316', mr: 1 }}
                                />
                                {product?.pre_from_date} - {product?.pre_to_date}
                            </p>

                            <div className="break-words">
                                {/* <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        a: ({ node, ...props }) => (
                                            <a
                                                target="_blank"
                                                {...props}
                                                className="no-underline hover:underline text-blue-500"
                                                style={{ wordBreak: 'break-word' }}
                                            />
                                        ),
                                        img: ({ node, ...props }) => (
                                            <img
                                                {...props}
                                                className="rounded-lg max-w-full h-auto"
                                                style={{ maxHeight: '200px' }}
                                                alt=""
                                            />
                                        ),
                                        p: ({ node, ...props }) => (
                                            <p {...props} style={{ wordBreak: 'break-word' }} />
                                        )
                                    }}
                                    skipHtml={false}
                                >
                                    {product?.description}
                                </ReactMarkdown> */}
                                <div
                                    className="prose max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: processHtml(product?.description || '')
                                    }}
                                ></div>
                            </div>
                            <div>
                                {product?.files_url && (
                                    <div className="my-4">
                                        <p className="text-md font-semibold">相關文件:</p>
                                        {product?.files_url
                                            ?.split(',')
                                            .map((url, index) => (
                                                <PdfView key={index} content={url} />
                                            ))}
                                    </div>
                                )}
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
