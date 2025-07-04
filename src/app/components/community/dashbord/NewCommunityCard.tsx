import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import Modal from '../../base/modal';
import CommunityFormView from '../form';

export type IProps = {
    data?: any;
    handleRefresh: any;
};

const NewAssignment: FC<IProps> = ({ data = false, handleRefresh }) => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [visibleCreateCommunity, setVisibleCreateCommunity] = useState(false);
    const handleClick = () => {
        setVisibleCreateCommunity(true);
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex justify-center w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-dashed border-gray-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="p-5 flex flex-col items-center justify-center min-h-[225px] cursor-pointer text-center"
                    onClick={handleClick}
                >
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-blue-100 p-3 rounded-full mb-4"
                    >
                        <PlusIcon className="w-8 h-8 text-blue-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Community</h3>
                    <p className="text-sm text-gray-500 max-w-xs">Start creating a new community</p>
                </div>
            </motion.div>

            <Modal
                isShow={visibleCreateCommunity}
                className="!w-[480px] !max-w-[480px] !p-0 !rounded-2xl"
                wrapperClassName="z-40"
                onClose={() => {
                    setVisibleCreateCommunity(false);
                }}
            >
                <CommunityFormView
                    payload={{}}
                    cancel={() => {
                        setVisibleCreateCommunity(false);
                    }}
                    submit={() => {
                        handleRefresh();
                        setVisibleCreateCommunity(false);
                    }}
                />
            </Modal>
        </>
    );
};

export default NewAssignment;
