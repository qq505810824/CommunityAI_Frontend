'use client';

import useAlert from '@/hooks/useAlert';
import { useAllCourseData, useCourseOperations } from '@/hooks/useCourseData';
import useLoad from '@/hooks/useLoad';
import { CommunityModel } from '@/models/Community';
import { CourseModel } from '@/models/Course';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CourseView from './CourseView';

function CourseContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<CourseModel[]>([]);
    const { searchCourse, deleteCourse, updateCourse } = useCourseOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useAllCourseData();

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
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchCourse({ keyword: value });
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: CommunityModel) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
    };
    const handleDelete = async (id: number, community_id: number) => {
        const res: any = await deleteCourse(id, community_id);
        console.log('res', res);
        if (res.success) {
            mutate();
            setAlert({
                title: '删除成功',
                type: 'success'
            });
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        console.log('id,status', id, status);
    };

    return (
        <CourseView
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

export default CourseContainer;
