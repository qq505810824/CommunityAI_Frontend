'use client';

import { useCourseDetailData } from '@/hooks/useCourseData';
import { ChannelModel } from '@/models/Channel';
import { useEffect, useState } from 'react';
import CourseDetailView from './CourseDetailView';
interface ViewProps {
    meta?: any;
}
export default function CourseDetailContainter({ meta }: ViewProps) {
    const [channel, setChannel] = useState<ChannelModel>();

    const [course_id, setCourseId] = useState(0);
    const { data, isLoading, isError, mutate } = useCourseDetailData(course_id);

    useEffect(() => {
        if (meta) {
            console.log('meta', meta);
            setCourseId(meta?.course.id);
            setChannel(meta?.course);
        }
    }, [meta]);

    useEffect(() => {
        if (course_id) {
            mutate();
        }
    }, [course_id]);
    return (
        <>
            <CourseDetailView
                {...{
                    course: data
                }}
            />
        </>
    );
}
