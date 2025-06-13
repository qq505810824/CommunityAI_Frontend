import { useEffect, useState } from 'react';
import { UploadFilesToAzure } from '../run-batch';
import RunBatch from './upload_file/run-batch';

export default function FormFileWidget(props: any) {
    const { name, required, value, onChange, disabled } = props;
    // console.log('props', props);
    const [loading, setLoading] = useState(false);

    const [uploadFiles, setUploadFiles] = useState<File[]>([]);

    useEffect(() => {
        if (uploadFiles) {
            // console.log('uploadFiles', uploadFiles);
            uploadFileToServer(uploadFiles);
        }
    }, [uploadFiles]);

    const uploadFileToServer = async (files: any[]) => {
        let upload_file_urls = '';
        if (files.length > 0) {
            setLoading(true);
            upload_file_urls = await UploadFilesToAzure(files);
            setLoading(false);
        }
        onChange(upload_file_urls);
    };

    return (
        <div>
            <div className="flex flex-row items-center">
                <label className="block text-md font-medium text-[#1a202c]">{props.label}</label>
                {required && (
                    <label className="block text-md font-medium text-[#e53e3e] ml-2">*</label>
                )}
            </div>
            <RunBatch loading={loading} setUploadFiles={setUploadFiles} />
        </div>
    );
}
