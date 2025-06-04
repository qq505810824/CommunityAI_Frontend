'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormEditView from './FormEditView';

export interface FormField {
    title: string;
    display_title: string;
    type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'null';
    required: boolean;
    options?: { id: string; value: string }[];
    widget?:
    | 'text'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkboxes'
    | 'date'
    | 'time'
    | 'datetime'
    | 'email'
    | 'password'
    | 'number'
    | 'range'
    | 'file';
    format?: 'date' | 'time' | 'date-time' | 'email' | 'string' | 'uri' | 'uuid';
    minimum?: number;
    maximum?: number;
}

interface EmailTemplate {
    name: string;
    subject: string;
    html_content: string;
    placeholders: string[];
}


const DEFAULT_EMAIL_TEMPLATES = {
    default: {
        name: '基本模板',
        subject: 'HKU Information Day 報名確認',
        html_content: `
            <h1>活動報名確認</h1>
            <div class="section">
                <p>親愛的 {{salutation}} {{last_name}} {{first_name}}：</p>
                <p>感謝您報名參加 HKU Information Day！</p>
            </div>
            <div class="section">
                <p>以下是您的報名詳情：</p>
                <ul>
                    <li>稱謂：{{salutation}}</li>
                    <li>姓名：{{last_name}} {{first_name}}</li>
                    <li>電郵：{{email}}</li>
                    <li>手機：{{mobile_number}}</li>
                    <li>身份：{{role}}</li>
                </ul>
            </div>
            <div class="section">
                <p>活動當天請出示隨附的 QR Code 進行簽到。</p>
                <p>如有任何疑問，請電郵至 info@example.com。</p>
            </div>
            <div class="footer">
                <p>香港大學招生處</p>
            </div>
        `
    },
    reminder: {
        name: '活動提醒模板',
        subject: 'HKU Information Day 活動提醒',
        html_content: `
            <h1>活動提醒通知</h1>
            <div class="section">
                <p>親愛的 {{salutation}} {{last_name}} {{first_name}}：</p>
                <p>提醒您，您報名參加的 HKU Information Day 將於明天舉行。</p>
            </div>
            <div class="section">
                <p>活動詳情：</p>
                <ul>
                    <li>日期：2024年11月9日（星期六）</li>
                    <li>時間：9:00am-6:00pm</li>
                    <li>地點：澳門得勝馬路廿八號陳瑞祺永援中學</li>
                </ul>
            </div>
            <div class="section">
                <p>請記得攜帶您的 QR Code 進行簽到。</p>
                <p>如有任何疑問，請電郵至 info@example.com。</p>
            </div>
            <div class="footer">
                <p>香港大學招生處</p>
            </div>
        `
    }
};


