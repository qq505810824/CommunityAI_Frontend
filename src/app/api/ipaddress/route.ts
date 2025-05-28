import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    // console.log('Request URL:', req.url);
    try {
        let region = 'hk';
        fetch(
            `https://ipinfo.io/json?token=8892f2064cffd7`
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log('Address data:', data?.country);
                const country = data?.country?.toLowerCase();
                if (country) {
                    region = country.includes('mo') ? 'mo' : 'hk';
                }
            })
            .catch(() => console.log('无法获取具体地区信息'));
        return NextResponse.json({ success: true, region: region });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
