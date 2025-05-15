import { CalendarModel } from '@/hooks/useCalendarData';
import { CalendarFormData } from '@/utils/formData';
import { Button, Option, Select } from '@mui/joy';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ViewProps {
    product: CalendarModel | null;
    submitting?: boolean
    submit: (formData: CalendarModel) => void;
}

function CalendarEditForm(props: ViewProps) {
    const { product, submitting, submit } = props;
    const formData = CalendarFormData;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CalendarModel>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showReplaceButton, setShowReplaceButton] = useState(false);

    useEffect(() => {
        // 初始化时设置默认值
        Object.keys(formData.fieldSchema).forEach((key) => {
            const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
            if (uiSchema['ui:widget'] === 'select') {
                // 类型保护，确保 uiSchema 具有 ui:options 属性
                if ('ui:options' in uiSchema && uiSchema['ui:options']?.enumOptions) {
                    setValue(
                        key as keyof CalendarModel,
                        uiSchema['ui:options'].enumOptions[0].value
                    );
                }
            }
        });
    }, [formData, setValue, product]); // 添加依赖项

    const handleClickFile = (e: any) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('image_url', reader.result as string);
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderField = (key: string, field: any, uiSchema: any) => {
        switch (uiSchema['ui:widget']) {
            case 'text':
                return (
                    <input
                        {...register(key as keyof CalendarModel)}
                        type="text"
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md"
                    />
                );
            // case 'textarea':
            //     return (
            //         <textarea
            //             {...register(key as keyof CalendarModel)}
            //             required={field.required}
            //             placeholder={field.title}
            //             className="border p-2 w-full rounded-md min-h-[200px]"
            //         />
            //     );
            case 'textarea':
                return (
                    <div className="   w-full  min-h-[100px]">
                        <Editor
                            {...register(key as keyof CalendarModel)}
                            id="output_editor"
                            apiKey="g6v7lxx8s2baelpg69g81ei3jp7npb8bf1yv6hs8w8tp4422"
                            // onInit={(evt, editor) => ((editorRef.current as any) = editor)}
                            initialValue={''}
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
                                setValue(key as keyof CalendarModel, a); // 设置表单值
                            }}
                        />
                    </div>
                );
            case 'select':
                return (
                    <Select
                        {...register(key as keyof CalendarModel)}
                        required={field.required}
                        multiple={false}
                        defaultValue={
                            (uiSchema['ui:options']?.enumOptions &&
                                uiSchema['ui:options']?.enumOptions[0].value) ||
                            ''
                        }
                        onChange={(event, value) => {
                            setValue(key as keyof CalendarModel, value?.toString());
                        }}
                        sx={{ minWidth: '15rem' }}
                        slotProps={{
                            listbox: {
                                sx: {
                                    width: '100%'
                                }
                            }
                        }}
                    >
                        {uiSchema['ui:options']?.enumOptions?.map((option: any) => (
                            <Option key={option.value} value={option.value}>
                                {option.name}
                            </Option>
                        ))}
                    </Select>
                );
            case 'file':
                return (
                    <>
                        <div
                            {...register(key as keyof CalendarModel)}
                            className="w-full flex justify-center relative"
                        >
                            <div
                                className="bg-gray-200 font-semibold rounded-sm flex justify-center flex-col items-center text-center w-[250px] h-[300px] cursor-pointer relative"
                                onClick={(e) => handleClickFile(e)}
                                onMouseEnter={() => selectedImage && setShowReplaceButton(true)}
                                onMouseLeave={() => setShowReplaceButton(false)}
                            >
                                {selectedImage ? (
                                    <>
                                        <img
                                            src={selectedImage}
                                            alt="Selected"
                                            className="w-full h-auto object-cover rounded-sm"
                                        />
                                        {showReplaceButton && (
                                            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                                <button
                                                    type="button"
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                                                    onClick={(e) => {
                                                        handleClickFile(e);
                                                    }}
                                                >
                                                    更換圖片
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p>上傳活動封面</p>
                                        <p className="text-xs">(建議上傳圖片比例5:6,限10M內)</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <input
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </>
                );
            case 'date_range':
                return (
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            required={field.required}
                            className="border p-2 rounded-md"
                            onChange={(e) =>
                                setValue(uiSchema['ui:keys']?.start_date, e.target.value)
                            }
                        />
                        <span>至</span>
                        <input
                            type="date"
                            required={field.required}
                            className="border p-2 rounded-md"
                            onChange={(e) =>
                                setValue(uiSchema['ui:keys']?.end_date, e.target.value)
                            }
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submit)}
                className="w-full overflow-auto">
                {Object.keys(formData.fieldSchema).map((key) => {
                    const field = formData.fieldSchema[key as keyof typeof formData.fieldSchema];
                    const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
                    return (
                        <div key={key} className="mb-4">
                            <p className=" font-medium text-sm">
                                {field.title}{' '}
                                <span className="text-sm text-gray-400">{field.tip}</span>
                            </p>
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
        </>
    );
}

export default CalendarEditForm;
