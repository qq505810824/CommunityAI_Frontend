import { AccountModel } from '@/models/Account';
import { AccountFormData } from '@/utils/formData';
import { Button } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ViewProps {
    account: AccountModel | null;
    submit: (formData: AccountModel) => void;
}

function AccountEditForm(props: ViewProps) {
    const { account, submit } = props;
    const formData = AccountFormData;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<AccountModel>();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // 初始化时设置默认值
        Object.keys(formData.fieldSchema).forEach((key) => {
            const uiSchema = formData.uiSchema[key as keyof typeof formData.uiSchema];
            if (uiSchema['ui:widget'] === 'text') {
                setValue(key as keyof AccountModel, account?.[key as keyof AccountModel]);
            }
        });
    }, [formData, setValue]); // 添加依赖项

    useEffect(() => {
        if (account) {
            setValue('name', account.name);
            setValue('nickname', account.nickname);
            setValue('email', account.email);
            setValue('avatar', account.avatar);
        }
    }, [account]);

    const renderField = (key: string, field: any, uiSchema: any) => {
        switch (uiSchema['ui:widget']) {
            case 'text':
                return (
                    <input
                        {...register(key as keyof AccountModel)}
                        type="text"
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md"
                    />
                );
            case 'password':
                return (
                    <input
                        {...register(key as keyof AccountModel)}
                        type="password"
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md"
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        {...register(key as keyof AccountModel)}
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md min-h-[200px]"
                    />
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

export default AccountEditForm;
