'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. 进行认证注册
            const {
                data: { user },
                error: signUpError
            } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: undefined,
                    data: {
                        email_confirmed: true
                    }
                }
            });

            if (signUpError) {
                throw signUpError;
            }

            if (user) {
                // 2. 使用 supabase client 创建 profile
                const { error: profileError } = await supabase
                    .from('account')
                    .insert([
                        {
                            id: user.id,
                            email: email
                        }
                    ])
                    .select()
                    .single();

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    await supabase.auth.signOut();
                    throw new Error('创建用户档案失败，请重试');
                }

                router.push('/login');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">注册账号</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            邮箱
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            密码
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                        {loading ? '注册中...' : '注册'}
                    </button>
                </form>
            </div>
        </div>
    );
}
