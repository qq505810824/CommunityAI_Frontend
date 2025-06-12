'use client';

import useAlert from '@/hooks/useAlert';
import { useBookOperations } from '@/hooks/useBookData';
import { BookModel } from '@/models/Book';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import BooksCreateView from './BooksCreateView';

const BooksCreateContainer = () => {
    const params = useParams();
    const token = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');
    const user_id = localStorage.getItem('user_id');
    const [product, setProduct] = useState<BookModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { addBook } = useBookOperations();
    const router = useRouter();

    const handleSubmit = async (formData: BookModel) => {
        // 处理表单提交
        console.log('formData', formData);
        setSubmitting(true);
        // let upload_file_urls = '';
        // if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
        //     upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        // }
        // // console.log('upload_file_urls', upload_file_urls);
        const newFormData = {
            ...formData,
            owner: {
                token: token || '',
                email: email || '',
                id: user_id || ''
            }
            // user: localStorage?.getItem('user_id') || null
        };
        // // console.log(_.omit(newFormData, 'uploadFiles'));

        try {
            const { data, error } = await addBook(newFormData);
            if (error) {
                console.error('發佈錯誤:', error);
                setAlert({
                    title: '發佈錯誤！',
                    type: 'error'
                });
            } else {
                router.push(`/`);
                setAlert({
                    title: '發佈成功，請等待審核通過',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '發佈錯誤！',
                type: 'error'
            });
            console.error('發佈錯誤！:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <BooksCreateView
            {...{
                product,
                submitting,
                setSubmitting,
                handleSubmit
            }}
        />
    );
};

export default BooksCreateContainer;
