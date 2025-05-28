import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const apiUrl = 'https://schemai-backend.m2mda.com/users/sign_in.json';
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const params = await req.json();
        const apiRes = await fetch(apiUrl, {
            method: 'post',
            headers,
            body: JSON.stringify(params)
        });
        const data = await apiRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
