'use client';

import Divider from '@/app/components/base/divider';
import Tag from '@/app/components/base/tag';
import TagInput from '@/app/components/base/tag-input';
import { useAppContext } from '@/context/app-context';

const Home = () => {
    const { tags } = useAppContext();
    return (
        <div className="flex flex-col sm:px-6 lg:px-8">
            <div>home{tags?.tags?.length}</div>
            <div className="flex flex-row items-center h-9">
                <Tag className="mr-2" color={'yellow'}>
                    asd
                </Tag>
            </div>
            <TagInput items={['1', '2']} onChange={() => {}} />
            <Divider type="horizontal" className="!h-1 shrink-0 !mx-0.5" />
        </div>
    );
};

export default Home;
