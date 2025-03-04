'use client';

import { useCallback, useMemo } from 'react';
import { useToastContext } from '../base/toast';
import { AppData } from './types';

export const useDemo = () => {
    const { notify } = useToastContext();
    const appData = useMemo(() => {
        return {
            name: ' title'
        } as AppData;
    }, []);

    const handleAddModel = useCallback(() => {
        console.log('add');
    }, []);

    const handleUpdateModel = useCallback(() => {
        console.log('update');
    }, []);
    const handleDeleteModel = useCallback(() => {
        console.log('delete');
    }, []);
    const handleSearch = useCallback(() => {
        console.log('search');
    }, []);

    const handleRefresh = useCallback(() => {
        console.log('refresh');
    }, []);
    return {
        appData,
        handleAddModel,
        handleUpdateModel,
        handleDeleteModel
    };
};
