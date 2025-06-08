import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || '';
    const start = searchParams.get('start') || '';
    const end = searchParams.get('end') || '';
    const description = searchParams.get('description') || '';
    const location = searchParams.get('location') || '';

    // 生成唯一 UID 和 DTSTAMP
    const now = new Date();
    const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const uid = `${start}-${Math.random().toString(36).substring(2, 10)}@docai.com`;

    // 注意每行以 \r\n 结尾
    const calendar = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    try {
        return new NextResponse(calendar, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename=event.ics'
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}