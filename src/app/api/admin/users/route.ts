import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    // console.log('query params:', Object.fromEntries(searchParams.entries()));
    // 获取单个参数
    const page = searchParams.get('page');
    // console.log('page:', page);

    const apiUrl = process.env.NEXT_PUBLIC_KONNECAI_URL + '/api/users?company_id=2&page=' + page;
    const headers = {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNzQ2NTE0ODE0LCJleHAiOjE3NDkxNDQ1NjAsImp0aSI6IjllNmVmNDgxLTI0YjYtNDlmMC1hMWU5LTEzNmI2NDIyMzE3MCJ9.VaxD6baB8wVk1-qXt6LYt3AucRkD4jcZjnhoELgBe4w'
    };

    try {
        const apiRes = await fetch(apiUrl, {
            method: 'get',
            headers
        });
        const data = await apiRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
