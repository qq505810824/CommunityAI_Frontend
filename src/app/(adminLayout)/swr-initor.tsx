'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';

type SwrInitorProps = {
    children: ReactNode;
};
const SwrInitor = ({ children }: SwrInitorProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    // const consoleToken = searchParams.get('console_token')
    const consoleTokenFromLocalStorage = localStorage?.getItem('admin_authorization');
    const [init, setInit] = useState(false);

    useEffect(() => {
        // console.log('consoleToken', consoleToken);
        // console.log('consoleTokenFromLocalStorage', consoleTokenFromLocalStorage);

        // if (!consoleTokenFromLocalStorage) router.replace('/admin/login');

        // if (consoleToken) {
        //     localStorage?.setItem('console_token', consoleToken!)
        //     router.replace('/apps', { forceOptimisticNavigation: false } as any)
        // }
        setInit(true);
    }, []);

    return init ? (
        <SWRConfig
            value={{
                shouldRetryOnError: false,
                revalidateOnFocus: false
            }}
        >
            {children}
        </SWRConfig>
    ) : null;
};

export default SwrInitor;
