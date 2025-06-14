import { NextResponse } from 'next/server';
import qs from 'qs';

export async function POST(req: Request) {
    const apiUrl = 'https://api-service.chanmama.com/v5/home/aweme/search';
    const headers = {
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CHANMAMA_TOKEN
    };

    try {
        const { params } = await req.json();
        const urlParams = qs.stringify(params);
        // console.log('params', params);
        const apiRes = await fetch(apiUrl + '?' + urlParams, { method: 'get', headers });
        const data = await apiRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
