export interface BookModel {
    id: number;
    title: string;
    description: string;
    cover_url: string;
    file_url: string;

    category: string;

    author: string;
    publisher: string;
    publish_date: string;

    price: number;
    is_free: boolean;
    status: string

    created_at: string;
    updated_at: string;
}

export const BookFormData2 = {
    fieldSchema: {
        title: { type: 'string', title: '名稱', required: true },
        category: { type: 'string', title: '分類', required: true },
        description: { type: 'string', title: '簡介', required: true },
        cover_url: { type: 'string', title: '封面', required: true },
        // file_url: { type: 'string', title: '文件', required: true },
        price: { type: 'number', title: '價格', required: true },
        is_free: { type: 'radio', title: '是否免費', required: true },

        author: { type: 'string', title: '作者', required: false, tip: '(選填)' },
        publisher: { type: 'string', title: '出版社', required: false, tip: '(選填)' },
        publish_date: { type: 'string', title: '出版日期', required: false, tip: '(選填)' },
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        description: { 'ui:widget': 'textarea' },
        price: { 'ui:widget': 'number' },
        is_free: {
            'ui:widget': 'radio',
            'ui:options': {
                enumOptions: [
                    {
                        name: '課程',
                        value: 'course'
                    },
                    {
                        name: '活動',
                        value: 'activity'
                    }
                ]
            }
        },
        category: {
            'ui:widget': 'select',
            'ui:options': {
                enumOptions: [
                    {
                        name: '課程',
                        value: 'course'
                    },
                    {
                        name: '活動',
                        value: 'activity'
                    }
                ]
            }
        },
        author: { 'ui:widget': 'text' },
        publisher: { 'ui:widget': 'text' },
        publish_date: { 'ui:widget': 'text' },
        cover_url: { 'ui:widget': 'file' },
        file_url: { 'ui:widget': 'upload' }
    }
};



export const BookFormData = {
    "json_schema": {
        "type": "object",
        "title": "教材資料",
        "description": "",
        "required": [
            "title",
            "description"
        ],
        "properties": {
            "cover_url": {
                "type": "string",
                "title": "封面",
                "tip": "建議上傳圖片比例5:6,限6M內"
            },
            "title": {
                "type": "string",
                "title": "名稱"
            },

            "description": {
                "type": "string",
                "title": "簡介"
            },

            "category": {
                "type": "string",
                "title": "分類"
            },
            "price": {
                "type": "number",
                "title": "價格"
            },
            "is_free": {
                "type": "boolean",
                "title": "是否免費",
                // "enum": [true, false],
                // "enumNames": ["是", "否"]
                "oneOf": [
                    { "const": true, "title": "是" },
                    { "const": false, "title": "否" }
                ]
            },
            "author": {
                "type": "string",
                "title": "作者"
            },
            "publisher": {
                "type": "string",
                "title": "出版社"
            },
            "publish_date": {
                "type": ["string", "null"],
                "title": "出版日期"
            },
            "file_url": {
                "type": "string",
                "title": "教材文件"
            }
        },

    },
    "ui_schema": {
        "title": {
            "ui:widget": "text"
        },
        "category": {
            "ui:widget": "text",
            // "ui:description": "Hint: Make it strong!"
        },
        "description": {
            "ui:widget": "textarea"
        },
        "cover_url": {
            "ui:widget": "image"
        },
        "price": {
            "ui:widget": "updown"
        },
        "is_free": {
            "ui:widget": "radio"
        },
        "author": {
            "ui:widget": "text"
        },
        "publisher": {
            "ui:widget": "text"
        },
        "publish_date": {
            "ui:widget": "date"
        },
        "file_url": {
            "ui:widget": "file"
        },

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
    "form_data": {
        "title": "",
        "category": "",
        "description": "",
        "cover_url": "",
        "price": 0,
        "is_free": true,
        "author": "",
        "publisher": "",
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
    "meta": {},
}