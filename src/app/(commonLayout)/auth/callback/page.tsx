'use client'
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const syncUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // 检查/同步到自定义 user 表
                const { data: exist } = await supabase
                    .from('account')
                    .select('id')
                    .eq('email', user.email)
                    .single();

                console.log('exist', exist);
                console.log('user', user);


                if (!exist) {
                    // 新建用户
                    await supabase.from('account').insert({
                        id: user.id,
                        email: user.email,
                        name: user.user_metadata.full_name || user.email,
                        avatar: user.user_metadata.avatar_url,
                        user_metadata: user.user_metadata
                    });
                }
                // 本地存储
                localStorage.setItem('authorization', '');
                localStorage.setItem('email', user.email || '');

                localStorage.setItem('supabase_user', JSON.stringify(user));
                router.replace('/');
            }
        };
        syncUser();
    }, [router]);

    return <div className="text-center mt-10">正在登录...</div>;
}