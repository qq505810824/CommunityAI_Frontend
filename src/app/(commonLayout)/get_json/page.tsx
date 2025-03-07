'use client';

import { extractInfoFromHTML } from '@/utils/stringUtil';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

type IDemoViewProps = {
    appId?: string;
};
const Index = () => {

    const [content, setContent] = useState('')
    const [datas, setDatas] = useState<any>()
    const getJsonData = async () => {
        // console.log(content);
        const jsonData = await extractInfoFromHTML(content)
        console.log(jsonData);
        setDatas(jsonData)


    }
    return (
        <>
            <div className='m-4'>
                <div>
                    <textarea className='min-h-[500px] w-full border p-2'
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}></textarea>
                </div>
                <div className='flex justify-end'>
                    <button onClick={() => {
                        getJsonData()
                    }} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 rounded-md">get json</button>
                </div>
                <div>
                    <pre>{JSON.stringify(datas, null, 2)}</pre>
                    <button onClick={() => {
                        copy(JSON.stringify(datas, null, 2))
                    }}>copy</button>
                </div>
            </div>
        </>
    );
};

export default Index;
