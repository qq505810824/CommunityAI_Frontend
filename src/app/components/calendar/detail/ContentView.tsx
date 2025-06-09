import { CalendarModel } from '@/hooks/useCalendarData';

interface ViewProps {
    product?: CalendarModel;
}

export default function ContentView(props: ViewProps) {
    const { product } = props;

    function removeContainerClass(html: string) {
        // 去掉 class="container"
        html = html.replace(/class\s*=\s*["']container["']/g, '');
        // 去掉 class="xxx container yyy"
        html = html.replace(
            /class\s*=\s*["']([^"']*\s)?container(\s[^"']*)?["']/g,
            (match, p1, p2) => {
                // 保留其他 class
                let classes = match.match(/class\s*=\s*["']([^"']*)["']/)?.[1] || '';
                let filtered = classes
                    .split(/\s+/)
                    .filter((c) => c && c !== 'container')
                    .join(' ');
                return filtered ? `class="${filtered}"` : '';
            }
        );
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

    return (
        <>
            <div className="break-words">
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: processHtml(product?.description || '')
                    }}
                ></div>
            </div>
        </>
    );
}
