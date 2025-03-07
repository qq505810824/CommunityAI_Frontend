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
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';

export const Chatbot_Features = [
    {
        name: '智能任务',
        value: 'intelligent_mission'
    },
    {
        name: '智能回答',
        value: 'chatting'
    },
    {
        name: '超智能回答',
        value: 'chatting_plus'
    },
    {
        name: '閱讀理解',
        value: 'reading_comprehension'
    },
    {
        name: '智能數據',
        value: 'smart_extract_schema'
    }
];

export const ModelTypes = {
    none: [
        {
            name: 'gpt-3.5-turbo-16k',
            value: 'gpt-3.5-turbo-16k'
        },
        {
            name: 'gpt-3.5-turbo',
            value: 'gpt-3.5-turbo'
        },
        {
            name: 'gpt-4',
            value: 'gpt-4'
        },
        {
            name: 'gpt-4-32k',
            value: 'gpt-4-32k'
        }
    ],
    schema: [
        {
            name: '統計',
            value: 'statistics'
        },
        {
            name: '圖表',
            value: 'chart'
        }
    ],
    documents: [
        {
            name: 'QA',
            value: 'qa'
        }
    ]
};

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
    }
];

export const AppFormData = {
    fieldSchema: {
        title: { type: 'string', title: '名称', required: true },
        category: { type: 'string', title: '分类', required: true },
        description: { type: 'string', title: '描述', required: true },
        data_url: { type: 'string', title: '网址链接', required: true },
        img_src: { type: 'string', title: 'Logo图片链接', required: true }
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        category: { 'ui:widget': 'select', 'ui:options': { enumOptions: AppMeuns.map(menu => menu.name) } },
        description: { 'ui:widget': 'textarea' },
        data_url: { 'ui:widget': 'text' },
        img_src: { 'ui:widget': 'text' }
    }
};