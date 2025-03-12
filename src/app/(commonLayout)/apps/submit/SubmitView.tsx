import { AppModel } from '@/hooks/useAppsData';
import { AppFormData } from '@/utils/constant';
import { Button, Input } from '@mui/joy';
import { useState } from 'react';
import { useForm } from 'react-hook-form'; // 导入 useForm

interface ViewProps {
    data: AppModel | undefined;
    submitting?: boolean;
    onSubmit?: any;
    fetchWebsiteMetadata?: any;
}

function SubmitView(props: ViewProps) {
    const { data, submitting, onSubmit, fetchWebsiteMetadata } = props;
    const formData = AppFormData;
    const [loading, setLoading] = useState(false)
    const { register, reset, handleSubmit, setValue, getValues } = useForm<AppModel>(); // 初始化 useForm
    const submit = (formData: AppModel) => {
        // 处理表单提交
        console.log(formData);
        if (onSubmit) {
            onSubmit(formData);
        }
        reset(); // 提交后清空表单
    };


    const renderField = (key: string, field: any, uiSchema: any) => {
        switch (uiSchema['ui:widget']) {
            case 'text':
                return (
                    <input
                        {...register(key as keyof AppModel)}
                        type="text"
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md"
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        {...register(key as keyof AppModel)}
                        required={field.required}
                        placeholder={field.title}
                        className="border p-2 w-full rounded-md min-h-[100px]"
                    />
                );
            case 'select':
                return (
                    <select
                        {...register(key as keyof AppModel)}
                        required={field.required}
                        className="border p-2 w-full rounded-md"
                    >
                        {uiSchema['ui:options']?.enumOptions?.map((option: string) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'link':
                return (
                    <Input
                        // sx={{ '--Input-decoratorChildHeight': '45px' }}
                        {...register(key as keyof AppModel)}
                        required={field.required}
                        placeholder={field.title}
                        // className="border p-2 w-full rounded-md"
                        endDecorator={
                            <Button
                                variant="solid"
                                color="primary"
                                loading={loading}
                                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                onClick={async () => {
                                    const url = getValues(key as keyof AppModel); // 获取当前input的值
                                    if (url && fetchWebsiteMetadata) {
                                        setLoading(true)
                                        const res = await fetchWebsiteMetadata(url);
                                        setLoading(false)
                                        if (res && res.status) {
                                            if (!res.data.title) {
                                                alert('获取网站信息失败，请手动填写')
                                                return
                                            }
                                            // console.log('data', res.data);
                                            setValue('title', res.data.title); // 设置标题
                                            setValue('description', res.data.description); // 设置描述
                                        }

                                    }
                                }}
                            >
                                一键填写
                            </Button>
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="w-full justify-center flex flex-row px-2 sm:px-8 py-2 sm:py-4 overflow-y-auto">
                <div className=" max-w-4xl flex flex-col space-y-4">
                    <div className="w-full ">
                        <p className=" font-semibold text-xl">收录、投稿须知</p>
                    </div>
                    <div
                        className="whitespace-pre-wrap bg-white rounded-md p-4"
                        dangerouslySetInnerHTML={{
                            __html: `本站 <span class="text-xl font-semibold text-red-600">免费收录</span> 各类正规AI产品工具，欢迎提交AI产品工具相关站点、文章，一起学习共同进步。🤝

🔍 提交前：

    请先在我们网站内搜一下您的产品名（或网站域名），如已收录无需二次提交，以免重复收录对用户造成困惑。

💘 审核中：

    网站提交后一般会在24小时内进行审核及发布，部分符合要求的站点会在本站栏目位进行展示。

📮 收录后：

    收录之后如果您产品网站有重大更新，可在该产品详情页进行评论说明。`
                        }}
                    />
                    <div className="w-full ">
                        <p className=" font-semibold text-xl">AI 工具资料</p>
                    </div>
                    <div className=" bg-white p-4 rounded-md">
                        <form onSubmit={handleSubmit(submit)}>
                            {' '}
                            {/* 添加 onSubmit 处理 */}
                            {Object.keys(formData.fieldSchema).map((key) => {
                                const field =
                                    formData.fieldSchema[key as keyof typeof formData.fieldSchema];
                                const uiSchema =
                                    formData.uiSchema[key as keyof typeof formData.uiSchema];
                                return (
                                    <div key={key} className="mb-4">
                                        <label>{field.title}</label>
                                        {renderField(key, field, uiSchema)}
                                    </div>
                                );
                            })}
                            <div className='flex flex-row items-center space-x-2'>
                                <span>选择Logo: </span>
                                <img src='../logo/docai.png' className='w-8 rounded-full' alt='docai.png'
                                    onClick={() => {
                                        setValue('img_src', './logo/docai.png')
                                    }} />
                                <img src='../logo/youtube.png' className='w-8 rounded-full' alt='youtube.png'
                                    onClick={() => {
                                        setValue('img_src', './logo/youtube.png')
                                    }} />
                                <img src='../logo/other.png' className='w-8 rounded-full' alt='other.png'
                                    onClick={() => {
                                        setValue('img_src', './logo/other.png')
                                    }} />
                            </div>
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
                </div>
            </div>
        </>
    );
}

export default SubmitView;
