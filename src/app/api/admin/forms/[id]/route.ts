import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request, { params }: { params: { id: string } }) {
    console.log('Received request for form with ID:', params.id);
    // console.log('Request URL:', req.url);
    try {
        // const res = await req.json();
        // console.log('Received request:', res);
        const { data, error } = await supabase
            .from('forms')
            .select('*')
            .eq('id', params.id).single()
        // console.log('Fetched forms:', data);

        if (error) {
            throw error;
        }
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
