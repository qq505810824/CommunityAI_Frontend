import { usePostOperations } from '@/hooks/usePostData';
import { PostModel } from '@/models/Post';
import { useState } from 'react';

interface ViewProps {
    payload: any;
    submit: () => void;
    cancel: any;
}

export default function PostFormView({ payload, submit, cancel }: ViewProps) {
    const { addPost } = usePostOperations();
    const [submitting, setSubmitting] = useState(false);

    const [data, setData] = useState<PostModel>({
        title: '',
        description: ''
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单自动跳转和刷新
        console.log('data', data);
        console.log('payload', payload);
        setSubmitting(true);
        const res = await addPost({
            ...payload,
            ...data
        });

        setSubmitting(false);
        submit();
        console.log('res', res);
    };

    return (
        <>
            <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold mb-4">Create Post</h4>
                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Post Name</label>
                            <input
                                type="text"
                                value={data.title}
                                name={'title'}
                                required={true}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                placeholder="e.g. announcements"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="hidden">
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                name={'description'}
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                placeholder="What is this channel for?"
                                rows={3}
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                disabled={submitting}
                                onClick={cancel}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Confrim
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
