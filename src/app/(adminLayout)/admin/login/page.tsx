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
            setRedirect(searchParams.get('redirect') || '');
        }
    }, [router, searchParams]);

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!email || !password) {
                setError('請輸入郵箱和密碼');
                setLoading(false);
                return;
            }
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            // 2. 获取当前登录用户的ID
            const userId = data.user?.id;
            if (!userId) {
                setLoading(false);
                console.error('无法获取用户ID');
                setError('郵箱或密碼錯誤!');
                return;
            }

            // 3. 查询用户的管理员状态
            const { data: userData, error: queryError } = await supabase
                .from('account')
                .select('role')
                .eq('id', userId)
                .single(); // 确保只获取单条记录

            if (queryError || !userData) {
                setLoading(false);
                await supabase.auth.signOut();
                console.error('查询用户信息失败:', queryError?.message);
                setError('無法驗證權限，請聯繫管理員');
                return;
            }

            // 4. 检查管理员标志
            if (userData.role !== 'admin') {
                console.warn(`非管理员尝试访问: ${email}`);
                setLoading(false);
                // 可选：强制登出非管理员用户
                await supabase.auth.signOut();
                setError('無法驗證權限，請聯繫管理員');
                return;
            }

            // console.log('user data', data);
            if (data && data.user && data.user.id) {
                localStorage?.setItem('admin_id', data.user.id);
                localStorage?.setItem('admin_authorization', data.session?.access_token || '');
            }
            if (error) {
                setError(error.message);
            } else {
                router.push('/admin'); // 登录成功后跳转到仪表板页面
                router.refresh();
            }
            setLoading(false);
        } catch (error) {
            setError('登录过程中发生错误');
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="w-full max-w-md space-y-8 rounded-lg p-8 shadow-md">
                {/* <p
                    className="text-blue-500 text-md hover:underline cursor-pointer"
                    onClick={() => {
                        router.push('/admin');
                    }}
                >
                    {'< 返回'}
                </p> */}
                <h2 className="text-center text-3xl font-bold">管理後台登入</h2>
                {error && <div className="rounded-md bg-red-50 p-4 text-red-500">{error}</div>}
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            郵箱
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
                            密碼
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
                        {loading ? '登入中...' : '登入'}
                    </button>
                </form>
            </div>
        </div>
    );
}
