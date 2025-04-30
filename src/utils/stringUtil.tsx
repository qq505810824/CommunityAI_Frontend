import _ from 'lodash';

//判断是否是中文
const isChinese = (str: string) => {
    const lst = /[u00-uFF]/;
    return !lst.test(str);
};

//中英文混合计算字符长度
export const getStrTokens = (str: string) => {
    let strlength = 0;
    for (let i = 0; i < str.length; ++i) {
        if (isChinese(str.charAt(i)) == true)
            strlength = strlength + 2; //中文计算为2个字符
        else strlength = strlength + 1; //中文计算为1个字符
    }
    if (strlength > 0) {
        strlength = Math.ceil(strlength / 2);
    }
    return strlength;
};

export const getTransitionChartContent = (html: string, position: number) => {
    const regex = /id="([^"]+)"/g;
    let match;
    const ids = [];

    while ((match = regex.exec(html)) !== null) {
        ids.push(match[1]);
    }
    _.map(ids, function (id) {
        html = html.replaceAll(id, id + position);
    });
    return html;
};

export const isValidEmail = (email: string) => {
    // 正则表达式模式
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 使用正则表达式测试字符串
    return pattern.test(email);
};

export const isValidJSON = (jsonStr: string) => {
    if (!jsonStr) return false;
    const cleanedContent = jsonStr.replace(/\n/g, '\\n');
    try {
        const jsonObject = JSON.parse(cleanedContent);
        if (typeof jsonObject === 'object' && jsonObject !== null) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const unlessHtmlTag = (content: string) => {
    if (_.isEmpty(content)) return '';
    // 正则表达式模式
    const pattern = /<[^>]*>/g;
    // 使用正则表达式测试字符串
    return content.replace(pattern, '');
};

export const removeHtmlTags = (text: string) => {
    const cleanText = text.replace(
        /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g,
        ''
    );
    return cleanText;
};

export const formatK = (value: number) => {
    return value > 10000
        ? (value / 10000).toFixed(2) + 'w'
        : value > 1000
          ? (value / 1000).toFixed(2) + 'k'
          : value;
};

export async function extractInfoFromHTML(htmlContent: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const results: any = [];

    const cards = doc.querySelectorAll('.url-card');
    cards.forEach((card) => {
        const titleElement = card.querySelector('strong');
        const descriptionElement = card.querySelector('p');
        const imgElement = card.querySelector('img');
        const linkElement = card.querySelector('a');

        if (
            titleElement &&
            descriptionElement &&
            imgElement &&
            linkElement &&
            titleElement.textContent &&
            descriptionElement.textContent
        ) {
            results.push({
                title: titleElement.textContent.trim(),
                description: descriptionElement.textContent.trim(),
                img_src: imgElement.src,
                data_url: linkElement.dataset.url,
                url: linkElement.href
            });
        }
    });

    return results;
}

export default function HotTags() {
    const colorPalette = [
        { bg: 'bg-blue-100', text: 'text-blue-800', hover: 'hover:bg-blue-200' },
        { bg: 'bg-green-100', text: 'text-green-800', hover: 'hover:bg-green-200' },
        { bg: 'bg-yellow-100', text: 'text-yellow-800', hover: 'hover:bg-yellow-200' },
        { bg: 'bg-purple-100', text: 'text-purple-800', hover: 'hover:bg-purple-200' },
        { bg: 'bg-pink-100', text: 'text-pink-800', hover: 'hover:bg-pink-200' },
        { bg: 'bg-indigo-100', text: 'text-indigo-800', hover: 'hover:bg-indigo-200' }
    ];

    const tags = [
        { name: 'AI对话', count: 65 },
        { name: 'AI助手', count: 60 },
        { name: 'AI搜索', count: 56 },
        { name: '人工智能图书', count: 56 },
        { name: 'AI聊天', count: 55 },
        { name: 'AI问答', count: 53 },
        { name: 'AI工具集', count: 49 },
        { name: 'AI工具目录', count: 48 },
        { name: 'AI工具库', count: 48 },
        { name: 'AI工具箱', count: 47 },
        { name: 'AI绘画', count: 42 },
        { name: 'AI聊天机器人', count: 41 },
        { name: 'AI写作', count: 38 },
        { name: '文本转视频', count: 36 },
        { name: 'AI视频', count: 32 },
        { name: 'AI检索', count: 28 },
        { name: 'AI视频创作', count: 27 },
        { name: 'ChatGPT', count: 27 },
        { name: 'AI写作助手', count: 27 },
        { name: '图片转视频', count: 27 }
    ];

    return (
        <div className="w-[300px] mx-auto p-1">
            <h2 className="text-xl font-bold mb-6 text-gray-800">热门标签</h2>
            <div className="flex justify-between flex-wrap gap-3">
                {tags.map((tag, index) => {
                    const colors = colorPalette[index % colorPalette.length];
                    return (
                        <div
                            key={index}
                            className={`flex items-center 
                         px-2 py-1 rounded-md transition-all hover:shadow-sm 
                         cursor-pointer ${colors.text}`}
                            style={{
                                backgroundColor: `hsl(${index * 50}, 80%, 90%)`,
                                color: `hsl(${index * 50}, 80%, 30%)`
                            }}
                        >
                            <span className="text-xs ">{tag.name}</span>
                            <span className="text-xs ml-1 opacity-80">({tag.count})</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
