'use client';

import { useAppContext } from '@/context/app-context';

const Search = () => {
    const { tags } = useAppContext();
    return (
        <div className="flex flex-col sm:px-6 lg:px-8">
            <div>search{tags?.tags?.length}</div>
        </div>
    );
};

export default Search;
