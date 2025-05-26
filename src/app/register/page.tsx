'use client';

import { useUsersOperations } from '@/hooks/useUserData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState('');

    const { addUser } = useUsersOperations();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (password !== confirmPassword) {
                setError('两次输入的密码不一致');
                setLoading(false);
                return;
            }

            const { data, error } = await addUser({
                name,
                email,
                password
            });

            if (error) {
                setLoading(false);
                return;
            }

            if (data) {
                // 注册成功后，重定向到登录页面或其他页面
                const redirectUrl = searchParams.get('redirect') || '/login';
                router.push(redirectUrl);
            }
        } catch (error) {
            setError('登录过程中发生错误');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-8 rounded-lg p-8 shadow-md">
                <h2 className="text-center text-3xl font-bold">注册</h2>
                {error && <div className="rounded-md bg-red-50 p-4 text-red-500">{error}</div>}
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">
                            昵称
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2"
                        />
                    </div>
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
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            確認密碼
                        </label>
                        <input
                            id="re_password"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border p-2"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a
                                href="/login"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                登入
                            </a>
                        </div>

                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
                    >
                        {loading ? '註冊中...' : '註冊'}
                    </button>
                </form>
            </div>
        </div>
    );
}
