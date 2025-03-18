import useAlert from '@/hooks/useAlert';
import { PromptModel, usePromptOperations } from '@/hooks/usePromptData';
import { PromptFormData } from '@/utils/formData';
import Add from '@mui/icons-material/Add';
import { Box, Chip, ModalClose, Option, Select } from '@mui/joy';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// 添加一个新的 props 来接收更新函数
interface CreatePromptModalProps {
    onClose: () => void; // 新增的关闭回调
}

export default function CreatePromptModal({ onClose }: CreatePromptModalProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const formData = PromptFormData;
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { addPrompt } = usePromptOperations();
    const { register, reset, handleSubmit, setValue, getValues } = useForm<PromptModel>(); // 初始化 useForm

    useEffect(() => {
        // 初始化时设置默认值
        Object.keys(formData.fieldSchema).forEach((key) => {
            const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
            if (uiSchema['ui:widget'] === 'select' || uiSchema['ui:widget'] === 'tag') {
                // 类型保护，确保 uiSchema 具有 ui:options 属性
                if ('ui:options' in uiSchema && uiSchema['ui:options']?.enumOptions) {
                    setValue(key as keyof PromptModel, uiSchema['ui:options'].enumOptions[0]);
                }
            }
        });
    }, [formData, setValue]); // 添加依赖项

    const submit = async (formData: PromptModel) => {
        // 处理表单提交
        console.log(formData);
        const newFormData = {
            ...formData,
            user: localStorage?.getItem('user_id') || ''
        };
        setSubmitting(true);
        try {
            const { data, error } = await addPrompt(newFormData);
            if (error) {
                setAlert({
                    title: '创建文章失败！',
                    type: 'error'
                });
            } else {
                router.push('/prompts');
                setAlert({
                    title: '文章创建成功！',
                    type: 'success'
                });
            }
            setOpen(false);
            onClose(); // 调用关闭回调以更新 prompts
        } catch (error) {
            setAlert({
                title: '文章创建失败！',
                type: 'error'
            });
            console.error('创建文章错误:', error);
        } finally {
            setSubmitting(false);
        }
    };

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
                        className="border p-2 w-full rounded-md min-h-[100px]"
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
        <React.Fragment>
            {/* <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                New project
            </Button> */}
            <Chip
                size="lg"
                variant="outlined"
                color="danger"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                New project
            </Chip>

            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    onClose();
                }}
                sx={{}}
            >
                <ModalDialog size="md">
                    <ModalClose />
                    <DialogTitle>Create new Prompt</DialogTitle>
                    {/* <DialogContent>Fill in the information of the projectFill </DialogContent> */}
                    <form onSubmit={handleSubmit(submit)} className=" overflow-auto">
                        {' '}
                        {/* 添加 onSubmit 处理 */}
                        {Object.keys(formData.fieldSchema).map((key) => {
                            const field =
                                formData.fieldSchema[key as keyof typeof formData.fieldSchema];
                            const uiSchema =
                                formData.uiSchema[key as keyof typeof formData.uiSchema];
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
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
