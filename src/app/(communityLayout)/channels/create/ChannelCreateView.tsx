import { ChannelModel } from '@/models/Channel';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface ViewProps {
    submitting: boolean;
    handleSubmit: (data: ChannelModel) => void;
}
export default function ChannelCreateView({ submitting, handleSubmit }: ViewProps) {
    const router = useRouter();

    const [data, setData] = useState<ChannelModel>({
        name: '',
        description: '',
        publish: true
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
                        <h4 className="font-semibold mb-4">Create New Channel</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Channel Name
                                </label>
                                <input
                                    type="text"
                                    name={'name'}
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder="e.g. announcements"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData({ ...data, description: e.target.value })
                                    }
                                    placeholder="What is this channel for?"
                                    rows={3}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="public"
                                        defaultChecked={data.publish == true}
                                        value={'true'}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">Public (All members)</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="public"
                                        value="false"
                                        defaultChecked={data.publish == false}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">Private (Premium only)</span>
                                </label>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="reset"
                                    disabled={submitting}
                                    // onClick={() => setShowCreateForm(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Create Channel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
