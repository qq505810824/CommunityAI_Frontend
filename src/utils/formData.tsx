import { AppMeuns } from './constant';

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
