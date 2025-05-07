import { PromptModel } from '@/hooks/usePromptData';
import { PromptFormData } from '@/utils/formData';
import { Box, Button, Chip, Option, Select } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ViewProps {
    prompt: PromptModel | null;
    submit: (formData: PromptModel) => void;
}

function HotsEditForm(props: ViewProps) {
    const { prompt, submit } = props;
    const formData = PromptFormData;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<PromptModel>();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // 初始化时设置默认值
        Object.keys(formData.fieldSchema).forEach((key) => {
            const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
            if (uiSchema['ui:widget'] === 'select') {
                // 类型保护，确保 uiSchema 具有 ui:options 属性
                if ('ui:options' in uiSchema && uiSchema['ui:options']?.enumOptions) {
                    setValue(key as keyof PromptModel, uiSchema['ui:options'].enumOptions[0]);
                }
            }
            if (uiSchema['ui:widget'] === 'tag') {
                // 类型保护，确保 uiSchema 具有 ui:options 属性
                if ('ui:options' in uiSchema && uiSchema['ui:options']?.enumOptions) {
                    setValue(key as keyof PromptModel, [uiSchema['ui:options'].enumOptions[0]]);
                }
            }
        });
    }, [formData, setValue, prompt]); // 添加依赖项

    useEffect(() => {
        if (prompt) {
            console.log(prompt);

            setValue('title', prompt.title);
            setValue('description', prompt.description);
            setValue('prompt', prompt.prompt);
        }
    }, [prompt]);

    const renderField = (key: string, field: any, uiSchema: any) => {
        switch (uiSchema['ui:widget']) {
            case 'text':
                return (
                    <input
                        {...register(key as keyof PromptModel)}
                        type="text"
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md"
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        {...register(key as keyof PromptModel)}
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md min-h-[200px]"
                    />
                );
            case 'select':
                return (
                    <Select
                        {...register(key as keyof PromptModel)}
                        required={field.required}
                        multiple
                        defaultValue={[
                            uiSchema['ui:options']?.enumOptions &&
                                uiSchema['ui:options']?.enumOptions[0]
                        ]}
                        onChange={(event, value) => {
                            // 处理选择变化
                            setValue(key as keyof PromptModel, value.toString());
                        }}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                {selected.map((selectedOption, index: number) => (
                                    <Chip key={index} variant="soft" color="primary">
                                        {selectedOption.label}
                                    </Chip>
                                ))}
                            </Box>
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
            case 'tag':
                return (
                    <Select
                        {...register(key as keyof PromptModel)}
                        required={field.required}
                        multiple
                        defaultValue={[
                            uiSchema['ui:options']?.enumOptions &&
                                uiSchema['ui:options']?.enumOptions[0]
                        ]}
                        onChange={(event, value) => {
                            // 处理选择变化
                            setValue(key as keyof PromptModel, value);
                        }}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                {selected.map((selectedOption, index: number) => (
                                    <Chip key={index} variant="soft" color="primary">
                                        {selectedOption.label}
                                    </Chip>
                                ))}
                            </Box>
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
                        {uiSchema['ui:options']?.enumOptions?.map((option: any, index: number) => (
                            <Option key={index} value={option}>
                                {option?.name}
                            </Option>
                        ))}
                    </Select>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className=" overflow-auto">
                {Object.keys(formData.fieldSchema).map((key) => {
                    const field = formData.fieldSchema[key as keyof typeof formData.fieldSchema];
                    const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
                    return (
                        <div key={key} className="mb-4">
                            <label className=" font-medium text-sm">{field.title}</label>
                            <p className="text-sm text-gray-400">{field.tip}</p>
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

export default HotsEditForm;
