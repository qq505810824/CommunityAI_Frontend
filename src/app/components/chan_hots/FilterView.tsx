import { PromptTags } from '@/utils/constant';
import { Button, Input, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import Select from '../base/select';
import TagView from './TagView';

interface ViewProps {
    tag?: any;
    onClose: () => void;
    onSearch: any;
    changeCategory?: any;
    searching?: boolean;
    categorys?: any[]
}

export default function FilterView(props: ViewProps) {
    const { tag, onClose, onSearch, searching, changeCategory, categorys } = props;

    const [category, setCategory] = useState('xhs');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [keyword, setKeyword] = useState('');

    const [secondOptions, setSecondOptions] = useState<any[]>([]);
    const [selectOption, setSelectedOption] = useState<any>(null);
    const [selectFather, setSelectedFather] = useState<any>('');

    useEffect(() => {
        // const options = PromptTags.filter((tag) => tag.father == PromptFatherTags[0].name);
        // setSecondOptions(options);
        setSelectedFather({
            name: ''
        });
    }, []);

    useEffect(() => {
        if (category) {
            // changeCategory('category', category);
        }
    }, [category]);

    // useEffect(() => {
    //     if (selectOption != null) onSearch(selectOption?.name || '');
    // }, [selectOption]);

    const handleOption1 = (_tag: any) => {
        setSelectedFather(_tag);
        // 根据第一个选择框的值更新第二个选择框的选项
        const options = PromptTags.filter((tag) => tag.father == _tag.cat_name);
        setSecondOptions(options);
    };

    const onKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            onSearch(keyword);
        }
    };

    return (
        <>
            <div className="w-full sm:max-w-7xl  px-4   flex my-2 flex-col  justify-start items-start space-y-4 ">
                <div className="w-full flex flex-row items-center  space-x-2 whitespace-nowrap">
                    <Typography level="h3">蝉蚂蚁</Typography>
                    <Input
                        sx={{ '--Input-decoratorChildHeight': '45px' }}
                        className="w-full sm:w-1/2"
                        placeholder="Input keyword..."
                        type="text"
                        required
                        onKeyUp={onKeyUp}
                        onChange={(event) => {
                            setKeyword(event.target.value);
                        }}
                        // error={data.status === 'failure'}
                        endDecorator={
                            <Button
                                variant="solid"
                                color="primary"
                                type="submit"
                                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                onClick={() => {
                                    onSearch(keyword);
                                }}
                            >
                                Search
                            </Button>
                        }
                    />
                </div>

                <div className="hidden">
                    <Typography
                        level="h4"
                        sx={{ borderLeft: 4, borderLeftColor: '#3b82f6', pl: 1, color: '#3b82f6' }}
                    >
                        分类
                    </Typography>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2  items-center">
                        <div className="flex flex-row gap-2 flex-wrap items-center">
                            <div
                                className={` px-2 py-2 text-sm rounded-sm   hover:text-white hover:bg-blue-500 cursor-pointer ${selectFather?.name == '' ? 'bg-blue-500 text-white' : 'bg-white text-[#000]'}`}
                                onClick={() => {
                                    setSelectedFather({
                                        name: ""
                                    });
                                    // handleOption1(tag);
                                    changeCategory('video_tag', "");
                                }}
                            >
                                {'全部'}
                            </div>

                            {categorys?.map((tag, index) => (
                                <div
                                    key={index}
                                    className={` px-2 py-2 text-sm rounded-sm   hover:text-white hover:bg-blue-500 cursor-pointer ${selectFather?.name == tag.cat_name ? 'bg-blue-500 text-white' : 'bg-white text-[#000]'}`}
                                    onClick={() => {
                                        setSelectedFather({
                                            name: tag.cat_name
                                        });
                                        changeCategory('video_tag', tag.cat_name);
                                    }}
                                >
                                    {tag.cat_name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row gap-2  items-center hidden">
                        <div className="flex flex-row gap-2 flex-wrap items-center">
                            <div
                                className={` px-2 py-1 text-sm rounded-sm   hover:text-white hover:bg-blue-500 cursor-pointer ${selectFather?.name == '' ? 'bg-blue-500 text-white' : 'bg-white text-[#000]'}`}
                                onClick={() => {
                                    // handleOption1(tag);
                                }}
                            >
                                {'全部'}
                            </div>
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
                    <div className="h-10 hidden">
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
                    <div className="flex flex-row items-center hidden">
                        <label className="bg-blue-500 text-white text-sm px-2 py-2 h-9  rounded-l-sm">
                            日榜
                        </label>
                        <Select
                            items={[
                                {
                                    name: '2025-04-29',
                                    value: '2025-04-29'
                                },
                                {
                                    name: '2025-04-28',
                                    value: '2025-04-28'
                                }
                            ]}
                            defaultValue={'2025-04-29'}
                            allowSearch={false}
                            bgClassName=" bg-white"
                            overlayClassName="py-1"
                            className="border border-blue-500 w-[150px] rounded-r-sm bg-white"
                            onSelect={(item) => {
                                changeCategory('date', item.value);
                            }}
                        ></Select>
                    </div>
                </div>
            </div>
        </>
    );
}
