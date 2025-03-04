export type ParametersResponse = {
    user_input_form: UserInputForm[];
    file_upload: FileUpload;
    system_parameters: SystemParameters;
};

export type UserInputForm = {
    paragraph: Paragraph;
};

export type Paragraph = {
    label: string;
    variable: string;
    required: boolean;
    default: string;
    max_length: number;
    options: [];
};

export type TextInput = {
    label: string;
    variable: string;
    type: string;
    default: string;
    required: boolean;
    max_length: number;
    options: [];
};

export type FileUpload = {
    image: ImageUpload;
};

export type ImageUpload = {
    enabled: boolean;
    number_limits: number;
    detail: string;
    transfer_methods: any;
};

export type SystemParameters = {
    image_file_size_limit: string;
};

export type ResultResponse = {
    data: {
        outputs: any;
    };
};
