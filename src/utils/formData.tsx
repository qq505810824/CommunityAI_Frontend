import { AppMeuns, PromptTags } from './constant';

export const AppFormData = {
    fieldSchema: {
        category: { type: 'string', title: '分类', required: true },
        data_url: { type: 'string', title: '网址链接', required: true },
        title: { type: 'string', title: '名称', required: true },
        description: { type: 'string', title: '描述', required: true },
        img_src: { type: 'string', title: 'Logo图片链接', required: false }
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        category: {
            'ui:widget': 'select',
            'ui:options': { enumOptions: AppMeuns.map((menu) => menu.name) }
        },
        description: { 'ui:widget': 'textarea' },
        data_url: { 'ui:widget': 'link' },
        img_src: { 'ui:widget': 'text' }
    }
};

export const ArticleFormData = {
    fieldSchema: {
        title: { type: 'string', title: '标题', required: true },
        description: { type: 'string', title: '描述', required: true }
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        description: { 'ui:widget': 'textarea' }
    }
};

export const PromptFormData = {
    fieldSchema: {
        title: { type: 'string', title: '标题', required: true, tip: '' },
        type: { type: 'string', title: '类型', required: true, tip: '' },
        tags: { type: 'string', title: '标签', required: true, tip: '' },
        description: { type: 'string', title: '描述', required: true, tip: '' },
        prompt: {
            type: 'string',
            title: 'Prompt',
            required: true,
            tip: 'Use this field to create your actual prompt template. Press to create placeholder tags so users can customize the inputs for your template.'
        }
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        type: { 'ui:widget': 'select', 'ui:options': { enumOptions: ['Text', 'Video'] } },
        tags: {
            'ui:widget': 'tag',
            'ui:options': { enumOptions: [...PromptTags] }
        },
        description: { 'ui:widget': 'textarea' },
        prompt: { 'ui:widget': 'textarea' }
    }
};

export const AccountFormData = {
    fieldSchema: {
        name: { type: 'string', title: '名称', required: true },
        email: { type: 'string', title: '邮箱', required: true },
        nickname: { type: 'string', title: '昵称', required: true },
        password: { type: 'string', title: '密码', required: true },
        avatar: { type: 'string', title: '头像', required: false }
    },
    uiSchema: {
        name: { 'ui:widget': 'text' },
        email: { 'ui:widget': 'text' },
        nickname: { 'ui:widget': 'text' },
        password: { 'ui:widget': 'password' },
        avatar: { 'ui:widget': 'text' }
    }
};

export const CalendarFormData = {
    fieldSchema: {
        image_url: { type: 'file', title: '', required: true, tip: '' },
        name: { type: 'string', title: '活動名稱', required: true, tip: '' },
        category: { type: 'string', title: '类型', required: true, tip: '' },
        pre_date_range: { type: 'string', title: '報名日期範圍', required: false, tip: '(選填)' },
        date_range: { type: 'string', title: '活動日期範圍', required: true, tip: '' },
        reference_url: { type: 'string', title: '相關網址', required: false, tip: '(選填)' },
        description: { type: 'string', title: '描述', required: true, tip: '' }
    },
    uiSchema: {
        name: { 'ui:widget': 'text' },
        category: { 'ui:widget': 'select', 'ui:options': { enumOptions: ['課程', '活動'] } },
        // tags: {
        //     'ui:widget': 'tag',
        //     'ui:options': { enumOptions: [...PromptTags] }
        // },
        description: { 'ui:widget': 'textarea' },
        image_url: { 'ui:widget': 'file' },
        date_range: { 'ui:widget': 'date_range' },
        pre_date_range: { 'ui:widget': 'date_range' },
        reference_url: { 'ui:widget': 'text' }
    }
};
