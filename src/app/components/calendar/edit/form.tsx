import { CalendarModel } from '@/hooks/useCalendarData';
import { CalendarFormData } from '@/utils/formData';
import { Box, Button, Option, Select } from '@mui/joy';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ViewProps {
    product: CalendarModel | null;
    submit: (formData: CalendarModel) => void;
}

function CalendarEditForm(props: ViewProps) {
    const { product, submit } = props;
    const formData = CalendarFormData;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<CalendarModel>();
    const [submitting, setSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showReplaceButton, setShowReplaceButton] = useState(false);

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
            case 'textarea':
                return (
                    <textarea
                        {...register(key as keyof CalendarModel)}
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md min-h-[200px]"
                    />
                );
            case 'select':
                return (
                    <Select
                        {...register(key as keyof CalendarModel)}
                        required={field.required}
                        defaultValue={[
                            uiSchema['ui:options']?.enumOptions &&
                                uiSchema['ui:options']?.enumOptions[0]
                        ]}
                        onChange={(event, value) => {
                            // 处理选择变化
                            setValue(key as keyof CalendarModel, value?.toString());
                        }}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: '0.25rem' }}>{selected?.label}</Box>
                        )}
                        sx={{ minWidth: '15rem' }}
                        slotProps={{
                            listbox: {
                                sx: {
                                    width: '100%'
                                }
                            }
                        }}
                    >
                        {uiSchema['ui:options']?.enumOptions?.map((option: string) => (
                            <Option key={option} value={option}>
                                {option}
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
                            onChange={(e) => setValue('from_date', e.target.value)}
                        />
                        <span>至</span>
                        <input
                            type="date"
                            required={field.required}
                            className="border p-2 rounded-md"
                            onChange={(e) => setValue('to_date', e.target.value)}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="w-full overflow-auto">
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
