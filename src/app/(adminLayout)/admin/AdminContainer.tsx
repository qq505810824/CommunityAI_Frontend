'use client';
import { usePromptStatisticsData } from '@/hooks/usePromptData';
import { useEffect } from 'react';
import AdminView from './AdminView';
const AdminContainer = () => {

    const { data, isLoading, isError } = usePromptStatisticsData();

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);
    return <AdminView {...{
        data
    }} />;
};

export default AdminContainer;
