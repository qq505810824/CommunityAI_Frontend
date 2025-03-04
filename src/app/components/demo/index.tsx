'use client';

import { useRouter } from 'next/navigation';
import { MContext } from './context';
import { useDemo } from './hooks';
import DemoView from './view';

const DemoMain = () => {
    const router = useRouter();

    const { appData, handleAddModel, handleDeleteModel, handleUpdateModel } = useDemo();

    return (
        <MContext.Provider
            value={{
                appData,
                handleAddModel,
                handleDeleteModel,
                handleUpdateModel
            }}
        >
            <DemoView />
        </MContext.Provider>
    );
};

export default DemoMain;
