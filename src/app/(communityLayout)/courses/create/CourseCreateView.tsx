import { CourseModel } from '@/models/Course';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface ViewProps {
    submitting: boolean;
    handleSubmit: (data: CourseModel) => void;
}
export default function CourseCreateView({ submitting, handleSubmit }: ViewProps) {
    const router = useRouter();

    const [data, setData] = useState<CourseModel>({
        title: '',
        description: '',
        price: 0,
        rating: 1,
        duration: '1h',
        lessons: 0,
        is_free: true
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单自动跳转和刷新
        console.log('data', data);
        handleSubmit(data);
    };
    return (
        <>
            <div className="flex-1  bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </div>
                    <form className="bg-white border rounded-lg p-6" onSubmit={onSubmit}>
                        <h4 className="font-semibold mb-4">Create New Course</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    required={true}
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    placeholder="e.g. Advanced Marketing Strategies"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="What will students learn?"
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) =>
                                        setData({ ...data, description: e.target.value })
                                    }
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1h"
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData({ ...data, duration: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Lessons
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={data.lessons}
                                        onChange={(e) =>
                                            setData({ ...data, lessons: Number(e.target.value) })
                                        }
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData({ ...data, price: Number(e.target.value) })
                                        }
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="hidden">
                                    <label className="block text-sm font-medium mb-2">
                                        Access Level
                                    </label>
                                    <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="all">All Members</option>
                                        <option value="basic">Basic Tier</option>
                                        <option value="premium">Premium Tier</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    disabled={submitting}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Create Course
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
