import { useCommentOperations } from '@/hooks/useCommentData';
import { CommentModel } from '@/models/Comment';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ViewProps {
    payload: any;
    submit: () => void;
    cancel: any;
}

export default function CommentFormView({ payload, submit, cancel }: ViewProps) {
    const { addComment } = useCommentOperations();
    const [submitting, setSubmitting] = useState(false);

    const [data, setData] = useState<CommentModel>({
        content: ''
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单自动跳转和刷新
        console.log('data', data);
        console.log('payload', payload);
        setSubmitting(true);
        const res = await addComment({
            ...payload,
            ...data
        });

        setData({ content: '' });

        setSubmitting(false);
        submit();
        console.log('res', res);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="w-full flex flex-row  space-x-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <UserCircleIcon className="h-10 w-10 text-gray-500 " aria-hidden="true" />
                    </div>
                    <div className="w-full relative">
                        <textarea
                            rows={3}
                            placeholder="e.g. good"
                            className="w-full p-2 border bg-gray-100 rounded-sm"
                            value={data.content}
                            required={true}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                        ></textarea>
                        <button
                            type="submit"
                            disabled={submitting}
                            className=" absolute bottom-3 right-3 bg-blue-500 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-600"
                        >
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
