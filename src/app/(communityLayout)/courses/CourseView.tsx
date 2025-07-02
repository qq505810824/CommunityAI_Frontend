import CourseCard from '@/app/components/community/courses/CourseCard';
import { CourseModel } from '@/models/Course';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDetailContext } from '../communitys/[id]/detail-context';

interface ViewProps {
    courses: CourseModel[];
}

export default function CourseView({ courses }: ViewProps) {
    const router = useRouter();

    const { activeTab, setActiveTab } = useAppDetailContext();

    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const handleCreatCourse = () => {
        router.push(`/courses/create`);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-semibold">Courses</h3>
                        <p className="text-gray-600 text-sm">
                            Admin-only Courses for announcements and updates
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            handleCreatCourse();
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Course</span>
                    </button>
                </div>

                {/* Course List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses?.map((course, index) => <CourseCard course={course} key={index} />)}
                </div>
            </div>
        </>
    );
}
