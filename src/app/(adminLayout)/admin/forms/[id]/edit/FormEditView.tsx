
import { useState } from 'react';
// import Form from '@rjsf/core';
import {
    ChakraProvider
} from '@chakra-ui/react';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { Editor } from '@tinymce/tinymce-react';
import { ChevronLeft, PlusCircle, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FormField } from './FormEditContainer';

interface ViewProps {
    formTitle: string
    setFormTitle: any;
    isActive: boolean
    setIsActive: any
    generateSchemas: any;
    meta: any;
    setMeta: any;
    formDescription: string;
    setFormDescription: any;
    fields: FormField[],
    setFields: any;
    handleSave: any;
    submitting: boolean

}

function FormSubmissionsView(props: ViewProps) {
    const {
        formTitle,
        setFormTitle,
        isActive,
        setIsActive,
        generateSchemas,
        meta,
        setMeta,
        formDescription,
        setFormDescription,
        fields,
        setFields,
        handleSave,
        submitting
    } =
        props;
    const params = useParams();
    const [showFormDetails, setShowFormDetails] = useState(false);
    const router = useRouter();

    const addField = () => {
        setFields([
            ...fields,
            {
                title: '',
                display_title: '',
                type: 'string',
                required: false,
                widget: 'text'
            }
        ]);
    };

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const updateField = (index: number, updates: Partial<FormField>) => {
        setFields(fields.map((field, i) => (i === index ? { ...field, ...updates } : field)));
    };

    const getTypeForWidget = (widget: string) => {
        switch (widget) {
            case 'number':
            case 'range':
                return 'number';
            case 'checkboxes':
                return 'array';
            case 'select':
                return 'array';
            case 'radio':
                return 'string';
            default:
                return 'string';
        }
    };

    return (
        <ChakraProvider>
            <div className="container mx-auto p-4">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => router.back()}
                        className="mr-4 hover:text-gray-600 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold">編輯表單</h1>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded shadow">
                            <div className="flex justify-between items-center mb-4">
                                <input
                                    type="text"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    className="w-full text-xl font-bold mb-2 p-2 border rounded"
                                    placeholder="表單標題"
                                />
                                <label className="flex items-center cursor-pointer ml-4">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">啟用表單</span>
                                </label>
                            </div>
                            <input
                                type="text"
                                value={meta?.display?.title || ''}
                                onChange={(e) => setMeta({
                                    ...meta,
                                    display: {
                                        ...meta?.display,
                                        title: e.target.value
                                    }
                                })}
                                className="w-full text-xl font-bold mb-2 p-2 border rounded"
                                placeholder="副標題"
                            />
                            <textarea
                                value={formDescription}
                                onChange={(e) => setFormDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="表單描述"
                                rows={3}
                            />
                            <p>表單簡介</p>
                            <Editor
                                id='description'
                                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                value={meta?.display?.description || ''}
                                init={{
                                    height: 400,
                                    menubar: true,
                                    plugins: [
                                        'advlist',
                                        'autolink',
                                        'lists',
                                        'link',
                                        'image',
                                        'charmap',
                                        'preview',
                                        'anchor',
                                        'searchreplace',
                                        'visualblocks',
                                        'code',
                                        'fullscreen',
                                        'insertdatetime',
                                        'media',
                                        'table',
                                        'help',
                                        'wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style:
                                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={(content: string) => {
                                    setMeta({
                                        ...meta,
                                        display: {
                                            ...meta?.display,
                                            description: content
                                        }
                                    })
                                }}
                            />
                        </div>

                        {fields.map((field, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow relative">
                                <button
                                    onClick={() => removeField(index)}
                                    className="absolute top-2 right-2 text-red-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={field.title}
                                        onChange={(e) =>
                                            updateField(index, { title: e.target.value })
                                        }
                                        className="w-full p-2 border rounded"
                                        placeholder="欄位標識符 (例如: first_name)"
                                    />
                                    <input
                                        type="text"
                                        value={field.display_title}
                                        onChange={(e) =>
                                            updateField(index, { display_title: e.target.value })
                                        }
                                        className="w-full p-2 border rounded"
                                        placeholder="顯示標題 (例如: First Name 名字)"
                                    />
                                    <select
                                        value={field.widget}
                                        onChange={(e) =>
                                            updateField(index, {
                                                widget: e.target.value as any,
                                                type: getTypeForWidget(e.target.value)
                                            })
                                        }
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="text">文字輸入</option>
                                        <option value="textarea">多行文字</option>
                                        <option value="select">下拉選項</option>
                                        <option value="number">數字</option>
                                        <option value="date">日期</option>
                                        <option value="time">時間</option>
                                        <option value="datetime">日期時間</option>
                                        <option value="email">電子郵件</option>
                                        <option value="radio">單選按鈕</option>
                                        <option value="checkboxes">多選框</option>
                                        <option value="file">文件</option>
                                    </select>

                                    {['radio', 'checkboxes', 'select'].includes(field.widget || '') && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">
                                                    選項列表
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newOptions = [
                                                            ...(field.options || []),
                                                            {
                                                                id: Math.random()
                                                                    .toString(36)
                                                                    .substr(2, 9),
                                                                value: ''
                                                            }
                                                        ];
                                                        updateField(index, { options: newOptions });
                                                    }}
                                                    className="text-blue-500 text-sm hover:text-blue-600"
                                                >
                                                    + 添加選項
                                                </button>
                                            </div>
                                            {field.options?.map((option, optionIndex) => (
                                                <div
                                                    key={option.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <input
                                                        type="text"
                                                        value={option.value}
                                                        onChange={(e) => {
                                                            const newOptions = field.options?.map(
                                                                (opt, idx) =>
                                                                    idx === optionIndex
                                                                        ? {
                                                                            ...opt,
                                                                            value: e.target.value
                                                                        }
                                                                        : opt
                                                            );
                                                            updateField(index, {
                                                                options: newOptions
                                                            });
                                                        }}
                                                        className="flex-1 p-2 border rounded"
                                                        placeholder={`選項 ${optionIndex + 1}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newOptions =
                                                                field.options?.filter(
                                                                    (_, idx) => idx !== optionIndex
                                                                );
                                                            updateField(index, {
                                                                options: newOptions
                                                            });
                                                        }}
                                                        className="text-red-500 hover:text-red-600"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={field.required}
                                            onChange={(e) =>
                                                updateField(index, { required: e.target.checked })
                                            }
                                            className="mr-2"
                                        />
                                        必填欄位
                                    </label>

                                    {field.widget === 'number' && (
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-sm text-gray-600">
                                                    最小值
                                                </label>
                                                <input
                                                    type="number"
                                                    value={field.minimum || ''}
                                                    onChange={(e) =>
                                                        updateField(index, {
                                                            minimum: e.target.value
                                                                ? Number(e.target.value)
                                                                : undefined
                                                        })
                                                    }
                                                    className="w-full p-2 border rounded"
                                                    placeholder="最小值"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">
                                                    最大值
                                                </label>
                                                <input
                                                    type="number"
                                                    value={field.maximum || ''}
                                                    onChange={(e) =>
                                                        updateField(index, {
                                                            maximum: e.target.value
                                                                ? Number(e.target.value)
                                                                : undefined
                                                        })
                                                    }
                                                    className="w-full p-2 border rounded"
                                                    placeholder="最大值"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addField}
                            className="w-full p-4 border-2 border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
                        >
                            <PlusCircle className="w-6 h-6 mr-2" />
                            添加新欄位
                        </button>

                        <div className="fixed bottom-6 right-6">
                            <button
                                onClick={handleSave}
                                disabled={submitting}
                                className={`bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center ${submitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        保存中...
                                    </>
                                ) : (
                                    <>保存表單</>
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl mb-2">表單預覽</h2>
                        <Form
                            schema={generateSchemas().jsonSchema}
                            uiSchema={generateSchemas().uiSchema}
                            validator={validator}
                            disabled={submitting}
                        />
                    </div>
                </div>
            </div>
        </ChakraProvider>
    )
}


export default FormSubmissionsView;
