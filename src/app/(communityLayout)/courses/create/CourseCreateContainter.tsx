'use client';
import { UploadFilesToAzure } from '@/app/components/common/Widget/run-batch';
import { useAppContext } from '@/context/app-context';
import useAlert from '@/hooks/useAlert';
import { useCourseOperations } from '@/hooks/useCourseData';
import { CourseModel } from '@/models/Course';
import _ from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CourseCreateView from './CourseCreateView';

export default function CourseCreateContainter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addCourse } = useCourseOperations();
    const [product, setProduct] = useState<CourseModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { user_id } = useAppContext();
    const { setAlert } = useAlert();

    const handleSubmit = async (formData: CourseModel) => {
        setSubmitting(true);
        const communityId = searchParams.get('community_id');
        let upload_file_urls = '';
        if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
            upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        }
        const newFormData = {
            ...formData,
            files_url: upload_file_urls,
            owner: user_id,
            community: communityId ? (communityId as any) : undefined
        };

        try {
            const { data, error } = await addCourse(_.omit(newFormData, 'uploadFiles'));
            if (error) {
                console.error('發佈錯誤:', error);
                setAlert({
                    title: 'Error',
                    type: 'error'
                });
            } else {
                router.push(`/communitys/${communityId}?activeTab=courses`);
                setAlert({
                    title: 'Successful',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: 'Error',
                type: 'error'
            });
            console.error('發佈錯誤！:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <CourseCreateView
                {...{
                    product,
                    submitting,
                    setSubmitting,
                    handleSubmit
                }}
            />
        </>
    );
}
