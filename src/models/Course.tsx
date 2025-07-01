import { AccountModel } from "./Account";

export interface CourseModel {
    id: number;
    title: string;
    description: string;
    cover_url: string;
    file_url: string;

    category: string;

    owner: AccountModel;

    price: number;
    is_free: boolean;
    status: string;

    enroll_start_at: string;
    enroll_end_at: string

    created_at: string;
    updated_at: string;
}

export const BookFormData = {
    json_schema: {
        type: 'object',
        title: '教材資料',
        description: '',
        required: ['title', 'description'],
        properties: {
            cover_url: {
                type: 'string',
                title: '封面',
                tip: '建議上傳圖片比例5:6,限6M內'
            },
            title: {
                type: 'string',
                title: '名稱'
            },

            description: {
                type: 'string',
                title: '簡介'
            },

            category: {
                type: 'string',
                title: '分類'
            },
            price: {
                type: 'number',
                title: '價格'
            },
            is_free: {
                type: 'boolean',
                title: '是否免費',
                // "enum": [true, false],
                // "enumNames": ["是", "否"]
                oneOf: [
                    { const: true, title: '是' },
                    { const: false, title: '否' }
                ]
            },
            author: {
                type: 'string',
                title: '作者'
            },
            publisher: {
                type: 'string',
                title: '出版社'
            },
            publish_date: {
                type: ['string', 'null'],
                title: '出版日期'
            },
            file_url: {
                type: 'string',
                title: '教材文件'
            }
        }
    },
    ui_schema: {
        title: {
            'ui:widget': 'text'
        },
        category: {
            'ui:widget': 'text'
            // "ui:description": "Hint: Make it strong!"
        },
        description: {
            'ui:widget': 'textarea'
        },
        cover_url: {
            'ui:widget': 'image'
        },
        price: {
            'ui:widget': 'updown'
        },
        is_free: {
            'ui:widget': 'radio'
        },
        author: {
            'ui:widget': 'text'
        },
        publisher: {
            'ui:widget': 'text'
        },
        publish_date: {
            'ui:widget': 'date'
        },
        file_url: {
            'ui:widget': 'file'
        }

        // "ui:order": [
        //     "cover_url",
        //     "title",
        //     "category",
        //     "description",

        //     "price",
        //     "is_free",
        //     "author",
        //     "publisher",
        //     "publish_date",
        // ],
    },
    form_data: {
        title: '',
        category: '',
        description: '',
        cover_url: '',
        price: 0,
        is_free: true,
        author: '',
        publisher: ''
    },
    // "display_order": [
    //     "title",
    //     "category",
    //     "description",
    //     "cover_url",
    //     "price",
    //     "is_free",
    //     "author",
    //     "publisher",
    //     "publish_date",
    // ],
    meta: {}
};