function FormEditContainer() {

    const router = useRouter();
    const params = useParams();
    const [submitting, setSubmitting] = useState(false);
    const [formTitle, setFormTitle] = useState('新表單');
    const [formDescription, setFormDescription] = useState('');
    const [fields, setFields] = useState<FormField[]>([]);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({
        name: DEFAULT_EMAIL_TEMPLATES.default.name,
        subject: DEFAULT_EMAIL_TEMPLATES.default.subject,
        html_content: DEFAULT_EMAIL_TEMPLATES.default.html_content,
        placeholders: []
    });
    const [showEmailEditor, setShowEmailEditor] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<string>('default');
    const [loading, setLoading] = useState<boolean>(true);
    const [meta, setMeta] = useState({
        display: {
            title: '',
            description: ''
        }
    })
    useEffect(() => {
        fetchFormDataById();
    }, [params]);

    const fetchFormDataById = async () => {
        setLoading(true);
        const formId = params['id'] || process.env.NEXT_PUBLIC_FORM_ID;
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/forms/${formId}`
            // `/api/admin/forms/${formId}`
        );
        setLoading(false);
        // console.log('response', response.data);

        if (response.data.success) {
            initForm(response.data.form)

            // setFormData(response.data.form);
        } else {
            alert(response.data.error?.toString() || 'error');
        }
    };

    const initForm = (form: any) => {
        setFormTitle(form.name || '');
        setFormDescription(form.description || '');
        setIsActive(form.is_active || false);
        setEmailEnabled(form.email_enabled || false);
        setMeta(form?.meta)

        // 解析 fields，按 display_order 排序
        if (form.json_schema && form.json_schema.properties) {
            const properties = form.json_schema.properties;
            const displayOrder: string[] = form.display_order || Object.keys(properties);

            const fields: FormField[] = displayOrder.map((key: string) => {
                const value = properties[key];
                const widget = form.ui_schema?.[key]?.['ui:widget'] || 'text';

                // 检查是否为多选（array + enum）
                if (value?.type === 'array' && value?.items?.enum) {
                    return {
                        title: key,
                        display_title: value?.title || '',
                        type: 'array',
                        required: (form.json_schema.required || []).includes(key),
                        widget: form.ui_schema?.[key]?.['ui:widget'] || 'checkboxes',
                        options: value.items.enum.map((v: string, idx: number) => ({
                            id: `${key}_opt_${idx}`,
                            value: v
                        }))
                    };
                }
                // 单选下拉（select）
                if (widget === 'select' && value?.enum) {
                    return {
                        title: key,
                        display_title: value?.title || '',
                        type: 'string',
                        required: (form.json_schema.required || []).includes(key),
                        widget: 'select',
                        options: value.enum.map((v: string, idx: number) => ({
                            id: `${key}_opt_${idx}`,
                            value: v
                        }))
                    };
                }


                return {
                    title: key,
                    display_title: value?.title || '',
                    type: value?.type || 'string',
                    required: (form.json_schema.required || []).includes(key),
                    widget,
                    options: value?.enum
                        ? value?.enum.map((v: string, idx: number) => ({
                            id: `${key}_opt_${idx}`,
                            value: v
                        }))
                        : undefined,
                    minimum: value?.minimum,
                    maximum: value?.maximum
                };
            });
            setFields(fields);
        }

        // 邮件模板初始化（如有）
        if (form.email_template) {
            setEmailTemplate({
                name: form.email_template.name || '',
                subject: form.email_template.subject || '',
                html_content: form.email_template.html_content || '',
                placeholders: form.email_template.placeholders || []
            });
        }
    }

    // 當表單欄位更新時，自動更新可用的變數列表
    useEffect(() => {
        if (emailEnabled) {
            const newPlaceholders = fields
                .map((field) => field.title.toLowerCase().replace(/\s+/g, '_'))
                .filter((fieldId) => fieldId.trim() !== '');
            setEmailTemplate((prev) => ({
                ...prev,
                placeholders: newPlaceholders
            }));
        }
    }, [fields, emailEnabled]);

    // 確保初始模板載入
    useEffect(() => {
        const template =
            DEFAULT_EMAIL_TEMPLATES[selectedTemplate as keyof typeof DEFAULT_EMAIL_TEMPLATES];
        setEmailTemplate((prev) => ({
            ...prev,
            name: template.name,
            subject: template.subject,
            html_content: template.html_content
        }));
    }, [selectedTemplate]);

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

    const getFormatForWidget = (widget: string) => {
        switch (widget) {
            case 'date':
                return 'date';
            case 'time':
                return 'time';
            case 'datetime':
                return 'date-time';
            case 'email':
                return 'email';
            default:
                return undefined;
        }
    };

    const generateSchemas = () => {
        const jsonSchema: any = {
            type: 'object',
            title: formTitle,
            description: formDescription,
            properties: {},
            required: []
        };

        const uiSchema: any = {};
        const displayOrder: string[] = [];
        const orderedProperties: { [key: string]: any } = {};

        // 直接使用fields數組的順序
        fields.forEach((field) => {
            const fieldId = field.title.toLowerCase().replace(/\s+/g, '_');
            displayOrder.push(fieldId);
        });

        // 設置 ui:order 來控制欄位順序
        uiSchema['ui:order'] = displayOrder;

        fields.forEach((field) => {
            const fieldId = field.title.toLowerCase().replace(/\s+/g, '_');

            if (field.widget === 'checkboxes') {
                orderedProperties[fieldId] = {
                    type: 'array',
                    title: field.display_title,
                    items: {
                        type: 'string',
                        enum: field.options?.map((opt) => opt.value) || []
                    },
                    uniqueItems: true
                };
                uiSchema[fieldId] = {
                    'ui:widget': 'checkboxes'
                };
            } else {
                orderedProperties[fieldId] = {
                    type: field.type,
                    title: field.display_title
                };

                if (field.widget === 'number') {
                    if (field.minimum !== undefined) {
                        orderedProperties[fieldId].minimum = field.minimum;
                    }
                    if (field.maximum !== undefined) {
                        orderedProperties[fieldId].maximum = field.maximum;
                    }
                    uiSchema[fieldId] = {
                        'ui:widget': 'updown'
                    };
                } else if (field.widget === 'radio') {
                    orderedProperties[fieldId].enum = field.options?.map((opt) => opt.value) || [];
                    uiSchema[fieldId] = {
                        'ui:widget': 'radio'
                    };
                } else if (field.widget === 'select') {
                    orderedProperties[fieldId].enum = field.options?.map((opt) => opt.value) || [];
                    uiSchema[fieldId] = {
                        'ui:widget': 'select'
                    };
                } else if (field.widget) {
                    uiSchema[fieldId] = {
                        'ui:widget': field.widget
                    };
                }
            }

            if (field.required) {
                jsonSchema.required.push(fieldId);
            }
        });

        // 將有序的properties賦值給jsonSchema
        jsonSchema.properties = orderedProperties;

        // 打印表單數據以便調試
        // console.log('Form Data:', {
        //     displayOrder,
        //     jsonSchema: {
        //         ...jsonSchema,
        //         properties: Object.keys(jsonSchema.properties)
        //     },
        //     uiSchema: {
        //         ...uiSchema,
        //         'ui:order': uiSchema['ui:order']
        //     }
        // });

        return { jsonSchema, uiSchema, displayOrder };
    };

    const handleSave = async () => {
        if (!formTitle.trim()) {
            alert('請輸入表單標題');
            return;
        }

        if (fields.length === 0) {
            alert('請至少添加一個表單欄位');
            return;
        }

        // 檢查所有欄位是否都有標題
        const emptyTitleField = fields.find((field) => !field.title.trim());
        if (emptyTitleField) {
            alert('所有欄位都必須有標題');
            return;
        }

        // 如果啟用了郵件功能，檢查必要欄位
        if (emailEnabled) {
            if (!emailTemplate.subject.trim()) {
                alert('請輸入郵件主題');
                return;
            }
            if (!emailTemplate.html_content.trim()) {
                alert('請輸入郵件內容');
                return;
            }
        }

        setSubmitting(true);
        try {
            const { jsonSchema, uiSchema, displayOrder } = generateSchemas();

            // 按照fields的順序生成form_data
            const formData: { [key: string]: string } = {};
            fields.forEach((field) => {
                const fieldId = field.title.toLowerCase().replace(/\s+/g, '_');
                formData[fieldId] = '';
            });

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/forms/${params['id']}`,
                // `/api/admin/forms/${params['id']}`,
                {
                    form: {
                        name: formTitle,
                        description: formDescription,
                        json_schema: jsonSchema,
                        ui_schema: uiSchema,
                        display_order: displayOrder,
                        email_enabled: emailEnabled,
                        is_active: isActive,
                        form_data: formData,
                        meta: meta,
                        ...(emailEnabled && {
                            email_template_attributes: {
                                name: emailTemplate.name,
                                subject: emailTemplate.subject,
                                html_content: emailTemplate.html_content,
                                placeholders: emailTemplate.placeholders
                            }
                        })
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
                    }
                }
            );

            if (response.data.success) {
                alert('表單更新成功！');
                router.back()
            }
        } catch (error: any) {
            console.error('更新表單錯誤:', error);
            alert(error.response?.data?.error || '更新失敗，請稍後再試。');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditorChange = (content: string) => {
        setEmailTemplate((prev) => ({
            ...prev,
            html_content: content
        }));
    };

    const handlePreview = () => {
        // 替換預覽內容中的變數為示例值
        let previewHtml = emailTemplate.html_content;
        emailTemplate.placeholders.forEach((placeholder) => {
            const exampleValue = getExampleValue(placeholder);
            previewHtml = previewHtml.replace(new RegExp(`{{${placeholder}}}`, 'g'), exampleValue);
        });
        setPreviewContent(previewHtml);
        setIsPreviewOpen(true);
    };

    const getExampleValue = (placeholder: string): string => {
        // 根據欄位名稱返回示例值
        const examples: { [key: string]: string } = {
            name: '張三',
            email: 'example@mail.com',
            phone_number: '12345678',
            mobile_number: '12345678',
            first_name: '三',
            last_name: '張',
            salutation: 'Mr.',
            role: '學生',
            country: '澳門'
        };
        return examples[placeholder] || `[${placeholder}]`;
    };


    return (
        <FormEditView
            {...{
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
            }}
        />
    );
}

export default FormEditContainer; 