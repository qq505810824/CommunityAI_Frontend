import { CalendarModel } from '@/hooks/useCalendarData';
import { CalendarFormData } from '@/models/Calendar';
import { createClient } from '@supabase/supabase-js';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { Item } from '../../base/select';
import FormDetailView from '../../common/Widget/form';
import RunBatch from '../../common/Widget/run-batch';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ViewProps {
    product: CalendarModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    submit: (formData: CalendarModel) => void;
}

function CalendarEditForm(props: ViewProps) {
    const { product, submitting, setSubmitting, submit } = props;
    // const formData = CalendarFormData;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CalendarModel>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showReplaceButton, setShowReplaceButton] = useState(false);
    const [blobToBase64Map, setBlobToBase64Map] = useState<{ [blobUri: string]: string }>({});
    const [uploadImageLoading, setUploadImageLoading] = useState(false);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [uploadFileUrls, setUploadFileUrls] = useState<string[]>([]);

    const [formData, setFormData] = useState(CalendarFormData);

    // useEffect(() => {
    //     // 初始化时设置默认值
    //     Object.keys(formData.fieldSchema).forEach((key) => {
    //         const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
    //         if (uiSchema['ui:widget'] === 'select') {
    //             // 类型保护，确保 uiSchema 具有 ui:options 属性
    //             if ('ui:options' in uiSchema && product) {
    //                 // setValue(
    //                 //     'category',
    //                 //     product['category']
    //                 // );
    //             }
    //         }
    //     });
    // }, [formData, setValue, product]); // 添加依赖项

    useEffect(() => {
        setUploadFiles([]); // 清空上传文件列表
        setValue('category', 'course'); // 默认值为 'course'
        setValue('region', 'hk'); // 默认值为 'mo'
    }, []);

    useEffect(() => {
        if (uploadFiles) {
            setValue('uploadFiles', uploadFiles);
            // console.log('uploadFiles', uploadFiles);
        }
    }, [uploadFiles]);

    useEffect(() => {
        if (uploadFileUrls) {
            setValue('files_url', uploadFileUrls.join(','));
            // console.log('uploadFileUrls', uploadFileUrls);
        }
    }, [uploadFileUrls]);

    useEffect(() => {
        if (product) {
            // console.log('product', product['category']);
            setValue('name', product.name);
            setValue('description', product.description);
            setValue('pre_from_date', product.pre_from_date);
            setValue('pre_to_date', product.pre_to_date);
            setValue('to_date', product.to_date);
            setValue('from_date', product.from_date);
            setValue('image_url', product.image_url);
            setSelectedImage(product.image_url);
            setValue('reference_url', product.reference_url);
            setValue('category', product.category || 'course'); // 默认值为 'course'
            setValue('region', product.region || 'hk'); // 默认值为 'mo'

            setUploadFileUrls(product.files_url ? product.files_url.split(',') : []);
        }
    }, [product]);

    const handleClickFile = (e: any) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const compressImage = async (
        file: File,
        quality = 0.85,
        maxWidth = 1200,
        maxHeight = 1200
    ): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                let { width, height } = img;
                // 限制最大宽高
                if (width > maxWidth || height > maxHeight) {
                    const scale = Math.min(maxWidth / width, maxHeight / height);
                    width = width * scale;
                    height = height * scale;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error('图片压缩失败'));
                    },
                    'image/jpeg', // 你也可以根据 file.type 动态选择
                    quality // 0.8~0.9 通常清晰度和体积都不错
                );
                URL.revokeObjectURL(url);
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadImageLoading(true);

            // 压缩图片
            let compressedFile: Blob;
            try {
                compressedFile = await compressImage(file, 0.85, 1200, 1200); // 你可以调整参数
            } catch (e) {
                setUploadImageLoading(false);
                alert('图片压缩失败');
                return;
            }

            const filePath = `calendar_${Math.random()}-${Date.now()}`;
            const { error: uploadError } = await supabase.storage
                .from('calendars')
                .upload(filePath, compressedFile, {
                    cacheControl: '3600',
                    upsert: true
                });
            setUploadImageLoading(false);
            if (uploadError) throw uploadError;

            // 获取完整的公共 URL
            const imageUrl = getImageUrl(filePath);
            setValue('image_url', imageUrl);
            setSelectedImage(imageUrl);
        }
    };

    // 添加一个函数来获取图片 URL
    const getImageUrl = (path: string | null) => {
        if (!path) return '/default-avatar.png';
        if (path.startsWith('http')) return path;

        const {
            data: { publicUrl }
        } = supabase.storage.from('calendars').getPublicUrl(path);

        return publicUrl;
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
                            initialValue={product?.description || ''}
                            init={{
                                height: 500,
                                menubar: false,
                                entity_encoding: 'raw',
                                verify_html: false,
                                image_title: true,
                                automatic_uploads: true,
                                plugins: [
                                    'autolink',
                                    'link',
                                    'wordcount',
                                    'preview',
                                    'image',
                                    'media'
                                    // 'imagetools'
                                ],
                                toolbar:
                                    'undo redo | blocks | ' +
                                    'bold italic underline forecolor | link image media alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat',
                                file_picker_types: 'image',
                                file_picker_callback: function (cb: any, value: any, meta: any) {
                                    var input = document.createElement('input');
                                    input.setAttribute('type', 'file');
                                    input.setAttribute('accept', 'image/*');

                                    input.onchange = function () {
                                        const inputElement = this as HTMLInputElement;
                                        var file = inputElement.files?.[0];
                                        if (!file) return;

                                        var reader = new FileReader();
                                        reader.onload = function () {
                                            var id = 'blobid' + new Date().getTime();
                                            // 为了解决类型"Window & typeof globalThis"上不存在属性"tinymce"的问题，使用类型断言
                                            var blobCache = (window as any).tinymce.activeEditor
                                                .editorUpload.blobCache;
                                            // 检查 reader.result 是否为 null，若为 null 则使用空字符串代替
                                            var base64 = reader.result
                                                ? reader.result.toString()
                                                : '';
                                            var blobInfo = blobCache.create(id, file, base64);
                                            blobCache.add(blobInfo);

                                            // 保存 blobUri 和 base64 的映射
                                            setBlobToBase64Map((prev) => ({
                                                ...prev,
                                                [blobInfo.blobUri()]: base64
                                            }));

                                            cb(blobInfo.blobUri(), { title: file?.name });
                                            // cb(base64, { title: file?.name });
                                        };
                                        reader.onerror = function () {
                                            console.error('File reading failed');
                                        };
                                        reader.readAsDataURL(file);
                                    };
                                    input.click();
                                },
                                content_style:
                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(content: any, editor: any) => {
                                // 替换所有 blobUri 为 base64
                                let newContent = content;
                                Object.entries(blobToBase64Map).forEach(([blobUri, base64]) => {
                                    newContent = newContent.replaceAll(blobUri, base64);
                                });
                                // 用正则去掉多余的 data:image/jpeg;base64, 前缀，只保留一个
                                newContent = newContent.replace(
                                    /(data:image\/jpeg;base64,)+/g,
                                    'data:image/jpeg;base64,'
                                );
                                setValue(key as keyof CalendarModel, newContent);
                            }}
                        />
                    </div>
                );
            case 'select':
                return (
                    <Select
                        // {...register(key as keyof CalendarModel)}
                        defaultValue={
                            (product?.[key as keyof CalendarModel] as string) ||
                            uiSchema['ui:options']?.enumOptions?.[0]?.value ||
                            ''
                        }
                        allowSearch={false}
                        bgClassName=" bg-white rounded-sm"
                        items={uiSchema['ui:options']?.enumOptions || []}
                        onSelect={(item: Item) => {
                            setValue(key as keyof CalendarModel, item?.value);
                        }}
                    />
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
                                        {uploadImageLoading && (
                                            <div className=" absolute w-full h-full inset-0 z-10 flex flex-col items-center justify-center bg-gray-100/80">
                                                <svg
                                                    className="animate-spin h-8 w-8 text-blue-500 mb-2"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    ></path>
                                                </svg>
                                                <span className="text-blue-500">上載中...</span>
                                            </div>
                                        )}

                                        <p>上傳活動封面</p>
                                        <p className="text-xs">(建議上傳圖片比例5:6,限6M內)</p>
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
                            // {...register(key as keyof CalendarModel)}
                            type="date"
                            defaultValue={
                                (product &&
                                    (product[
                                        uiSchema['ui:keys']?.start_date as keyof CalendarModel
                                    ] as string)) ||
                                ''
                            }
                            required={field.required}
                            className="border p-2 rounded-md"
                            onChange={(e) =>
                                setValue(uiSchema['ui:keys']?.start_date, e.target.value)
                            }
                        />
                        <span>至</span>
                        <input
                            // {...register(key as keyof CalendarModel)}
                            type="date"
                            defaultValue={
                                (product &&
                                    (product[
                                        uiSchema['ui:keys']?.end_date as keyof CalendarModel
                                    ] as string)) ||
                                ''
                            }
                            required={field.required}
                            className="border p-2 rounded-md"
                            onChange={(e) =>
                                setValue(uiSchema['ui:keys']?.end_date, e.target.value)
                            }
                        />
                    </div>
                );
            case 'upload':
                return (
                    <RunBatch
                        {...register(key as keyof CalendarModel)}
                        uploadFileUrls={uploadFileUrls || []}
                        setUploadFileUrls={setUploadFileUrls}
                        setUploadFiles={setUploadFiles}
                    />
                );
            default:
                return null;
        }
    };

    const onSubmit = (data: any) => {
        console.log('data calendar ', data);

    }

    return (
        <>
            <FormDetailView
                formData={formData}
                disabled={submitting}
                onSubmit={submit}
            />

            {/* <form onSubmit={handleSubmit(submit)} className="w-full overflow-auto">
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
            </form> */}
        </>
    );
}

export default CalendarEditForm;
