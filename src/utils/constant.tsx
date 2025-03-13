import {
    Audiotrack as AudiotrackIcon,
    Brush as BrushIcon,
    Chat as ChatIcon,
    Code as CodeIcon,
    DesignServices as DesignServicesIcon,
    Edit as EditIcon,
    ListAlt as ListAltIcon,
    School as SchoolIcon,
    Search as SearchIcon,
    VideoCameraFront as VideoCameraFrontIcon
} from '@mui/icons-material'; // 从 Material-UI 导入图标
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export const AppMeuns = [
    {
        name: 'AI 搜索引擎',
        href: '?type=AI 搜索引擎',
        icon: <SearchIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 聊天问答',
        href: '?type=AI 聊天问答',
        icon: <ChatIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Agent智能体',
        href: '?type=Agent智能体',
        icon: <GroupsIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 文本写作',
        href: '?type=AI 文本写作',
        icon: <EditIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 绘画作图',
        href: '?type=AI 绘画作图',
        icon: <BrushIcon sx={{ color: '#eeeeee' }} className="w-" />,
        items: []
    },
    {
        name: 'AI 设计工具',
        href: '?type=AI 设计工具',
        icon: <DesignServicesIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 视频创作',
        href: '?type=AI 视频创作',
        icon: <VideoCameraFrontIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 音频制作',
        href: '?type=AI 音频制作',
        icon: <AudiotrackIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 办公学习',
        href: '?type=AI 办公学习',
        icon: <SchoolIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 编程开发',
        href: '?type=AI 编程开发',
        icon: <CodeIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 网址导航',
        href: '?type=AI 网址导航',
        icon: <SendOutlinedIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Prompt指令',
        href: '?type=Prompt指令',
        icon: <ListAltIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'DocAI网站',
        href: '?type=DocAI网站',
        icon: <LanguageIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'YouTuBe网站',
        href: '?type=YouTuBe网站',
        icon: <LanguageIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: '其他网站',
        href: '?type=其他网站',
        icon: <AirplayOutlinedIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    }
];

