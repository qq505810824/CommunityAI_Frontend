import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiUrl =
        'https://api-service.chanmama.com/v5/home/aweme/search?anchor_info_type=&anchor_info_title=&gender_type=-1&age_types=&province=&page=1&video_tag=%E5%B1%85%E5%AE%B6&video_sub_tag=&video_third_tag=&keyword=&digg=&follower_counts=&durations=&hour_ranges=&sort=digg_count&size=50&time=24h&goods_relatived=0&fans_hottest=0&group_buy_relatived=0&aweme_graph_type=0&is_hot=0&filter_delete=1&order_by=desc&from=detail&product_title=&poi_name=&spu_name=&blue_words=';
    const headers = {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTAwMDAsImFwcFZlcnNpb24iOiIiLCJleHBpcmVfdGltZSI6MTc0NzI0OTIwMCwiaWF0IjoxNzQ2NjY4MzE0LCJpZCI6MTQyOTc3MjksImtpZCI6IkNBU0VSLUVLR1RRSDVIT1dMQy1YUzkxNDQiLCJyayI6IlRDN2l1In0.fD1_fPJcwwBZZGJ9z5V5jRmJpKSJiRqnGyW8BXEBTGs'
    };

    try {
        const apiRes = await fetch(apiUrl, { headers });
        const data = await apiRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
