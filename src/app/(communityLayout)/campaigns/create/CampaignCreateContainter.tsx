'use client';
import { UploadFilesToAzure } from '@/app/components/common/Widget/run-batch';
import { useAppContext } from '@/context/app-context';
import useAlert from '@/hooks/useAlert';
import { useCampaignOperations } from '@/hooks/useCampaignData';
import { CampaignModel } from '@/models/Campaign';
import _ from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import CampaignCreateView from './CampaignCreateView';

export default function CampaignCreateContainter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addCampaign } = useCampaignOperations();
    const [product, setProduct] = useState<CampaignModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { user_id } = useAppContext();
    const { setAlert } = useAlert();

    const handleSubmit = async (formData: CampaignModel) => {
        setSubmitting(true);
        let upload_file_urls = '';
        if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
            upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        }
        const newFormData = {
            ...formData,
            files_url: upload_file_urls,
            owner: user_id
        };

        console.log('newFormData', newFormData);

        try {
            const { data, error } = await addCampaign(_.omit(newFormData, 'uploadFiles'));
            if (error) {
                console.error('發佈錯誤:', error);
                setAlert({
                    title: 'Error',
                    type: 'error'
                });
            } else {
                router.push(`/campaigns`);
            }
        } catch (error) {
            setAlert({
                title: 'Error',
                type: 'error'
            });
            console.error('發佈錯誤！:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <CampaignCreateView
                {...{
                    product,
                    submitting,
                    setSubmitting,
                    handleSubmit
                }}
            />
        </>
    );
}
