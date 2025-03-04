import { Typography } from '@mui/joy';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 导入 remark-gfm
import ProductCard from './ProductCard';
interface ViewProps {
    feed: any;
}

export default function FeedListCard(props: ViewProps) {
    const { feed } = props;
    const router = useRouter();

    const handleClick = () => {
        router.push('https://www.coze.cn/store/agent/');
    };
    return (
        <>
            <div className=" space-y-4">
                <div className="flex flex-row items-center">
                    <Typography
                        className="text-xs text-gray-500 flex flex-row items-center"
                        startDecorator={
                            <img src={feed?.user_info?.avatar_url} className=" rounded-full w-5" />
                        }
                        sx={{
                            color: 'gray',
                            fontSize: 12
                        }}
                    >
                        {feed?.user_info?.user_name || feed?.user_info?.name}
                    </Typography>
                    <div className="ml-4">
                        <Typography
                            className="text-xs text-gray-500 flex flex-row items-center"
                            sx={{
                                color: 'gray',
                                fontSize: 12
                            }}
                        >
                            {moment(feed?.create_time).fromNow()}
                        </Typography>
                    </div>
                </div>
                {feed?.feed_content?.quote?.product_card && (
                    <div className="ml-4 space-y-2">
                        {feed?.feed_content?.quote?.product_card?.map(
                            (prodect: any, index: number) => (
                                <ProductCard product={prodect} key={index} />
                            )
                        )}
                    </div>
                )}
                {!feed?.feed_content?.quote?.product_card && (
                    <div className=" border rounded-lg p-2 ml-4">
                        {/* <div
                        className=" break-words"
                        dangerouslySetInnerHTML={{
                            __html: feed?.feed_content?.message?.text
                        }}
                    /> */}
                        <div className=" break-words p-2">
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
                                {feed?.feed_content?.message?.text
                                    ?.replace(/\n\n/g, '\n\n')
                                    .replace(/\n/g, '  \n')}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
