'use client';

import useAlert from '@/hooks/useAlert';
import { showBookValues, useBookData, useBookOperations } from '@/hooks/useBookData';
import useLoad from '@/hooks/useLoad';
import { BookModel } from '@/models/Book';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookView from './BooksView';

function BooksContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<any[]>([]);
    const { searchBook } = useBookOperations();
    const [searching, setSearching] = useState(false);
    const [filters, setFilters] = useState<any>({
        keyword: '',
        category: '',
        order: 'created_at',
        direction: 'desc',
        status: 'success'
    });

    const { data, isLoading, isError, mutate } = useBookData({ ...filters });

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return showBookValues(item);
            });
            setProducts(newData);
        }
        return () => {};
    }, [router, data]);

    const handleSearch = async (value: string) => {
        // console.log('search value', value);
        setFilters({
            ...filters,
            keyword: value
        });

        // setSearching(true);
        // const res: any = await searchBook({
        //     ...filters,
        //     keyword: value
        // });
        // setSearching(false);

        // if (res.data) {
        //     const newData = res.data?.map((item: BookModel) => {
        //         return showBookValues(item);
        //     });
        //     setProducts(newData);
        // }
    };

    const handleSwitchCategory = async (category: string) => {
        setSearching(true);
        const res: any = await searchBook({
            ...filters,
            category: category
        });
        setSearching(false);
        // console.log('res3', res);

        if (res.data) {
            const newData = res.data?.map((item: BookModel) => {
                return showBookValues(item);
            });
            setProducts(newData);
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
                onSwitchCategory: handleSwitchCategory,
                searching,
                filters,
                setFilters
            }}
        />
    );
}

export default BooksContainer;
