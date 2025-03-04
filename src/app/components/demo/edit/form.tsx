'use client';

import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Input from '../../base/input';

const EditForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [submitting, setSubmitting] = useState(false);
    const params = useParams();
    const router = useRouter();
    const [columns, setColumns] = useState<any>([]);
    const [name, setName] = useState('');

    const handleAddColumn = () => {
        const newData = [...columns, ''];
        setColumns(newData);
    };

    const handleUpdateColumn = (index: number, value: string) => {
        columns[index] = value;
        const newData = [...columns];
        setColumns(newData);
    };

    const handleRemoveColumn = (index: number) => {
        columns.splice(index, 1);
        const newData = [...columns];
        setColumns(newData);
    };

    return (
        <>
            <div className="flex flex-col gap-2 items-center  w-full justify-center ">
                <div className="w-full items-center bg-white rounded-xl p-6 ">
                    <div className="flex flex-col gap-2 w-full mt-4">
                        <Input
                            name={'name'}
                            placeholder={'Input name'}
                            displayName={'Table Name'}
                            type={'text'}
                            value={name}
                            onChange={(value) => {
                                setName(value);
                            }}
                        />
                        {columns?.map((c: any, index: number) => (
                            <div key={index} className="flex flex-row items-center justify-between">
                                <div className={`relative inline-flex w-full flex-col `}>
                                    <div className="mb-1">
                                        <span className="text-gray-500">{'Column Name'}</span>
                                    </div>
                                    <input
                                        name={'name' + index}
                                        type={'text'}
                                        className="inline-flex h-8 w-full py-1 px-2 rounded-lg text-xs leading-normal bg-gray-100 caret-primary-600 hover:bg-gray-100 focus:ring-1 focus:ring-inset focus:ring-gray-200 focus-visible:outline-none focus:bg-white placeholder:text-gray-400"
                                        value={c}
                                        required={true}
                                        placeholder="Input name"
                                        onChange={(e) => {
                                            handleUpdateColumn(index, e.target.value);
                                        }}
                                    />
                                </div>
                                <XCircleIcon
                                    className="w-5 h-5 ml-4 mt-7 text-red-500 cursor-pointer"
                                    onClick={() => {
                                        handleRemoveColumn(index);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-end">
                        <PlusCircleIcon
                            className="w-6 h-6 text-blue-500 cursor-pointer"
                            onClick={() => {
                                handleAddColumn();
                            }}
                        />
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            type="reset"
                            disabled={submitting}
                            className={`px-4 hidden py-2 mr-6 ${submitting ? 'bg-gray-600' : 'bg-white hover:bg-slate-100'}  border text-black rounded-md `}
                        >
                            {'Cancel'}
                        </button>

                        <button
                            disabled={submitting}
                            className={`px-4 py-2 ${submitting ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} font-bold text-white rounded-md `}
                        >
                            {submitting ? 'Save...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditForm;
