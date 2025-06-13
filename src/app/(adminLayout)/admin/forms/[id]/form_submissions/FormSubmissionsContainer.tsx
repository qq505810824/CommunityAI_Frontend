'use client';

import axios from 'axios';
import moment from 'moment';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormSubmissionsView from './FormSubmissionsView';

export interface Submission {
    id: string;
    form_id: string;
    qrcode_id: string;
    submission_data: {
        [key: string]: string | string[]; // 修改這裡以支持動態鍵值
    };
    checked_in: boolean;
    created_at: string;
    check_in_at: string;
}

export interface EventForm {
    id: string;
    name: string;
    description: string;
    json_schema: {
        type: string;
        title: string;
        properties: any;
        dependencies: any;
    };
    meta: {
        display?: {
            title?: string;
            description?: string;
        };
    };
    is_active: boolean;
}

function FormSubmissionsContainer() {
    const router = useRouter();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({
        current_page: 1,
        next_page: null,
        prev_page: null,
        total_pages: 1,
        total_count: 0
    });
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [formSchema, setFormSchema] = useState<any>(null);
    const [displayOrder, setDisplayOrder] = useState<string[]>([]);
    const [formDetails, setFormDetails] = useState<any>(null);
    const [showFormDetails, setShowFormDetails] = useState(false);

    const fetchSubmissions = async (resetPage = false) => {
        try {
            setLoading(true);
            const formId = params['id'] || process.env.NEXT_PUBLIC_FORM_ID;
            const pageToFetch = resetPage ? 1 : page;
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/form_submissions/form/${formId}/search?page=${pageToFetch}`
            );

            console.log('API Response:', response.data);
            console.log('Form Schema:', response.data.form?.json_schema);

            if (response.data.success) {
                if (resetPage || pageToFetch == 1) {
                    setSubmissions(response.data.form_submissions);
                    setPage(1);
                } else {
                    setSubmissions(submissions.concat(response.data.form_submissions));
                }
                setMeta(response.data.meta);
                setFormSchema(response.data.form?.json_schema);
                setDisplayOrder(response.data.form?.display_order || []);
            }
            setLoading(false);
        } catch (err: any) {
            setError('無法獲取報名者信息。');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [params, page]);

    useEffect(() => {
        let isLoadingMore = false; // 新增标志位

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                // console.log('meta', meta);
                if (meta.next_page && !loading && !isLoadingMore) {
                    // 檢查是否有下一頁
                    isLoadingMore = true; // 设置标志位为 true
                    setPage((prevPage) => prevPage + 1); // 增加頁碼以加載更多數據
                }
            }
        };

        // window.addEventListener('scroll', handleScroll);
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
        const isMobile = /Mobi|Android/i.test(navigator.userAgent); // 检测是否为移动设备
        // console.log('isMobile', isMobile);

        if (isMobile) {
            window.addEventListener('touchmove', handleScroll); // 仅在移动设备上使用 touchmove
        } else {
            window.addEventListener('scroll', handleScroll); // 仅在电脑端使用 scroll
        }
        return () => {
            if (isMobile) {
                window.removeEventListener('touchmove', handleScroll);
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [meta, loading]);

    useEffect(() => {
        if (searchParams && searchParams.get('page')) {
            setPage(Number(searchParams.get('page')));
        }
    }, [searchParams]);

    const handleCheckin = async (qrcode_id: string) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/form_submissions/${qrcode_id}/check_in`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
                    }
                }
            );
            // console.log('response', response);
            if (response.data.success) {
                alert(response.data.message);
                //成功簽到，更改狀態checked_in=true
                setSubmissions((prevSubmissions) =>
                    prevSubmissions.map((submission) =>
                        submission.qrcode_id === qrcode_id
                            ? { ...submission, checked_in: true, check_in_at: moment().toString() }
                            : submission
                    )
                );
            } else {
                alert('無法手動簽到');
            }
        } catch (err: any) {}
    };

    const handleCheckout = async (qrcode_id: string) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/form_submissions/${qrcode_id}/cancel_check_in`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
                    }
                }
            );
            // console.log('response', response);
            if (response.data.success) {
                alert(response.data.message);
                //取消簽到，更改狀態checked_in=false
                setSubmissions((prevSubmissions) =>
                    prevSubmissions.map((submission) =>
                        submission.qrcode_id === qrcode_id
                            ? { ...submission, checked_in: false }
                            : submission
                    )
                );
            } else {
                alert('取消簽到失敗');
            }
        } catch (err: any) {
            alert(err?.response?.data?.error || '取消簽到失敗');
        }
    };

    const handleDeleteFormSubmission = async (form_submission_id: string) => {
        try {
            const response = await axios.delete(`/api/form_submissions/${form_submission_id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
                }
            });
            // console.log('response', response);
            if (response.data.success) {
                alert(response.data.message);
                setSubmissions((prevSubmissions) =>
                    prevSubmissions.filter((submission) => submission.id !== form_submission_id)
                );
            } else {
                alert('無法刪除');
            }
        } catch (err: any) {}
    };

    const handleResendEmail = async (form_submission_id: string) => {
        try {
            const response = await axios.post(
                `/api/form_submissions/${form_submission_id}/resend_confirmation_email`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
                    }
                }
            );
            // console.log('response', response);
            if (response.data.success) {
                alert(response.data.message);
            } else {
                alert(response.data.message || '重發失敗');
            }
        } catch (err: any) {}
    };

    const handleSearch = async (query: string) => {
        try {
            setIsSearching(true);
            const formId = params['id'] || process.env.NEXT_PUBLIC_FORM_ID;
            const response = await axios.get(
                `/api/form_submissions/form/${formId}/search?query=${query}`
            );
            if (response.data.success) {
                setSubmissions(response.data.form_submissions);
                setMeta(response.data.meta);
                setPage(1); // 重置頁碼
            }
        } catch (err) {
            console.error('搜尋錯誤:', err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleReset = () => {
        setSearchQuery('');
        setIsSearching(false);
        fetchSubmissions(true); // 重置並重新獲取數據
    };

    useEffect(() => {
        fetchFormDetails();
    }, [params]);

    const fetchFormDetails = async () => {
        try {
            const formId = params['id'] || process.env.NEXT_PUBLIC_FORM_ID;
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/forms/${formId}`
            );
            if (response.data.success) {
                console.log('Form Details:', response.data.form);
                setFormDetails(response.data.form);
            }
        } catch (err) {
            console.error('獲取表單詳情失敗:', err);
        }
    };

    return (
        <FormSubmissionsView
            {...{
                submissions,
                formDetails,
                meta,
                handleCheckin,
                handleCheckout,
                handleResendEmail
            }}
        />
    );
}

export default FormSubmissionsContainer;
