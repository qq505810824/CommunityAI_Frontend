'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        if (searchParams) {
            setRedirect(searchParams.get('url') || '');
        }
    }, [router, searchParams]);

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            console.log('user data', data);
            if (data && data.user && data.user.id) {
                localStorage?.setItem('user_id', data.user.id);
            }
            if (error) {
                setError(error.message);
            } else {
                router.push(redirect || '/'); // 登录成功后跳转到仪表板页面
                router.refresh();
            }
        } catch (error) {
            setError('登录过程中发生错误');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg p-8 shadow-md">
                <h2 className="text-center text-3xl font-bold">登录</h2>
                {error && <div className="rounded-md bg-red-50 p-4 text-red-500">{error}</div>}
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            邮箱
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            密码
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                    >
                        {loading ? '登录中...' : '登录'}
                    </button>
                </form>
            </div>
        </div>
    );
}
