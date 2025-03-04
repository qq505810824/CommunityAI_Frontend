'use client';
import Button from '@/app/components/base/button';
import Modal from '@/app/components/base/modal';
import { useToastContext } from '@/app/components/base/toast';
import { BaseInputExtension } from '@/models/modals';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';

export type IModalProps = {
    data: BaseInputExtension;
    onCancel: () => void;
    onSave: (newExtension: BaseInputExtension) => void;
};

const InputNameModal: FC<IModalProps> = ({ data, onCancel, onSave }) => {
    // const { t } = useTranslation()
    const { notify } = useToastContext();

    const [localeData, setLocaleData] = useState({ ...data, description: '' });

    const handleValueChange = (value: Record<string, string>) => {
        setLocaleData({
            ...localeData,
            ...value
        });
    };

    // const handleDataChange = (type: string, value: string) => {
    //     setLocaleData({ ...localeData, [type]: value })
    // }

    const submit = async () => {
        if (!localeData?.name?.trim()) {
            notify({ type: 'error', message: '' });
            return;
        }

        // let res: ApiBasedExtension = {}
        // if (!data.id) {
        //     res = await addApiBasedExtension({
        //         url: '/api-based-extension',
        //         body: localeData,
        //     })
        // }

        const formData = localeData;
        onSave(formData);
    };

    return (
        <>
            <Modal
                isShow
                onClose={() => {}}
                wrapperClassName="z-40"
                className="relative !max-w-[480px] px-8"
            >
                <div className="absolute right-4 top-4 p-2 cursor-pointer" onClick={onCancel}>
                    <XMarkIcon className="w-4 h-4 text-gray-500" />
                </div>
                <div className="mb-9 font-semibold text-xl leading-[30px] text-gray-900">
                    {'edit'}
                </div>
                <div className="mb-9">
                    {/* icon & name */}
                    <div className="pt-2">
                        <div className="py-2 text-sm font-medium leading-[20px] text-gray-900">
                            {'name'}
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <input
                                value={localeData?.name || ''}
                                onChange={(e) => handleValueChange({ name: e.target.value })}
                                placeholder={'Input Name...'}
                                className="grow h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs"
                            />
                        </div>
                    </div>
                    {/* description */}
                    <div className="pt-2">
                        <div className="py-2 text-sm font-medium leading-[20px] text-gray-900">
                            {'input_description'}
                        </div>
                        <textarea
                            className="w-full h-10 px-3 py-2 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs h-[80px] resize-none"
                            placeholder={''}
                            value={localeData?.description || ''}
                            onChange={(e) => handleValueChange({ description: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-row-reverse">
                    <Button className="w-24 ml-2" type="primary" onClick={submit}>
                        {'save'}
                    </Button>
                    <Button className="w-24" onClick={onCancel}>
                        {'cancel'}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default InputNameModal;
