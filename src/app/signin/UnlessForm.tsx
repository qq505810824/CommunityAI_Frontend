'use client';
import Button from '@/app/components/base/button';
import { useUsersOperations } from '@/hooks/useUserData';
import { Divider, Tooltip } from '@mui/joy';
import { createClient } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from '../components/base/toast';
const validEmailReg = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/;

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UnlessForm = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { detailById } = useUsersOperations();
    const searchParams = useSearchParams();
    const [redirect, setRedirect] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [session, setSession] = useState<any>('');
    useEffect(() => {
        if (searchParams) {
            setRedirect(searchParams.get('redirect') || '');
        }
    }, [router, searchParams]);
    useEffect(() => {
        if (session && session.accessToken) {
            console.log('session.accessToken', session.accessToken);
            // getFiles()
            // axios('/api/drive?token=' + session.accessToken).then((res) => {
            //     console.log('res', res.data);
            // })
        }
    }, [session]);
    const handleEmailPasswordLoginWithKonnecAI = async () => {
        if (!validEmailReg.test(email)) {
            Toast.notify({
                type: 'error',
                message: t('login.error.emailInValid')
            });
            return;
        }
        try {
            setIsLoading(true);

            const res = await fetch('/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        email: email.trim(),
                        password: password.trim()
                    }
                })
            });

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
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailPasswordLoginWithSupabse = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            setIsLoading(false);
            // console.log('user data', data);
            if (data && data.user && data.user.id) {
                localStorage?.setItem('email', data.user.email || '');
                localStorage?.setItem('user_id', data.user.id || '');
                localStorage.setItem('account', JSON.stringify(data.user));
            }
            if (error) {
                Toast.notify({
                    type: 'error',
                    message: 'Invalid login credentials'
                });
                setError(error.message);
            } else {
                const { data: accountData, error } = await supabase
                    .from('account')
                    .select('*')
                    .eq('id', data.user.id)
                    .single();

                if (error) {
                    console.error('Error fetching account data:', error);
                } else if (accountData) {
                    console.log('accountData', accountData);
                    localStorage.setItem('account', JSON.stringify(accountData));
                }

                router.push(redirect || '/'); // 登录成功后跳转到仪表板页面
                router.refresh();
            }
        } catch (err) {
            console.log('err', err);
        }
    };
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        // console.log('data', data);

        if (error) {
            alert('Google 登錄失敗: ' + error.message);
        }
        // 登录后会自动跳转到 redirectTo
    };

    return (
        <>
            <div className="w-full mx-auto">
                <h2 className="text-[32px] font-bold text-gray-900">{t('login.pageTitle')}</h2>
                <p className="mt-1 text-sm text-gray-600">{t('login.welcome')}</p>
            </div>

            <div className="w-full mx-auto mt-8">
                <div className="bg-white ">
                    <form
                        onSubmit={handleEmailPasswordLoginWithSupabse}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEmailPasswordLoginWithSupabse();
                        }}
                    >
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="my-2 block text-sm font-medium text-gray-900"
                            >
                                {t('login.email')}
                            </label>
                            <div className="mt-1">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder={t('login.emailPlaceholder') || ''}
                                    className={
                                        'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm'
                                    }
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="my-2 flex items-center justify-between text-sm font-medium text-gray-900"
                            >
                                <span>{t('login.password')}</span>
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder={t('login.passwordPlaceholder') || ''}
                                    className={
                                        'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm pr-10'
                                    }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                    >
                                        {showPassword ? '👀' : '😝'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mb-5 justify-between">
                            <div className="text-sm">
                                <a
                                    href="/signup"
                                    className="font-medium text-blue-600 hover:text-blue-500 underline"
                                >
                                    免費註冊
                                </a>
                            </div>
                        </div>

                        <div className="mb-2">
                            <Button
                                tabIndex={0}
                                type="primary"
                                onClick={handleEmailPasswordLoginWithSupabse}
                                disabled={isLoading}
                                className="w-full !fone-medium !text-sm"
                            >
                                {t('login.signBtn')}
                            </Button>
                        </div>
                        <Divider>使用其他登錄</Divider>
                        <div className="mb-2 flex justify-center my-2">
                            <Tooltip title="Google">
                                <button type="button" onClick={handleGoogleLogin}>
                                    <img src="./google.svg" alt="" className="w-8" />
                                </button>
                            </Tooltip>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UnlessForm;
