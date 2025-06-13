import Select, { Item } from '@/app/components/base/select';
import { Button } from '@mui/joy';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import FormEditor from './FormEditor';
import FormFile from './FormImage';
import FormRadio from './FormRadio';

// 泛型接口
interface ViewProps<T extends FieldValues = any> {
    submitting?: boolean;
    submit: (formData: T) => void;
    formFieldData: any;
}

export default function MyForm<T extends FieldValues = any>(props: ViewProps<T>) {
    const { formFieldData, submitting, submit } = props;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<T>();

    const renderField = (key: string, field: any, uiSchema: any) => {
        switch (uiSchema['ui:widget']) {
            case 'textarea':
                return (
                    <textarea
                        {...register(key as unknown as import('react-hook-form').Path<T>)}
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md min-h-[200px]"
                    />
                );
            case 'editor':
                return (
                    <>
                        <FormEditor
                            {...register(key as unknown as import('react-hook-form').Path<T>)}
                            key={key}
                            setValue={(content: any) => {
                                setValue(
                                    key as unknown as import('react-hook-form').Path<T>,
                                    content
                                );
                            }}
                        />
                    </>
                );
            case 'select':
                return (
                    <Select
                        // {...register(key as keyof CalendarModel)}
                        defaultValue={''}
                        allowSearch={false}
                        bgClassName=" bg-white rounded-sm"
                        items={uiSchema['ui:options']?.enumOptions || []}
                        onSelect={(item: Item) => {
                            setValue(
                                key as unknown as import('react-hook-form').Path<T>,
                                item?.value as any
                            );
                        }}
                    />
                );
            case 'file':
                return (
                    <>
                        <FormFile
                            {...register(key as unknown as import('react-hook-form').Path<T>)}
                            key_url={'cover_url'}
                            setValue={setValue}
                        />
                    </>
                );
            case 'radio':
                return (
                    <FormRadio
                        {...register(key as unknown as import('react-hook-form').Path<T>)}
                        setValue={setValue}
                    />
                );
            default:
                return (
                    <>
                        <input
                            {...register(key as unknown as import('react-hook-form').Path<T>)}
                            type={uiSchema['ui:widget']}
                            required={field.required}
                            placeholder={field.title}
                            className="border p-2 w-full rounded-md"
                        />
                    </>
                );
        }
    };
    return (
        <form onSubmit={handleSubmit(submit)} className="w-full overflow-auto">
            {Object.keys(formFieldData.fieldSchema).map((key) => {
                const field = formFieldData.fieldSchema[key];
                const uiSchema = formFieldData.uiSchema[key];
                return (
                    <div key={key} className="mb-4">
                        <p className=" font-medium text-sm">
                            {field.title} <span className="text-sm text-gray-400">{field.tip}</span>
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
    );
}
