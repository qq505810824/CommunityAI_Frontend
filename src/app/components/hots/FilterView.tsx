import { HotsFatherTags, PromptTags } from '@/utils/constant';
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
}

export default function FilterView(props: ViewProps) {
    const { tag, onClose, onSearch, searching, changeCategory } = props;

    const [category, setCategory] = useState('dy');

    const [secondOptions, setSecondOptions] = useState<any[]>([]);
    const [selectOption, setSelectedOption] = useState<any>(null);
    const [selectFather, setSelectedFather] = useState<any>('');

    useEffect(() => {
        // const options = PromptTags.filter((tag) => tag.father == PromptFatherTags[0].name);
        // setSecondOptions(options);
        setSelectedFather('');
    }, []);

    useEffect(() => {
        if (category) {
            changeCategory(category);
        }
    }, [category]);

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
            <div className="w-full sm:max-w-7xl  px-4   flex my-2 flex-col  justify-start items-start space-y-4 ">
                <div className="w-full flex flex-row items-center  space-x-2">
                    <Typography level="h3">Hots</Typography>
                    <Input
                        sx={{ '--Input-decoratorChildHeight': '45px' }}
                        className="w-full sm:w-1/2"
                        placeholder="Input keyword..."
                        type="email"
                        required
                        value={''}
                        onChange={(event) => {}}
                        // error={data.status === 'failure'}
                        endDecorator={
                            <Button
                                variant="solid"
                                color="primary"
                                type="submit"
                                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            >
                                Search
                            </Button>
                        }
                    />
                </div>

                <div>
                    <Typography
                        level="h4"
                        sx={{ borderLeft: 4, borderLeftColor: '#3b82f6', pl: 1, color: '#3b82f6' }}
                    >
                        热门内容
                    </Typography>
                </div>
                <div className=" flex flex-row items-center gap-4">
                    <div
                        className={`${category == '' || category == 'dy' ? 'bg-blue-500  text-white' : 'text-[#333] hover:text-blue-500  bg-gray-200'}   items-center  rounded-sm w-[100px] flex justify-center text-center  cursor-pointer py-2 px-3`}
                        onClick={() => {
                            setCategory('dy');
                        }}
                    >
                        <img
                            src="https://chs.newrank.cn/main/logo/logo-douyin.png"
                            className="w-5 h-5 mr-2"
                        />
                        <label className="cursor-pointer">抖音</label>
                    </div>
                    <div
                        className={`${category == 'ks' ? 'bg-blue-500  text-white' : 'text-[#333] hover:text-blue-500  bg-gray-200'}  items-center rounded-sm w-[100px] flex justify-center text-center  cursor-pointer py-2 px-3`}
                        onClick={() => {
                            setCategory('ks');
                        }}
                    >
                        <img
                            src="https://chs.newrank.cn/main/logo/logo-kuaishou.png"
                            className="w-5 h-5 mr-2"
                        />
                        <label className="cursor-pointer">快手</label>
                    </div>
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
                                className={` px-2 py-2 text-sm rounded-sm   hover:text-white hover:bg-blue-500 cursor-pointer ${selectFather == '' ? 'bg-blue-500 text-white' : 'bg-white text-[#000]'}`}
                                onClick={() => {
                                    setSelectedFather('');
                                    // handleOption1(tag);
                                }}
                            >
                                {'全部'}
                            </div>

                            {HotsFatherTags.map((tag, index) => (
                                <div
                                    key={index}
                                    className={` px-2 py-2 text-sm rounded-sm   hover:text-white hover:bg-blue-500 cursor-pointer ${selectFather?.name == tag.name ? 'bg-blue-500 text-white' : 'bg-white text-[#000]'}`}
                                    onClick={() => {
                                        handleOption1(tag);
                                    }}
                                >
                                    {tag.name}
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
                    <div className="flex flex-row items-center ">
                        <label className="bg-blue-500 text-white text-sm px-2 py-2 h-9  rounded-l-sm">
                            日榜
                        </label>
                        <Select
                            items={[
                                {
                                    name: '2025-04-29',
                                    value: '2025-04-29'
                                }
                            ]}
                            defaultValue={'2025-04-29'}
                            allowSearch={false}
                            bgClassName=" bg-white"
                            overlayClassName="py-1"
                            className="border border-blue-500 w-[150px] rounded-r-sm bg-white"
                            onSelect={() => {}}
                        ></Select>
                    </div>
                </div>
            </div>
        </>
    );
}
