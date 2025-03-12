import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: '请提供有效的URL' }, { status: 400 });
        }

        // 发送请求获取网页内容
        const response = await fetch(url);
        const html = await response.text();

        // 使用 cheerio 解析 HTML
        const $ = cheerio.load(html);

        // 获取网站标题
        const title =
            $('meta[property="og:site_name"]').attr('content') ||
            $('title').text() ||
            $('meta[property="og:title"]').attr('content') ||
            $('meta[name="twitter:title"]').attr('content');

        // 获取网站描述
        const description =
            $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') ||
            $('meta[name="twitter:description"]').attr('content');

        // 获取网站图标
        const favicon =
            $('link[rel="icon"]').attr('href') ||
            $('link[rel="shortcut icon"]').attr('href') ||
            $('link[rel="apple-touch-icon"]').attr('href') ||
            new URL('/favicon.ico', url).href;

        // 如果图标URL是相对路径，转换为绝对路径
        const absoluteFavicon = favicon.startsWith('http')
            ? favicon
            : new URL(favicon, url).href;

        return NextResponse.json({
            title: title?.trim(),
            description: description?.trim(),
            img_src: absoluteFavicon
        });
    } catch (error) {
        console.error('获取元数据失败:', error);
        return NextResponse.json({ error: '获取网站信息失败' }, { status: 500 });
    }
}
