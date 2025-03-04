'use client';

import { FC } from 'react';
import { MContext } from '../context';
import { useDemo } from '../hooks';
import DetailView from './view';

export type IProps = {};

const DetailMain: FC<IProps> = ({}) => {
    const { appData, handleDeleteModel, handleUpdateModel } = useDemo();

    return (
        <>
            <MContext.Provider
                value={{
                    appData,
                    handleDeleteModel,
                    handleUpdateModel
                }}
            >
                <>
                    <DetailView />
                </>
            </MContext.Provider>
        </>
    );
};
export default DetailMain;
