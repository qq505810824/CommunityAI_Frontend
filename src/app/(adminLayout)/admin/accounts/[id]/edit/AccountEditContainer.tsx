'use client';

import { useAccountDetailData, useAccountOperations } from '@/hooks/useAccountData';
import useAlert from '@/hooks/useAlert';
import { AccountModel } from '@/models/Account';
import _ from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AccountEditView from './AccountEditView';

const AccountEditContainer = () => {
    const params = useParams();
    const user_id = localStorage.getItem('user_id');
    const [account, setAccount] = useState<AccountModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { updateAccount } = useAccountOperations();
    const router = useRouter();

    const {
        data,
        isLoading: loading,
        isError
    } = useAccountDetailData(params['id'] as string);

    useEffect(() => {
        if (data) {
            setAccount(data);
        }
    }, [data]);

    const handleSubmit = async (formData: AccountModel) => {
        // 处理表单提交
        console.log(formData);
        const newFormData = {
            ...formData
        };
        setSubmitting(true);
        try {
            const { data, error } = await updateAccount(
                params['id'] as string,
                _.omit(newFormData, ['password'])
            );
            if (error) {
                console.error('更新用户错误:', error);
                setAlert({
                    title: '更新用户失败！',
                    type: 'error'
                });
            } else {
                setAlert({
                    title: '用户更新成功！',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '用户更新失败！',
                type: 'error'
            });
            console.error('更新用户错误:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AccountEditView
            {...{
                account,
                handleSubmit
            }}
        />
    );
};

export default AccountEditContainer;
