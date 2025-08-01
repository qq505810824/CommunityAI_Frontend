import PostFormView from '@/app/components/community/channels/posts/form';
import { PostModel } from '@/models/Post';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDetailContext } from '../../../../communitys/[id]/detail-context';

interface ViewProps {
    product: PostModel | null;
    submitting: boolean;
    setSubmitting?: any;
    handleSubmit: (data: PostModel) => void;
}

export default function PostCreateView({
    product,
    submitting,
    setSubmitting,
    handleSubmit
}: ViewProps) {
    const router = useRouter();

    const { activeTab, setActiveTab } = useAppDetailContext();

    const [selectedChannel, setSelectedChannel] = useState<any>(null);
    const handleCreatChannel = () => {
        router.push(`/channels/create`);
    };

    return (
        <>
            <div className="flex-1 ">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => router.back()} className="p-2  rounded-lg">
                            <ArrowLeft className="w-5 h-5 hover:text-gold-400" />
                        </button>
                    </div>

                    <PostFormView
                        {...{
                            product,
                            submitting,
                            setSubmitting,
                            submit: handleSubmit
                        }}
                    />
                </div>
            </div>
        </>
    );
}
