'use client';

import useAlert from '@/hooks/useAlert';
import { useCalendarOperations } from '@/hooks/useCalendarData';
import useLoad from '@/hooks/useLoad';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormView from './FormView';

export interface EventForm {
    id: string;
    name: string;
    description: string;
    created_at: string;
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

function FormContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<EventForm[]>([]);
    const { searchCalendar, deleteCalendar, updateCalendar } = useCalendarOperations();
    const [searching, setSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchAllFormData();
    }, []);

    const fetchAllFormData = async () => {
        setIsLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/forms`);
        // console.log('response.data', response.data);
        setIsLoading(false);
        if (response.data.success) {
            setProducts(response.data.forms);
        } else {
            alert(response.data.error?.toString() || 'error');
        }
    };



    const handleSearch = async (value: string) => {
        // console.log('search value', value);
        // setSearching(true);
        // const res: any = await searchCalendar({ keyword: value });
        // setSearching(false);
        // if (res.data) {
        //     const newData = res.data.map((item: CalendarModel) => {
        //         return {
        //             ...item,
        //             created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
        //             updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
        //         };
        //     });
        //     setProducts(newData);
        // }
    };
    const handleDelete = async (id: number) => {
        // const res: any = await deleteCalendar(id);
        // console.log('res', res);
        // if (res.success) {
        //     mutate();
        //     setAlert({
        //         title: '删除成功',
        //         type: 'success'
        //     });
        // }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        // console.log('id,status', id, status);

        // const res: any = await updateCalendar(id, { status });
        // console.log('res', res);
        // if (!res.error) {
        //     mutate();
        //     setAlert({
        //         title: '操作成功',
        //         type: 'success'
        //     });
        // }
    };

    return (
        <FormView
            {...{
                isLoading,
                products,
                handleSearch,
                searching,
                onDelete: handleDelete,
                onUpdataStatus: handleUpdateStatus
            }}
        />
    );
}

export default FormContainer;
