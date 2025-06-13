'use client';

import useAlert from '@/hooks/useAlert';
import { AccountModel } from '@/models/Account';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import AccountCreateEditView from './AccountCreateEditView';

const AccountCreateContainer = () => {
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [account, setAccount] = useState<AccountModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    // const { addAccount } = useAccountOperations();
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSubmit = async (formData: AccountModel) => {
        // 处理表单提交
        console.log(formData);
        const newFormData = {
            ...formData,
            password: formData.password || '123456'
        };
        try {
            // 1. 进行认证注册
            const {
                data: { user },
                error: signUpError
            } = await supabase.auth.signUp({
                email: newFormData.email || '',
                password: newFormData.password,
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
                const { error: profileError } = await supabase
                    .from('account')
                    .insert([
                        {
                            id: user.id,
                            email: newFormData.email,
                            name: newFormData.name,
                            nickname: newFormData.nickname,
                            avatar: newFormData.avatar
                        }
                    ])
                    .select()
                    .single();

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    await supabase.auth.signOut();
                    throw new Error('创建用户档案失败，请重试');
                }

                router.push('/admin/accounts');
            }
        } catch (error: any) {
            setAlert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AccountCreateEditView
            {...{
                account,
                handleSubmit
            }}
        />
    );
};

export default AccountCreateContainer;
