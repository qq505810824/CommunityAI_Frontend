import BackView from '@/app/components/base/back/BackView';
import { ArticleModel } from '@/hooks/useArticleData';
import { ArticleFormData } from '@/utils/formData';
import { Button } from '@mui/joy';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ViewProps {
    data: ArticleModel | undefined;
    submitting?: boolean;
    onSubmit: any;
}

function EditArticleView(props: ViewProps) {
    const { data, submitting, onSubmit } = props;
    const formData = ArticleFormData;
    const { register, reset, handleSubmit, setValue, getValues } = useForm<ArticleModel>(); // 初始化 useForm
    useEffect(() => {
        if (data) {
            reset(data);
        } else {
        }
    }, [data]);

    const submit = (formData: ArticleModel) => {
        // 处理表单提交
        // console.log(formData);
        if (onSubmit) {
            onSubmit(formData);
        }
        // reset(); // 提交后清空表单
    };

    const renderField = (key: string, field: any, uiSchema: any) => {
        switch (uiSchema['ui:widget']) {
            case 'text':
                return (
                    <input
                        {...register(key as keyof ArticleModel)}
                        type="text"
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md"
                    />
                );
            case 'textarea':
                return (
                    <div className="   w-full  min-h-[100px]">
                        <Editor
                            id="output_editor"
                            apiKey="g6v7lxx8s2baelpg69g81ei3jp7npb8bf1yv6hs8w8tp4422"
                            // onInit={(evt, editor) => ((editorRef.current as any) = editor)}
                            initialValue={data?.description || ''}
                            init={{
                                height: 500,
                                menubar: false,
                                entity_encoding: 'raw',
                                verify_html: false,
                                // plugins: [
                                //     'advlist',
                                //     'autolink',
                                //     'lists',
                                //     'link',
                                //     'image',
                                //     'charmap',
                                //     'preview',
                                //     'anchor',
                                //     'searchreplace',
                                //     'visualblocks',
                                //     'code',
                                //     'fullscreen',
                                //     'insertdatetime',
                                //     'media',
                                //     'table',
                                //     'code',
                                //     'help',
                                //     'wordcount'
                                // ],
                                plugins: ['link', 'wordcount', 'preview', 'image'],
                                // toolbar:
                                //     'undo redo | blocks | ' +
                                //     'bold italic forecolor | alignleft aligncenter ' +
                                //     'alignright alignjustify | bullist numlist outdent indent | ' +
                                //     'removeformat | help',
                                toolbar:
                                    'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat',
                                content_style:
                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(a: any, editor: any) => {
                                setValue(key as keyof ArticleModel, a); // 设置表单值
                            }}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full justify-center flex flex-col items-center">
            <div className=" w-[680px] my-2">
                <BackView title="返回" />
            </div>
            <form onSubmit={handleSubmit(submit)} className="w-[680px]">
                {' '}
                {/* 添加 onSubmit 处理 */}
                {Object.keys(formData.fieldSchema).map((key) => {
                    const field = formData.fieldSchema[key as keyof typeof formData.fieldSchema];
                    const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
                    return (
                        <div key={key} className="mb-4">
                            <label>{field.title}</label>
                            {renderField(key, field, uiSchema)}
                        </div>
                    );
                })}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        loading={submitting}
                        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 rounded-md"
                    >
                        提交
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditArticleView;
