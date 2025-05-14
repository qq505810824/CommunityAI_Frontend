import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    tag?: any;
    onClose: () => void;
    onSearch: any;
    onSwitchCategory: any;
    searching?: boolean;
}

export default function FilterView(props: ViewProps) {
    const { tag, onClose, onSearch, searching, onSwitchCategory } = props;
    const router = useRouter();

    const [menu, setMenu] = useState('');
    const [keyword, setKeyword] = useState('');

    const switchMenu = (value: string) => {
        setMenu(value);
        onSwitchCategory(value);
    };

    const handleClickNew = () => {
        router.push('/calendar/create');
    };

    const onKeyUp = (e: any) => {
        if (e.keyCode === 13) {
            onSearch(keyword);
        }
    };

    return (
        <>
            <div className="w-full items-center  text-center flex flex-col justify-center  ">
                <div className="w-full items-center bg-blue-400 text-center flex flex-row justify-center    py-8 sm:py-16 ">
                    <div className="w-full sm:max-w-7xl  items-center  text-center px-4 flex flex-col justify-center space-y-2 ">
                        <Typography
                            level="h2"
                            sx={{
                                whiteSpace: 'nowrap',
                                color: 'white'
                            }}
                        >
                            Career Calendar
                        </Typography>
                        <div className="w-full justify-center flex flex-row items-center mx-4 flex-1  ">
                            <input
                                type="search"
                                className="w-1/2 px-2 py-2 border-gray-300 rounded-l-sm"
                                placeholder="輸入關鍵詞..."
                                onKeyUp={onKeyUp}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                            />
                            <button
                                className="px-2 py-2 bg-orange-500 text-white rounded-r-sm"
                                onClick={() => {
                                    onSearch(keyword);
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full sm:max-w-7xl  px-4 border-b  flex  flex-row items-center justify-between ">
                    <div className="flex flex-row items-center">
                        <div
                            className={`px-4 py-2  cursor-pointer hover:text-orange-500 ${menu == '' ? 'bg-orange-200' : ''}`}
                            onClick={() => {
                                switchMenu('');
                            }}
                        >
                            <span
                                className={`  hover:text-orange-500 font-semibold ${menu == '' ? 'text-orange-500' : 'text-[#333]'}`}
                            >
                                全部
                            </span>
                        </div>
                        <div
                            className={`px-4 py-2  cursor-pointer hover:text-orange-500 ${menu == 'course' ? 'bg-orange-200' : ''}`}
                            onClick={() => {
                                switchMenu('course');
                            }}
                        >
                            <span
                                className={`  hover:text-orange-500 font-semibold ${menu == 'course' ? 'text-orange-500' : 'text-[#333]'}`}
                            >
                                課程
                            </span>
                        </div>
                        <div
                            className={`px-4 py-2  cursor-pointer ${menu == 'activity' ? 'bg-orange-200' : ''}`}
                            onClick={() => {
                                switchMenu('activity');
                            }}
                        >
                            <span
                                className={`  hover:text-orange-500 font-semibold ${menu == 'activity' ? 'text-orange-500' : 'text-[#333]'}`}
                            >
                                活動
                            </span>
                        </div>
                    </div>
                    <Button
                        color="warning"
                        sx={{
                            // bgcolor: '#fff',
                            // color: 'black',
                            borderRadius: 4
                            // ":hover": {
                            //     bgcolor: '#fff'
                            // }
                        }}
                        className="px-4 py-2   bg-white rounded-sm cursor-pointer   hover:text-orange-500"
                        startDecorator={<PlusCircleIcon className="w-4" />}
                        onClick={handleClickNew}
                    >
                        發佈活動
                    </Button>
                </div>
            </div>
        </>
    );
}
