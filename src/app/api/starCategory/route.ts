import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const apiUrl =
        'https://api-service.chanmama.com/v1/common/starCategory?has_star=0&no_gov=0&is_third=1';
    const headers = {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTAwMDAsImFwcFZlcnNpb24iOiIiLCJleHBpcmVfdGltZSI6MTc0NzI0OTIwMCwiaWF0IjoxNzQ2NjY4MzE0LCJpZCI6MTQyOTc3MjksImtpZCI6IkNBU0VSLUVLR1RRSDVIT1dMQy1YUzkxNDQiLCJyayI6IlRDN2l1In0.fD1_fPJcwwBZZGJ9z5V5jRmJpKSJiRqnGyW8BXEBTGs'
    };

    try {
        const apiRes = await fetch(apiUrl, { method: 'get', headers });
        const data = await apiRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
