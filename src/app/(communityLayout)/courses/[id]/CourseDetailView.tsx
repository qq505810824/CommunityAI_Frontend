import Toast from '@/app/components/base/toast';
import { CourseModel } from '@/models/Course';
import {
    ArrowLeft,
    Bookmark,
    BookOpen,
    CheckCircle,
    Clock,
    Share2,
    Star,
    Users
} from 'lucide-react';
import { useAppDetailContext } from '../../communitys/[id]/detail-context';

interface ViewProps {
    course: CourseModel | undefined;
}

export default function CourseDetailView({ course }: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext();

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

    const handleEnroll = () => {
        Toast.notify({
            type: 'warning',
            message: 'Registration is not open yet'
        });
    };


    // 判断是否为 YouTube 链接
    function isYouTubeUrl(url: string) {
        return /youtube\.com|youtu\.be/.test(url);
    }

    // 获取 YouTube 视频的 embed 链接
    function getYouTubeEmbedUrl(url: string) {
        const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }

    // 判断是否为图片
    function isImageUrl(url: string) {
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    }

    // 判断是否为video
    function isVideoUrl(url: string) {
        return /\.(mp4)$/i.test(url);
    }
    // 你的资源地址
    const mediaUrl = course?.video_url || "";


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() =>
                            setActiveTab({
                                name: 'courses'
                            })
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h3 className="text-xl font-semibold">{course?.title}</h3>
                        <p className="text-gray-600 text-sm">by {course?.owner?.name}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3 hidden">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-lg p-6 mb-6">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                            {isYouTubeUrl(mediaUrl) ? (
                                <iframe
                                    src={getYouTubeEmbedUrl(mediaUrl)}
                                    title="YouTube Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full rounded-lg"
                                />
                            ) : isVideoUrl(mediaUrl) ? (
                                <video src={mediaUrl} controls className="w-full h-full rounded-lg" />
                            ) : (
                                <img src={mediaUrl} alt="Course Media" className=" object-cover w-full h-full rounded-lg" />
                            )}
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{course?.title}</h4>
                        <p className="text-gray-600 mb-4">{course?.description.replace(/<[^>]*>/g, '')}</p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                            <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{course?.duration || 0}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{course?.lessons || 0} lessons</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{course?.enrolled_count || 0} students</span>
                            </span>
                        </div>

                        {/* {selectedCourse?.progress > 0 && (
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Your Progress</span>
                                    <span>{selectedCourse.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${selectedCourse.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )} */}
                    </div>

                    {/* Course Modules */}
                    <div className="bg-white border rounded-lg p-6 hidden">
                        <h4 className="font-semibold text-lg mb-4">Course Content</h4>
                        <div className="space-y-3">
                            {/* {selectedCourse?.modules.map((module: any, index: number) => (
                                <div key={module.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-medium flex items-center space-x-2">
                                            {module.completed ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                                            )}
                                            <span>
                                                Module {index + 1}: {module.title}
                                            </span>
                                        </h5>
                                        <span className="text-sm text-gray-500">
                                            {module.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{module.lessons} lessons</span>
                                        <button className="text-blue-500 hover:underline">
                                            {module.completed ? 'Review' : 'Start'}
                                        </button>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>

                {/* Course Sidebar */}
                <div className="space-y-6 ">
                    <div className="bg-white border rounded-lg p-6">
                        <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {course?.price === 0 ? 'Free' : `$${course?.price || ''}`}
                            </div>
                            {/* {selectedCourse?.tier !== 'all' && (
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                    {selectedCourse?.tier} members only
                                </span>
                            )} */}
                        </div>

                        <button
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium mb-4"
                            onClick={() => {
                                handleEnroll();
                            }}
                        >
                            {/* {selectedCourse?.progress > 0 ? 'Continue Learning' : 'Enroll Now'} */}
                            Enroll Now
                        </button>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration</span>
                                <span className="font-medium">{course?.duration || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Lessons</span>
                                <span className="font-medium">{course?.lessons || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Students</span>
                                <span className="font-medium">{course?.enrolled_count || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Rating</span>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="font-medium">{course?.rating || 1}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <h5 className="font-semibold mb-4">What you'll learn</h5>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Master advanced techniques and strategies</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Apply practical skills to real-world scenarios</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Get access to exclusive resources and templates</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Join a community of like-minded learners</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
