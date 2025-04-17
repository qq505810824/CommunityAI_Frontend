'use client';

import { useAccountData, useAccountOperations } from '@/hooks/useAccountData';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { AccountModel } from '@/models/Account';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AccountView from './AccountView';
function AccountContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [accounts, setAccounts] = useState<any[]>([]);
    const { searchAccount, deleteAccount } = useAccountOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading: loading, isError, mutate } = useAccountData();

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setAccounts(newData);
        }
        return () => {};
    }, [router, data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchAccount(value);
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: AccountModel) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setAccounts(newData);
        }
    };
    const handleDelete = async (id: string) => {
        // const res: any = await deletePrompt(id);
        // console.log('res', res);
        // if (res.success) {
        //     mutate();
        //     setAlert({
        //         title: '删除成功',
        //         type: 'success'
        //     });
        // }
    };

    return (
        <AccountView
            {...{
                data,
                isLoading: loading,
                accounts,
                onClose: mutate,
                handleSearch,
                searching,
                onDelete: handleDelete
            }}
        />
    );
}

export default AccountContainer;
