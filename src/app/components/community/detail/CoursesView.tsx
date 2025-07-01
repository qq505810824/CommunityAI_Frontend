
import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import {
    Plus,
    Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function CoursesView() {

    const router = useRouter()
    const { activeTab, setActiveTab } = useAppDetailContext()
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const courses = [
        {
            id: 1,
            title: 'Advanced SEO Strategies 2025',
            description: 'Master the latest SEO techniques and rank higher in search results',
            instructor: 'Sarah Chen',
            duration: '6 hours',
            lessons: 24,
            enrolled: 156,
            rating: 4.8,
            price: 99,
            tier: 'premium',
            thumbnail: '🔍',
            progress: 0,
            modules: [
                {
                    id: 1,
                    title: 'SEO Fundamentals',
                    lessons: 6,
                    duration: '90 min',
                    completed: false
                },
                {
                    id: 2,
                    title: 'Keyword Research Mastery',
                    lessons: 8,
                    duration: '120 min',
                    completed: false
                },
                {
                    id: 3,
                    title: 'Technical SEO',
                    lessons: 10,
                    duration: '150 min',
                    completed: false
                }
            ]
        },
        {
            id: 2,
            title: 'Content Marketing Blueprint',
            description: 'Create compelling content that converts visitors into customers',
            instructor: 'Anna Smith',
            duration: '4 hours',
            lessons: 18,
            enrolled: 89,
            rating: 4.6,
            price: 79,
            tier: 'basic',
            thumbnail: '📝',
            progress: 45,
            modules: [
                {
                    id: 1,
                    title: 'Content Strategy',
                    lessons: 5,
                    duration: '75 min',
                    completed: true
                },
                {
                    id: 2,
                    title: 'Content Creation',
                    lessons: 8,
                    duration: '100 min',
                    completed: false
                },
                {
                    id: 3,
                    title: 'Content Promotion',
                    lessons: 5,
                    duration: '65 min',
                    completed: false
                }
            ]
        },
        {
            id: 3,
            title: 'Email Marketing Automation',
            description: 'Build automated email sequences that nurture leads and drive sales',
            instructor: 'Mike Rodriguez',
            duration: '5 hours',
            lessons: 20,
            enrolled: 234,
            rating: 4.9,
            price: 129,
            tier: 'premium',
            thumbnail: '📧',
            progress: 0,
            modules: [
                {
                    id: 1,
                    title: 'Email Strategy',
                    lessons: 6,
                    duration: '90 min',
                    completed: false
                },
                {
                    id: 2,
                    title: 'Automation Setup',
                    lessons: 8,
                    duration: '120 min',
                    completed: false
                },
                {
                    id: 3,
                    title: 'Advanced Sequences',
                    lessons: 6,
                    duration: '90 min',
                    completed: false
                }
            ]
        }
    ];

    const handleClickCourse = (course: any) => {
        router.push(`/courses/${course?.id}`)
    }

    const handleCreatCourse = () => {
        router.push(`/courses/create`)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">Courses</h3>
                    <p className="text-gray-600 text-sm">
                        Comprehensive learning modules with multimedia content
                    </p>
                </div>
                <button
                    onClick={() => {
                        handleCreatCourse()
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Course</span>
                </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => {
                            // handleClickCourse(course)
                            setSelectedCourse(course);
                            setActiveTab('course-detail');
                        }}
                        className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <div className="text-4xl">{course.thumbnail}</div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-lg">{course.title}</h4>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm text-gray-600">{course.rating}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{course.lessons} lessons</span>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{course.enrolled} enrolled</span>
                                    <span>by {course.instructor}</span>
                                </div>
                            </div>

                            {course.progress > 0 && (
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-green-600">
                                        {course.price === 0 ? 'Free' : `$${course.price}`}
                                    </span>
                                    {course.tier !== 'all' && (
                                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                            {course.tier}
                                        </span>
                                    )}
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
                                    {course.progress > 0 ? 'Continue' : 'Start'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}