
import { useEffect, useState } from 'react';

export default function FormRowField(props: any) {
    const { formData, required, uiSchema, schema, onChange } = props;
    const fields: Record<string, any> = uiSchema?.['ui:options'] || {};

    const [initValue, setInitValue] = useState('');
    const [isInit, setIsInit] = useState(false);

    const [value, setValue] = useState();
    // const [selfFormDatas, setSelfFormDatas] = useState<any>()

    useEffect(() => {
        // console.log('form_data', form_datas);
        // console.log('Object.keys(fields)', Object.keys(fields));
        // const keys = Object.keys(fields)
        // console.log(_.pick(form_datas, keys))
        // setSelfFormDatas(_.pick(form_datas, keys))
        // const fuck = _.pick(form_datas, keys)
        // console.log('fuck', fuck);

        // if (form_datas)
        //     setFilesDatas({
        //         ...fieldsDatas,
        //         ...fuck
        //     })
        console.log('formData', formData);
    }, [formData]);

    // useEffect(() => {
    //     console.log('fieldsDatas 2', fieldsDatas);

    // }, [fieldsDatas]);

    useEffect(() => {
        // console.log('props', props);

        // console.log('formData', formData);
        // console.log('row field value', value);
        if (value && !isInit) {
            // setInitValue(value)
            // setIsInit(true)
        }
    }, [props]);

    return (
        <div className="flex w-full flex-row gap-4">
            {Object.keys(fields)?.map((key: string, index) => {
                return (
                    <div key={key} className=" ">
                        {/* <label className="block mb-2 mr-3 font-semibold">{schema.properties[key]?.title} {required && <label className=" text-sm text-[#e53e3e]">*</label>}</label> */}
                        <input
                            type={fields[key]['ui:widget']}
                            value={formData?.[key] || ''}
                            required={required}
                            onChange={(e) => {
                                // setSelfFormDatas({
                                //     ...selfFormDatas,
                                //     [key]: e.target.value
                                // })
                                // onChange({ ...props.formData, [key]: e.target.value });
                                // setFilesDatas({
                                //     ...fieldsDatas,
                                //     [key]: e.target.value
                                // })
                            }}
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>
                );
            })}
        </div>
    );
}
