import { AccountModel } from "./Account";
import { CommunityModel } from "./Community";

export interface CalendarModel {
    id: number;
    name: string;
    category: string;
    image_url: string;
    description: string;
    from_date: string | null;
    to_date: string | null;
    pre_from_date: string | null;
    pre_to_date: string | null;
    view_count: number;
    reference_url: string;
    files_url: string;
    status: string;
    created_at: string;
    updated_at: string;
    region: string;
    form_url: string;

    owner?: AccountModel
    community?: CommunityModel

    is_collected?: boolean;
    uploadFiles?: File[];
}

export const CalendarFormData = {
    json_schema: {
        type: 'object',
        title: '活動資料',
        description: '',
        required: [
            'name',
            // "date_range"
            // "description",
            'from_date',
            'to_date'
        ],
        properties: {
            image_url: {
                type: 'string',
                title: '封面'
            },
            name: {
                type: 'string',
                title: '活動名稱'
            },
            description: {
                type: 'string',
                title: '描述'
            },
            category: {
                type: 'string',
                title: '类型',
                oneOf: [
                    { const: 'course', title: '課程' },
                    { const: 'activity', title: '活動' }
                ]
            },

            // "date_range": {
            //     "type": "object",
            //     "properties": {
            //         "from_date": { "type": "string", title: "活動開始日期" },
            //         "to_date": { "type": "string", title: "活動結束日期" }
            //     }
            // },
            // "pre_date_range": {
            //     "type": "object",
            //     "properties": {
            //         "pre_from_date": { "type": "string", title: "報名開始日期" },
            //         "pre_to_date": { "type": "string", title: "報名結束日期" }
            //     }
            // },
            from_date: { type: ['string', 'null'], title: '活動開始日期' },
            to_date: { type: ['string', 'null'], title: '活動結束日期' },
            pre_from_date: { type: ['string', 'null'], title: '報名開始日期' },
            pre_to_date: { type: ['string', 'null'], title: '報名結束日期' },
            region: {
                type: 'string',
                title: '地區',
                oneOf: [
                    { const: 'hk', title: '香港' },
                    { const: 'mo', title: '澳門' }
                ]
            },
            form_url: {
                type: ['string', 'null'],
                title: '報名表單連結'
            },
            reference_url: {
                type: ['string', 'null'],
                title: '相關網址'
            },
            files_url: {
                type: ['string', 'null'],
                title: '相關文件'
            }
        }
    },
    ui_schema: {
        image_url: {
            'ui:widget': 'image'
        },
        name: {
            'ui:widget': 'text'
        },
        description: {
            'ui:widget': 'editor'
        },
        form_url: {
            'ui:widget': 'text'
        },
        reference_url: {
            'ui:widget': 'text'
        },
        region: {
            'ui:widget': 'select'
        },
        files_url: {
            'ui:widget': 'files'
        },
        from_date: {
            'ui:widget': 'date'
        },
        to_date: {
            'ui:widget': 'date'
        },
        pre_from_date: {
            'ui:widget': 'date'
        },
        pre_to_date: {
            'ui:widget': 'date'
        }
        // "date_range": {
        //     "ui:field": "DateRangeField",
        //     "ui:options": {
        //         from_date: {
        //             "ui:widget": "date",
        //         },
        //         to_date: {
        //             "ui:widget": "date",
        //         },
        //     }
        // },
        // "pre_date_range": {
        //     "ui:field": "DateRangeField",
        //     "ui:options": {
        //         pre_from_date: {
        //             "ui:widget": "date",
        //         },
        //         pre_to_date: {
        //             "ui:widget": "date",
        //         },
        //     }
        // }
    },
    form_data: {
        name: '',
        category: '',
        image_url: '',
        description: '',
        // from_date: null,
        // to_date: null,
        // pre_from_date: null,
        // pre_to_date: null,
        region: '',
        form_url: '',
        reference_url: '',
        files_url: ''
    }
};
