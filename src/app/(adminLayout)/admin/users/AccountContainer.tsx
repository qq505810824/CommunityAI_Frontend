'use client';

import { useAccountOperations } from '@/hooks/useAccountData';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { AccountModel } from '@/models/Account';
import { get_users, UsersResponse } from '@/service/users_server';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import AccountView from './AccountView';

const getKey = (pageIndex: number, previousPageData: UsersResponse) => {
    if (!pageIndex || previousPageData.meta.next_page) {
        const params: any = {
            url: '/api/admin/users',
            params: { page: pageIndex + 1 }
        };
        return params;
    }
    return null;
};

function AccountContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [accounts, setAccounts] = useState<any[]>([]);
    const { searchAccount, deleteAccount } = useAccountOperations();
    const [searching, setSearching] = useState(false);

    // const { data, isLoading: loading, isError, mutate } = useAccountData();
    const {
        data,
        isLoading,
        setSize,
        mutate
    } = useSWRInfinite(
        (pageIndex: number, previousPageData: UsersResponse) =>
            getKey(pageIndex, previousPageData),
        get_users
    );

    const hasMore = data?.at(-1)?.meta?.next_page !== undefined;

    useEffect(() => {
        if (data) {
            console.log('data', data);

            // const newData = data?.map((item) => {
            //     return {
            //         ...item,
            //         created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
            //         updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
            //     };
            // });

            // data?.map(({ users }: any) =>
            //     users?.map((user: UserModel, index: number) => (
            //      )
            //     )


            // setAccounts(newData);
        }
        return () => { };
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
                isLoading,
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
