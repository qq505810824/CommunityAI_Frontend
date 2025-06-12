interface FormField {
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

export interface FormDetail {
    id: string;
    name: string;
    description: string;
    json_schema: {
        type: string;
        title: string;
        properties: any;
        dependencies: any;
        required?: string[];
    };
    form_data: any;
    ui_schema: any;
    display_order: any[];
}