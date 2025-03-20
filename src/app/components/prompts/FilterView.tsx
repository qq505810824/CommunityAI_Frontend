import { PromptFatherTags, PromptTags } from '@/utils/constant';
import { Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import SearchInputView from '../common/Views/SearchInputView';
import CreatePromptModal from './CreatePromptModal';
import TagView from './TagView';

interface ViewProps {
    tag?: any;
    onClose: () => void;
    onSearch: any;
    searching?: boolean;
}

export default function FilterView(props: ViewProps) {
    const { tag, onClose, onSearch, searching } = props;

    const [secondOptions, setSecondOptions] = useState<any[]>([]);
    const [selectOption, setSelectedOption] = useState<any>(null);
    const [selectFather, setSelectedFather] = useState<any>();

    useEffect(() => {
        const options = PromptTags.filter((tag) => tag.father == PromptFatherTags[0].name);
        setSecondOptions(options);
        setSelectedFather(PromptFatherTags[0]);
    }, []);

    useEffect(() => {
        if (selectOption != null) onSearch(selectOption?.name || '');
    }, [selectOption]);

    const handleOption1 = (_tag: any) => {
        setSelectedFather(_tag);
        // 根据第一个选择框的值更新第二个选择框的选项
        const options = PromptTags.filter((tag) => tag.father == _tag.name);
        setSecondOptions(options);
    };

    return (
        <>
            <div className="w-full items-center bg-blue-400 text-center px-4 flex flex-col justify-center py-8 sm:py-16  ">
                <Typography level="h2" sx={{ color: '#eeeeee', marginBottom: 4 }}>
                    Prompt
                </Typography>
                <SearchInputView
                    className={'w-full sm:w-1/2 rounded-full mb-4'}
                    handleSearch={onSearch}
                    loading={searching}
                    placeholder="Search"
                    sx={{
                        borderRadius: 100
                    }}
                />
                <CreatePromptModal onClose={onClose} />
                <div className="w-full sm:w-1/2 space-x-4 flex mt-2 flex-row items-center ">
                    {/* <Typography sx={{
                        color: '#eee',
                    }}>Filter:</Typography>
                    <Select
                        value={selectedOption1}
                        onChange={handleOption1Change}
                    >
                        {PromptFatherTags.map((tag, index) => (
                            <Option key={index} value={tag.name}>{tag.name}</Option>
                        ))}
                    </Select>
                    <Select
                        value={selectedOption2}
                        onChange={handleOption2Change}
                    >
                        {secondOptions?.map((tag, index) => (
                            <Option key={index} value={tag.name}>{tag.name}</Option>
                        ))}
                    </Select> */}
                </div>
            </div>
            <div className="w-full sm:max-w-7xl  px-4   flex my-2 flex-row  justify-start items-start ">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2  items-center">
                        <span className=" text-sm font-medium whitespace-nowrap">类型:</span>
                        <div className="flex flex-row gap-2 flex-wrap items-center">
                            {PromptFatherTags.map((tag, index) => (
                                <div
                                    key={index}
                                    className={` px-2 py-1 text-sm rounded-sm   hover:text-white hover:bg-blue-500 cursor-pointer ${selectFather?.name == tag.name ? 'bg-blue-500 text-white' : 'bg-white text-[#000]'}`}
                                    onClick={() => {
                                        handleOption1(tag);
                                    }}
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2  items-center">
                        <span className=" text-sm font-medium whitespace-nowrap">标签:</span>
                        <div className="flex flex-row gap-2 flex-wrap items-center">
                            {secondOptions.map((tag, index) => (
                                <TagView
                                    key={index}
                                    tag={tag}
                                    onSelect={() => {
                                        setSelectedOption(tag);
                                    }}
                                ></TagView>
                            ))}
                        </div>
                    </div>
                    <div className="h-10">
                        {selectOption && (
                            <div className="flex flex-row gap-2  items-center">
                                <span className=" text-sm font-medium whitespace-nowrap">
                                    已选:
                                </span>
                                <div className="flex flex-row gap-2 flex-wrap items-center">
                                    <TagView
                                        tag={selectOption}
                                        onDelete={() => {
                                            setSelectedOption('');
                                        }}
                                    ></TagView>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
