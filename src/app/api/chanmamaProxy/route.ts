import { NextResponse } from 'next/server';
import qs from 'qs';

export async function POST(req: Request) {
    const apiUrl = 'https://api-service.chanmama.com/v5/home/aweme/search';
    const headers = {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTAwMDAsImFwcFZlcnNpb24iOiIiLCJleHBpcmVfdGltZSI6MTc0NzI0OTIwMCwiaWF0IjoxNzQ2NjY4MzE0LCJpZCI6MTQyOTc3MjksImtpZCI6IkNBU0VSLUVLR1RRSDVIT1dMQy1YUzkxNDQiLCJyayI6IlRDN2l1In0.fD1_fPJcwwBZZGJ9z5V5jRmJpKSJiRqnGyW8BXEBTGs'
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
