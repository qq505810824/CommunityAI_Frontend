import CourseEditForm from '@/app/components/community/courses/edit/form';
import { CourseModel } from '@/models/Course';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ViewProps {
    product: CourseModel | null;
    submitting: boolean;
    handleSubmit: (formData: CourseModel) => void;
}

function CourseEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    const router = useRouter();
    return (
        <>
            <div className="flex-1 ">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => router.back()} className="p-2   rounded-lg">
                            <ArrowLeft className="w-5 h-5 hover:text-gold-400" />
                        </button>
                    </div>
                    <CourseEditForm
                        {...{
                            product,
                            submitting,
                            submit: handleSubmit
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default CourseEditView;
