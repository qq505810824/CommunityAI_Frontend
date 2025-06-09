import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');
    if (!url) return NextResponse.json({ error: 'No url' }, { status: 400 });

    const pdfRes = await fetch(url);
    if (!pdfRes.ok) return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });

    const pdfBuffer = await pdfRes.arrayBuffer();
    return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/pdf',
            'Access-Control-Allow-Origin': '*'
        }
    });
}