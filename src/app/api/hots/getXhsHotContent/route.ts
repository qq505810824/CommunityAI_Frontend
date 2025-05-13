import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const apiUrl =
        'https://gw.newrank.cn/api/mainRank/nr/mainRank/hotContent/getXhsHotContent';
    const headers = {
        'Content-Type': 'application/json',
        'n-token': '3b2f8f99af0545cc989cfae76477d9bf',
        'Cookie': `token=B2BD530396034027A387FA6A5459D7E5;`
    };

    try {
        const params = await req.json();
        // console.log('params', params);

        const apiRes = await fetch(apiUrl, { method: 'post', headers, body: JSON.stringify(params) });
        const data = await apiRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
