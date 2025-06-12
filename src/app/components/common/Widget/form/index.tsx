'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/theme-utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import FormEditor from './FormEditor';
import FormFileWidget from './FormFileWidget';
import FormImage from './FormImage';

const theme = extendTheme({});

interface ViewProps {
    formData: any;
    disabled?: boolean
    onSubmit: any;
}

export default function FormDetailView(props: ViewProps) {

    const {
        formData,
        disabled,
        onSubmit
    } = props
    const submit = async ({ formData: submitData }: any) => {
        onSubmit(submitData)
    };

    return (
        <ChakraProvider theme={theme}>
            <div className=' bg-white p-2 rounded-md'>
                <Form
                    schema={formData.json_schema}
                    uiSchema={formData.ui_schema}
                    formData={formData.form_data}
                    validator={validator}
                    onSubmit={submit}
                    disabled={disabled}
                    widgets={{
                        editor: FormEditor,
                        image: (props) => FormImage({ ...props, storage: 'books' }),
                        file: FormFileWidget
                    }} // 这里注册自定义 file widget
                />
            </div>
        </ChakraProvider>
    )
}