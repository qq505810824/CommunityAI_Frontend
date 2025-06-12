'use client';

import useAlert from '@/hooks/useAlert';
import { useBookData, useBookOperations } from '@/hooks/useBookData';
import useLoad from '@/hooks/useLoad';
import { BookModel } from '@/models/Book';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookView from './BookView';

function BookContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<BookModel[]>([]);
    const { searchBook, deleteBook, updateBook } = useBookOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useBookData();

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
        return () => { };
    }, [data]);

    const handleSearch = async (value: string) => {
        // console.log('search value', value);
        setSearching(true);
        const res: any = await searchBook({ keyword: value });
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: BookModel) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
    };
    const handleDelete = async (id: number) => {
        const res: any = await deleteBook(id);
        // console.log('res', res);
        if (res.success) {
            mutate();
            setAlert({
                title: '删除成功',
                type: 'success'
            });
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        // console.log('id,status', id, status);
        const res: any = await updateBook(id, { status });
        // console.log('res', res);
        if (!res.error) {
            mutate();
            setAlert({
                title: '操作成功',
                type: 'success'
            });
        }
    };

    return (
        <BookView
            {...{
                data,
                isLoading,
                products,
                onClose: mutate,
                handleSearch,
                searching,
                onDelete: handleDelete,
                onUpdataStatus: handleUpdateStatus
            }}
        />
    );
}

export default BookContainer;
