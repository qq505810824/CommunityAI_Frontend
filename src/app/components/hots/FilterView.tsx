import { ContentType } from '@/hooks/useHotData';
import { HotsFatherTags, PromptTags } from '@/utils/constant';
import { Button, Input, Typography } from '@mui/joy';
import moment from 'moment';
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
            name: '美食'
        });
    }, []);

    useEffect(() => {
        if (category) {
            changeCategory('category', category);
        }
    }, [category]);

    // useEffect(() => {
    //     if (selectOption != null) onSearch(selectOption?.name || '');
    // }, [selectOption]);

    const handleOption1 = (_tag: any) => {
        setSelectedFather(_tag);
        // 根据第一个选择框的值更新第二个选择框的选项
        const options = PromptTags.filter((tag) => tag.father == _tag.name);
        setSecondOptions(options);
    };

    const onKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            onSearch(keyword);
        }
    };

    // 计算过去 7 天的日期
    const getLast7Days = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 7; i++) {

            const formattedDate = moment().add(-i, 'day').format('YYYY-MM-DD');
            dates.push({
                name: formattedDate,
                value: formattedDate
            });
        }
        return dates;
    };

    const last7Days = getLast7Days();
    const yesterday = last7Days[0]?.value;

    return (
        <>
            <div className="w-full sm:max-w-7xl  px-4   flex my-2 flex-col  justify-start items-start space-y-4 ">
                <div className="w-full flex flex-row items-center  space-x-2 whitespace-nowrap">
                    <Typography level="h3">热榜</Typography>
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
                        className={`${category == '' || category == ContentType.XiaoHongShu ? 'bg-blue-500  text-white' : 'text-[#333] hover:text-blue-500  bg-gray-200'}  whitespace-nowrap  items-center  rounded-sm w-[100px] flex justify-center text-center  cursor-pointer py-2 px-3`}
                        onClick={() => {
                            setCategory(ContentType.XiaoHongShu);
                        }}
                    >
                        <img
                            src="https://chs.newrank.cn/main/logo/logo-xiaohongshu.png"
                            className="w-5 h-5 mr-2"
                            alt=""
                        />
                        <label className="cursor-pointer">小红书</label>
                    </div>
                    <div
                        className={`${category == ContentType.Douyin ? 'bg-blue-500  text-white' : 'text-[#333] hover:text-blue-500  bg-gray-200'} whitespace-nowrap  items-center  rounded-sm w-[100px] flex justify-center text-center  cursor-pointer py-2 px-3`}
                        onClick={() => {
                            setCategory(ContentType.Douyin);
                        }}
                    >
                        <img
                            src="https://chs.newrank.cn/main/logo/logo-douyin.png"
                            className="w-5 h-5 mr-2"
                            alt=""
                        />
                        <label className="cursor-pointer">抖音</label>
                    </div>
                    <div
                        className={`${category == ContentType.KuaiShou ? 'bg-blue-500  text-white' : 'text-[#333] hover:text-blue-500  bg-gray-200'} whitespace-nowrap items-center rounded-sm w-[100px] flex justify-center text-center  cursor-pointer py-2 px-3`}
                        onClick={() => {
                            setCategory(ContentType.KuaiShou);
                        }}
                    >
                        <img
                            src="https://chs.newrank.cn/main/logo/logo-kuaishou.png"
                            className="w-5 h-5 mr-2"
                            alt=""
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
                                        changeCategory('type', tag.name);
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
                            items={last7Days}
                            defaultValue={yesterday}
                            allowSearch={false}
                            bgClassName=" bg-white"
                            overlayClassName="py-1"
                            className="border border-blue-500 w-[160px] rounded-r-sm bg-white"
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
