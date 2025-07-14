'use client';

import Toast from '@/app/components/base/toast';
import { AccountModel } from '@/models/Account';
import { createClient } from '@supabase/supabase-js';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Profile() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<AccountModel | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        try {
            setLoading(false);
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) throw new Error('未找到用户');

            const { data, error } = await supabase
                .from('account')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;
            if (data) {
                setProduct({
                    name: data.name || '',
                    nickname: data.nickname || data.name || '',
                    age: data.age || '',
                    sex: data.sex || 'male',
                    avatar: data.avatar || '',
                    email: data.email
                });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    // 添加一个函数来获取图片 URL
    const getImageUrl = (path: string | null) => {
        if (!path) return '/default-avatar.png';
        if (path.startsWith('http')) return path;

        const {
            data: { publicUrl }
        } = supabase.storage.from('avatars').getPublicUrl(path);

        return publicUrl;
    };

    const handleSubmit = async (formData: AccountModel) => {
        try {
            if (formData.password && formData.password !== formData.confirmPassword) {
                Toast.notify({
                    type: 'error',
                    message: '两次輸入密碼不一致'
                });
                setLoading(false);
                return;
            }

            setLoading(true);
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) throw new Error('未找到用户');

            // 2. 如果填写了新密码且两次一致，则修改密码
            if (formData.password && formData.password === formData.confirmPassword) {
                const { error } = await supabase.auth.updateUser({
                    password: formData.password
                });
                if (error) {
                    Toast.notify({
                        type: 'error',
                        message: error.message || ''
                    });
                    return;
                }
            }

            const newFormData = {
                ...formData
            };

            const { error } = await supabase.from('account').upsert({
                id: user.id,
                ..._.omit(newFormData, ['uploadFiles', 'password', 'confirmPassword']),
                updated_at: new Date().toISOString()
            });

            if (error) throw error;
            Toast.notify({
                type: 'success',
                message: 'success!'
            });
            router.push('/');
            // alert('个人资料已更新！');
        } catch (error) {
            console.error('Error:', error);
            Toast.notify({
                type: 'error',
                message: '更新失败！!'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen overflow-y-scroll">
            {/* <ProfileEditView
                {...{
                    product,
                    submitting,
                    setSubmitting,
                    submit: handleSubmit
                }}
            /> */}
        </div>
    );
}
