'use client';

import Loading from '@/app/components/base/loading';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { BookModel } from '@/models/Book';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookDetailView from './BookDetailView';
import { useAppDetailContext } from './detail-context';

function BookDetailContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();
    const params = useParams();
    const [product, setProduct] = useState<BookModel>();

    const { appData } = useAppDetailContext();

    useEffect(() => {
        if (appData) {
            setProduct(appData);
        }
        return () => {};
    }, [appData]);

    if (!product) return <Loading type="app" />;

    return (
        <BookDetailView
            {...{
                product
            }}
        />
    );
}

export default BookDetailContainer;
