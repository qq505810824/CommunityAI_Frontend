'use client';
import { useAppContext } from '@/context/app-context';
import { useCourseOperations } from '@/hooks/useCourseData';
import { CourseModel } from '@/models/Course';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CourseCreateView from './CourseCreateView';

export default function CourseCreateContainter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addCourse } = useCourseOperations();
    const [submitting, setSubmitting] = useState(false);
    const { user_id } = useAppContext();

    const handleSubmit = async (data: CourseModel) => {
        setSubmitting(true);
        const communityId = searchParams.get('community_id');
        const res = await addCourse({
            ...data,
            owner: user_id,
            community: communityId ? (communityId as any) : undefined // Replace 'as any' with the actual CommunityModel shape if available
        });
        // console.log('res', res);
        router.push(`/communitys/${communityId}?activeTab=courses`);
    };

    return (
        <>
            <CourseCreateView
                {...{
                    submitting,
                    handleSubmit
                }}
            />
        </>
    );
}
