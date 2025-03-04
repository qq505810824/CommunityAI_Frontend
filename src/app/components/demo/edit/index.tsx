'use client';

import { FC } from 'react';
import { MContext } from '../context';
import { useDemo } from '../hooks';
import EditForm from './form';

export type IProps = {};

const EditMain: FC<IProps> = ({}) => {
    const { appData, handleUpdateModel } = useDemo();

    return (
        <>
            <MContext.Provider
                value={{
                    appData,
                    handleUpdateModel
                }}
            >
                <>
                    <EditForm />
                </>
            </MContext.Provider>
        </>
    );
};
export default EditMain;
