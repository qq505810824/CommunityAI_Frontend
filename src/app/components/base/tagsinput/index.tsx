import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

export type ITagProps = {
    tags: any[];
    handleChange?: any;
};

export default function TagsInputView({ tags, handleChange }: ITagProps) {
    const [localTags, setLocalTags] = useState<any>([]);
    useEffect(() => {
        setLocalTags(tags);
        // console.log('tagstags', tags);
    }, [tags]);
    const onChange1 = (values: any) => {
        // console.log('e', values);
        setLocalTags(values);
        handleChange(values);
    };

    const options = tags.map((tag) => ({ value: tag, label: tag }));

    const onChange = (newValue: any) => {
        const newTags = newValue.map((item: any) => item.value);
        handleChange && handleChange(newTags);
    };

    return (
        <>
            <CreatableSelect
                isMulti
                options={options}
                value={options}
                onChange={onChange}
                placeholder="Add State Name"
                className="w-full"
                classNamePrefix="react-select"
            />

            <TagsInput
                className="flex items-center pt-1 px-1 border-gray-200 border hidden"
                // placeholder="Add State Name"
                value={localTags}
                onChange={onChange}
            />
        </>
    );
}
