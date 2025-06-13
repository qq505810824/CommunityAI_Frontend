import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
    try {
        const { data, error } = await supabase
            .from('forms')
            .select('*')
            .order('created_at', { ascending: false });
        // console.log('Fetched forms:', data);

        if (error) {
            throw error;
        }
        return NextResponse.json({ success: true, forms: data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
