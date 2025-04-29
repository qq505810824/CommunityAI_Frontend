import AddLinkIcon from '@mui/icons-material/AddLink';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SettingsIcon from '@mui/icons-material/Settings';
import { FC } from 'react';
interface IProps {}

const ChatInput: FC<IProps> = ({}) => {
    return (
        <>
            <div className="w-full bg-white rounded-lg shadow-md ">
                <textarea
                    className="w-full rounded-lg bg-white min-h-[100px] p-2 overflow-warp break-words resize-none text-md border-none"
                    placeholder="Add data or ask any question!"
                />
                <div className="px-2 pb-2 flex justify-between items-center">
                    <div className=" flex items-center space-x-2">
                        <button className=" border px-2 py-1 rounded-full text-sm hover:bg-[#eee] flex justify-center items-center">
                            <AddLinkIcon sx={{ color: '#333', fontSize: 18, marginRight: 1 }} />
                            Add data
                        </button>
                        <button className=" border w-8 h-8 rounded-full text-sm hover:bg-[#eee] flex items-center justify-center">
                            <SettingsIcon sx={{ color: '#333', fontSize: 16 }} />
                        </button>
                    </div>
                    <div>
                        <button
                            disabled={true}
                            className=" border w-8 h-8 rounded-full text-sm bg-[#ad48fd] flex items-center justify-center"
                        >
                            <ArrowUpwardIcon sx={{ color: '#fff', fontSize: 16 }} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ChatInput;
