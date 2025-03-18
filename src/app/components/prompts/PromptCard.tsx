import { PromptModel } from '@/hooks/usePromptData';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { IconButton, Typography } from '@mui/joy';
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/navigation';
import TagView from './TagView';
import UserView from './UserView';
interface ViewProps {
    prompt: PromptModel;
}

export default function PromptCard(props: ViewProps) {
    const { prompt } = props;
    const router = useRouter();

    const handleClick = () => {
        console.log('Clicked!'); // 添加调试信息
        router.push(`/prompts/${prompt.id}`)

    };
    const handleCopy = (e: any) => {
        e.stopPropagation()
        copy(prompt.prompt)
    };
    return (
        <>
            <div
                className=" border rounded-md overflow-x-hidden  hover:shadow-lg cursor-pointer p-4 space-y-2 bg-white"
                onClick={handleClick}
            >
                <div className="flex flex-row space-x-2">

                    <div className="w-full overflow-hidden space-y-1 ">
                        <div className="flex flex-row items-center justify-between">
                            <Typography
                                level='h4'
                                style={{
                                    whiteSpace: 'nowrap', // 不换行
                                    overflow: 'hidden', // 超出部分隐藏
                                    textOverflow: 'ellipsis' // 显示省略号
                                }}
                            >
                                {prompt.title}
                            </Typography>
                            <IconButton onClick={handleCopy}>
                                <ContentCopyOutlinedIcon sx={{ width: '20px' }} />
                            </IconButton>
                        </div>
                        <UserView user={prompt.account} />
                        <Typography
                            level='body-sm'
                            className="text-sm text-black"
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 4,
                                height: '6em' // 根据行高设置最大高度
                            }}
                        >
                            {prompt.prompt}
                        </Typography>
                    </div>
                </div>
                <div className='flex flex-row items-center overflow-hidden space-x-2'>
                    {prompt?.tags?.map((tag: any, index: number) => (
                        <TagView tag={tag} key={index} />
                    ))}
                </div>
                <div className="flex flex-row  overflow-x-hidden  justify-between items-center">
                    <div className="flex flex-row space-x-4  ">

                        <>
                            <Typography
                                startDecorator={
                                    <RemoveRedEyeOutlinedIcon sx={{ width: 12 }} />
                                }
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {prompt.view}
                            </Typography>
                            <Typography
                                startDecorator={
                                    <StarBorderOutlinedIcon sx={{ width: 12 }} />
                                }
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {prompt.collect}
                            </Typography>
                            <Typography
                                startDecorator={<FavoriteBorderOutlined sx={{ width: 12 }} />}
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {prompt.focus}
                            </Typography>

                            <Typography
                                startDecorator={
                                    <ContentCopyOutlinedIcon sx={{ width: 12 }} />
                                }
                                sx={{
                                    color: 'gray',
                                    fontSize: 12
                                }}
                            >
                                {prompt.copy}
                            </Typography>
                        </>

                    </div>
                    <Typography level='body-xs'>{prompt.created_at}</Typography>
                </div>
            </div >
        </>
    );
}
