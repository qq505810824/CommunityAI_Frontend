import { useEffect, useState } from 'react';
import RunBatch from './upload_files/run-batch';

export default function FormFilesWidget(props: any) {
    const { name, formData, required, value, onChange, disabled, uploadFiles, setUploadFiles } =
        props;

    // const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [uploadFileUrls, setUploadFileUrls] = useState<string[]>([]);

    // console.log('props', props);
    useEffect(() => {
        // console.log('formData', name);
        // console.log('value', value);
        if (value) {
            setUploadFileUrls(value.split(','));
        }
    }, [value]);

    useEffect(() => {
        if (uploadFileUrls) {
            // console.log('uploadFileUrls', uploadFileUrls);
        }
    }, [uploadFileUrls]);

    useEffect(() => {
        if (uploadFiles) {
            // console.log('uploadFiles', uploadFiles);
            setUploadFiles(uploadFiles);
        }
    }, [uploadFiles]);

    return (
        <div>
            <div className="flex flex-row items-center">
                <label className="block text-md font-medium text-[#1a202c]">{props.label}</label>
                {required && (
                    <label className="block text-md font-medium text-[#e53e3e] ml-2">*</label>
                )}
            </div>
            <RunBatch
                uploadFileUrls={uploadFileUrls || []}
                setUploadFileUrls={setUploadFileUrls}
                setUploadFiles={setUploadFiles}
            />
        </div>
    );
}
