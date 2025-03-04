'use client';

import Confirm from '@/app/components/base/confirm';
import InputNameModal from '@/app/components/common/Widget/modals/InputNameModal';
import type { ApiBasedExtension } from '@/models/common';
import { BaseInputExtension } from '@/models/modals';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { createContext, useContext } from 'use-context-selector';

export type ModalState<T> = {
    payload: T;
    onCancelCallback?: () => void;
    onSaveCallback?: (newPayload: T) => void;
    onValidateBeforeSaveCallback?: (newPayload: T) => boolean;
};

const ModalContext = createContext<{
    setShowApiBasedExtensionModal: Dispatch<SetStateAction<ModalState<ApiBasedExtension> | null>>;
    setInputNameModal: Dispatch<SetStateAction<ModalState<BaseInputExtension> | null>>;
    setShowConfirmDelete: Dispatch<SetStateAction<ModalState<any> | null>>;
}>({
    setShowApiBasedExtensionModal: () => {},
    setInputNameModal: () => {},
    setShowConfirmDelete: () => {}
});

export const useModalContext = () => useContext(ModalContext);

type ModalContextProviderProps = {
    children: React.ReactNode;
};
export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
    const [showApiBasedExtensionModal, setShowApiBasedExtensionModal] =
        useState<ModalState<ApiBasedExtension> | null>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState<ModalState<any> | null>(null);

    const [showInputNameModal, setInputNameModal] = useState<ModalState<BaseInputExtension> | null>(
        null
    );
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSaveApiBasedExtension = (newApiBasedExtension: ApiBasedExtension) => {
        if (showApiBasedExtensionModal?.onSaveCallback)
            showApiBasedExtensionModal.onSaveCallback(newApiBasedExtension);

        setShowApiBasedExtensionModal(null);
    };

    const handleSaveInputNameExtension = (newExtension: BaseInputExtension) => {
        if (showInputNameModal?.onSaveCallback) showInputNameModal.onSaveCallback(newExtension);

        setInputNameModal(null);
    };

    const onConfirmDelete = (data: any) => {
        if (showConfirmDelete?.onSaveCallback) showConfirmDelete.onSaveCallback(data);

        setShowConfirmDelete(null);
    };

    return (
        <ModalContext.Provider
            value={{
                setShowApiBasedExtensionModal,
                setInputNameModal,
                setShowConfirmDelete
            }}
        >
            <>
                {children}
                {!!showInputNameModal && (
                    <InputNameModal
                        data={showInputNameModal.payload}
                        onCancel={() => setInputNameModal(null)}
                        onSave={handleSaveInputNameExtension}
                    />
                )}
                {!!showConfirmDelete && (
                    <Confirm
                        data={showConfirmDelete.payload}
                        title={showConfirmDelete?.payload?.title || 'Tip'}
                        content={showConfirmDelete?.payload?.content || 'Are you sure to delete?'}
                        isShow={!!showConfirmDelete}
                        onClose={() => setShowConfirmDelete(null)}
                        onConfirm={onConfirmDelete}
                        onCancel={() => setShowConfirmDelete(null)}
                    />
                )}
                {/* {
                    !!showApiBasedExtensionModal && (
                        <ApiBasedExtensionModal
                            data={showApiBasedExtensionModal.payload}
                            onCancel={() => setShowApiBasedExtensionModal(null)}
                            onSave={handleSaveApiBasedExtension}
                        />
                    )
                } */}
            </>
        </ModalContext.Provider>
    );
};

export default ModalContext;
