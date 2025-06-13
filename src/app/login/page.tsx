'use client';

import { useUsersOperations } from '@/hooks/useUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Toast from '../components/base/toast';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState('');

    const { detailById } = useUsersOperations();

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

            const res = await fetch('/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: password
                    }
                })
            });
            setLoading(false);
            // console.log('response', res);
            const data = await res.json();
            if (data.message == 'Logged in successfully.') {
                // const token = res.headers.get('Authorization');
                // console.log(data);
                // console.log(token);
                const token = data.token;
                localStorage.setItem('authorization', token);
                localStorage.setItem('email', email.trim());
                Toast.notify({
                    type: 'success',
                    message: data.message
                });
                router.push(redirect || '/');
            } else {
                Toast.notify({
                    type: 'error',
                    message: data.message || data.error
                });
            }

            // 调用登录操作
            // const { data, error } = await detailById(email, password);

            // if (error) {
            //     console.log('登录错误', error);
            //     setError('登錄失敗');
            //     setLoading(false);
            //     return;
            // }
            // if (data) {
            //     // 登录成功后，保存用户ID到本地存储
            //     localStorage?.setItem('user_id', data.id);
            //     localStorage?.setItem('user_email', data.email);

            //     setLoading(false);
            //     router.push(redirect || '/'); // 登录成功后跳转到指定页面或默认的仪表板页面
            //     router.refresh(); // 刷新路由以更新状态
            //     return;
            //     // 跳转到指定页面或默认的仪表板页面
            // }

            // const { data, error } = await supabase.auth.signInWithPassword({
            //     email,
            //     password
            // });
            // console.log('user data', data);
            // if (data && data.user && data.user.id) {
            //     localStorage?.setItem('user_id', data.user.id);
            // }
            // if (error) {
            //     setError(error.message);
            // } else {
            //     router.push(redirect || '/'); // 登录成功后跳转到仪表板页面
            //     router.refresh();
            // }
        } catch (error) {
            setError('登录过程中发生错误');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg p-8 shadow-md">
                <p
                    className="text-blue-500 text-md hover:underline cursor-pointer"
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    {'< 返回'}
                </p>
                <h2 className="text-center text-3xl font-bold">登入</h2>
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
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a
                                href="/register"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                註冊
                            </a>
                        </div>
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
