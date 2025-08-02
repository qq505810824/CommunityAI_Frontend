'use client';
import Button from '@/app/components/base/button';
import I18n from '@/context/i18n';
import { login } from '@/service/common';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'use-context-selector';
import Toast from '../components/base/toast';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


const validEmailReg = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/;

type IState = {
    formValid: boolean;
    github: boolean;
    google: boolean;
};

type IAction = {
    type:
    | 'login'
    | 'login_failed'
    | 'github_login'
    | 'github_login_failed'
    | 'google_login'
    | 'google_login_failed';
};

function reducer(state: IState, action: IAction) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                formValid: true
            };
        case 'login_failed':
            return {
                ...state,
                formValid: true
            };
        case 'github_login':
            return {
                ...state,
                github: true
            };
        case 'github_login_failed':
            return {
                ...state,
                github: false
            };
        case 'google_login':
            return {
                ...state,
                google: true
            };
        case 'google_login_failed':
            return {
                ...state,
                google: false
            };
        default:
            throw new Error('Unknown action.');
    }
}

const NormalForm = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { locale } = useContext(I18n);

    const [state, dispatch] = useReducer(reducer, {
        formValid: false,
        github: false,
        google: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const handleEmailPasswordLogin = async () => {
        if (!validEmailReg.test(email)) {
            Toast.notify({
                type: 'error',
                message: t('login.error.emailInValid')
            });
            return;
        }
        try {
            setIsLoading(true);

            const res = await login({
                url: '/general_users/sign_in.json',
                body: {
                    general_user: {
                        email,
                        password
                    }
                }
            });
            const data = await res.json();
            if (data.success) {

                const token = res.headers.get('authorization');
                localStorage.setItem('authorization', token);
                localStorage?.setItem('email', email || '');

                const { data: exist } = await supabase
                    .from('account')
                    .select('*')
                    .eq('email', email)
                    .maybeSingle();

                if (exist) {
                    localStorage.setItem('account', JSON.stringify(exist));
                    localStorage?.setItem('user_id', exist.id);
                    return router.replace('/');
                }

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
                            email_confirmed: false
                        }
                    }
                });

                if (signUpError) {
                    throw signUpError;
                }

                if (user) {
                    // 2. 使用 supabase client 创建 profile
                    const { data, error: profileError } = await supabase
                        .from('account')
                        .insert([
                            {
                                id: user.id,
                                email: email,
                                name: email,
                                token: token,
                                nickname: email,
                                user_metadata: { form: 'aienglish' }
                            }
                        ])
                        .select()
                        .single();

                    if (profileError) {
                        console.error('Profile creation error:', profileError);
                        await supabase.auth.signOut();
                        throw new Error('创建用户档案失败，请重试');
                    }
                    localStorage?.setItem('user_id', data.id);
                    // console.log('data', data);

                }
                router.replace('/');
                // const token = res.headers.get('authorization');
                // localStorage.setItem('authorization', token);
                // localStorage?.setItem('email', email || '');
                // localStorage?.setItem('user_id', '');
                // router.replace('/');
            } else {
                Toast.notify({
                    type: 'error',
                    message: data.message
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="w-full mx-auto">
                <h2 className="text-[32px] font-bold text-gray-900">{t('login.pageTitle')}</h2>
                <p className="mt-1 text-sm text-gray-600">{t('login.welcome')}</p>
            </div>

            <div className="w-full mx-auto mt-8">
                <div className="bg-white ">
                    <form onSubmit={() => { }}>
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
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleEmailPasswordLogin();
                                    }}
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

                        <div className="mb-2">
                            <Button
                                tabIndex={0}
                                type="primary"
                                onClick={handleEmailPasswordLogin}
                                disabled={isLoading}
                                className="w-full !fone-medium !text-sm"
                            >
                                {t('login.signBtn')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NormalForm;
