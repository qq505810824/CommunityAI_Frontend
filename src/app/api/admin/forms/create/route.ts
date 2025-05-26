import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // console.log('Received body:', body);
        const { data, error } = await supabase.from('forms').insert([body.form]).select();
        // console.log('Fetched forms:', data);

        if (error) {
            throw error;
        }
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
