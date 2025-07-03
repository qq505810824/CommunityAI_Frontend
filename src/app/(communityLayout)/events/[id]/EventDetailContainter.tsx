'use client';

import CalendarDetailView from '@/app/(calendarLayout)/calendar/[id]/CalendarDetailView';
import Loading from '@/app/components/base/loading';
import { useCalendarDetailData } from '@/hooks/useCalendarData';
import { useEffect, useState } from 'react';
import { useAppDetailContext } from '../../communitys/[id]/detail-context';
interface ViewProps {
    meta?: any;
}
export default function EventDetailContainter({ meta }: ViewProps) {
    const [calendar_id, setCalendarId] = useState(0);
    const { data, isLoading, isError, mutate } = useCalendarDetailData(calendar_id, '');
    const { activeTab, setActiveTab } = useAppDetailContext();
    useEffect(() => {
        if (meta) {
            // console.log('meta', meta);
            setCalendarId(meta?.calendar?.id);
        }
    }, [meta]);
    useEffect(() => {
        if (calendar_id) {
            mutate();
        }
    }, [calendar_id]);

    useEffect(() => {
        if (data) {
            // console.log('data', data);
        }
    }, [data]);

    const handleBack = () => {
        setActiveTab({
            name: 'events'
        });
    };
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <CalendarDetailView
                {...{
                    back: handleBack,
                    product: data
                }}
            />
            {/* <EventDetailView {...{}} /> */}
        </>
    );
}
