'use client';

import Toast from '@/app/components/base/toast';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Profile() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profile, setProfile] = useState({
        name: '',
        nickname: '',
        age: '',
        description: '',
        avatar: '',
        sex: 'male' // 默认值
    });

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        try {
            setLoading(false);

            const supabase_user = localStorage.getItem('supabase_user');
            // console.log('supabase_user', supabase_user);

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
            // console.log('user', user);
            // console.log('data', data);

            if (data) {
                setProfile({
                    name: data.name || '',
                    nickname: data.nickname || data.name || '',
                    age: data.age || '',
                    description: data.description || '',
                    sex: data.sex || 'male',
                    avatar: data.avatar || ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile() {
        try {
            if (password && password !== confirmPassword) {
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
            const ageValue = profile.age === '' ? null : Number(profile.age);

            // 2. 如果填写了新密码且两次一致，则修改密码
            if (password && password === confirmPassword) {
                const { error } = await supabase.auth.updateUser({
                    password
                });
                if (error) {
                    Toast.notify({
                        type: 'error',
                        message: error.message || ''
                    });
                    return;
                }
            }

            const { error } = await supabase.from('account').upsert({
                id: user.id,
                ...profile,
                age: ageValue,
                updated_at: new Date().toISOString()
            });

            if (error) throw error;
            Toast.notify({
                type: 'success',
                message: '更新成功!'
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
    }

    async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setLoading(true);
            const file = event.target.files?.[0];
            if (!file) return;

            const {
                data: { user }
            } = await supabase.auth.getUser();
            if (!user) throw new Error('未找到用户');

            // 生成唯一的文件名
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            // 先删除旧的头像文件（如果存在）
            if (profile.avatar) {
                const oldPath = profile.avatar.split('/').pop();
                if (oldPath) {
                    await supabase.storage.from('avatars').remove([`${user.id}/${oldPath}`]);
                }
            }

            // 上传新文件
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            // 获取完整的公共 URL
            const avatarUrl = getImageUrl(filePath);

            // 更新个人资料中的头像路径（存储绝对路径）
            const { error: updateError } = await supabase
                .from('account')
                .update({ avatar: avatarUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            // 使用 getImageUrl 获取完整的公共 URL
            setProfile({ ...profile, avatar: filePath });
            alert('头像上传成功！');
        } catch (error) {
            console.error('Error:', error);
            alert('头像上传失败！');
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

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">个人资料</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updateProfile();
                }}
                className="space-y-4"
            >
                <div className="mb-6">
                    <label className="block mb-2">头像</label>
                    <div className="flex items-center space-x-4">
                        <div className="w-24 h-24">
                            <img
                                src={profile.avatar || '/avatar.webp'}
                                alt="头像"
                                className=" object-contain "
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadAvatar}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-2">姓名</label>
                    <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">昵称</label>
                    <input
                        type="text"
                        value={profile.nickname}
                        onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">年龄</label>
                    <input
                        type="number"
                        value={profile.age}
                        onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">性别</label>
                    <select
                        value={profile.sex}
                        onChange={(e) => setProfile({ ...profile, sex: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="male">男</option>
                        <option value="female">女</option>
                        <option value="other">其他</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        密码
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        確認密碼
                    </label>
                    <input
                        id="re_password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border p-2"
                    />
                </div>

                <div className="hidden">
                    <label className="block mb-2">个人简介</label>
                    <textarea
                        value={profile.description}
                        onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                        className="w-full p-2 border rounded"
                        rows={4}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? '保存中...' : '保存修改'}
                </button>
            </form>
        </div>
    );
}
