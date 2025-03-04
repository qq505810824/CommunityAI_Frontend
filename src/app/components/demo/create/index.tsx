'use client';

import { FC } from 'react';
import { MContext } from '../context';
import { useDemo } from '../hooks';
import CreateForm from './form';

export type IProps = {};

const CreateMain: FC<IProps> = ({}) => {
    const { handleAddModel } = useDemo();

    return (
        <MContext.Provider
            value={{
                handleAddModel
            }}
        >
            <>
                <CreateForm />
            </>
        </MContext.Provider>
    );
};
export default CreateMain;
