import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    try {
        // const body = await req.json();
        // console.log('Received body:', body);
        // const { data, error } = await supabase.from('forms').insert([body.form]).select();
        // console.log('Fetched forms:', data);

        // if (error) {
        //     throw error;
        // }
        // return NextResponse.json({ success: true, data });
        console.log('sending email...');

        // 发送邮件
        const { data, error: emailError } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: '505810824@qq.com',
            subject: 'hello',
            html: 'content'
        });
        console.log('Email sent:', data);
        console.log('Email error:', emailError);
        if (emailError) {
            throw emailError;
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
}
