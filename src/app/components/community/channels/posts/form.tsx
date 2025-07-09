import FormDetailView from '@/app/components/common/Widget/form';
import { PostModel } from '@/models/Post';
import { PostFormData } from '@/utils/formData';
import { useEffect, useState } from 'react';

interface ViewProps {
    product: PostModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    submit: (formData: PostModel) => void;

    // payload: any;
    // submit: () => void;
    // cancel: any;
}

export default function PostFormView(props: ViewProps) {
    const { product, submitting, setSubmitting, submit } = props;
    const [formData, setFormData] = useState(PostFormData);
    useEffect(() => {
        if (product) {
            console.log('product', product);
            setFormData({
                ...formData,
                form_data: product
            });
        }
    }, [product]); // 添加依赖项


    // const { addPost } = usePostOperations();
    // const [submitting, setSubmitting] = useState(false);

    // const [data, setData] = useState<PostModel>({
    //     title: '',
    //     description: ''
    // });

    // const onSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault(); // 阻止表单自动跳转和刷新
    //     console.log('data', data);
    //     console.log('payload', payload);
    //     setSubmitting(true);
    //     const res = await addPost({
    //         ...payload,
    //         ...data
    //     });

    //     setData({ title: '', description: '' });

    //     setSubmitting(false);
    //     submit();
    //     console.log('res', res);
    // };

    return (
        <>
            <FormDetailView
                className={'p-4 sm:p-6 border rounded-lg'}
                formData={formData}
                disabled={submitting}
                onSubmit={submit}
            />
            {/* 
            <form onSubmit={onSubmit}>
                <div className="w-full flex flex-row  space-x-2 hidden">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <UserCircleIcon className="h-10 w-10 text-gray-500 " aria-hidden="true" />
                    </div>
                    <div className="w-full relative">
                        <textarea
                            rows={3}
                            placeholder="e.g. announcements"
                            className="w-full p-2 border bg-gray-100 rounded-sm"
                            value={data.title}
                            required={true}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        ></textarea>
                        <button
                            type="submit"
                            disabled={submitting}
                            className=" absolute bottom-3 right-3 bg-blue-500 text-white px-2 py-1 text-sm rounded-md hover:bg-blue-600"
                        >
                            Confrim
                        </button>
                    </div>
                </div>
            </form>
            <div className="hidden bg-white border rounded-lg p-6 ">
                <h4 className="font-semibold mb-4">Create Post</h4>
                <form onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Post Content</label>
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
            </div> */}
        </>
    );
}
