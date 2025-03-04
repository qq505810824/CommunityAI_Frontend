'use client';

import { useToastContext } from '@/app/components/base/toast';
import DemoMain from '@/app/components/demo';
import { useTranslation } from 'react-i18next';

type IDemoViewProps = {
    appId?: string;
};
const Demo = () => {
    const { notify } = useToastContext();
    const { t } = useTranslation();

    // const mutateApps = useContextSelector(AppsContext, state => state.mutateApps)

    // const updateAppDetail = async () => {
    //     fetchAppDetail({ url: '/apps', id: 'appId' }).then((res) => {});

    // const [err] = await asyncRunSafe<App>(
    //     updateAppSiteStatus({
    //         url: `/apps/${appId}/site-enable`,
    //         body: { enable_site: value },
    //     }) as Promise<App>,
    // )

    // notify({ type: 'error', message: t('app.newApp.nameNotEmpty') })

    // const navigateToChromeUrl = () => {
    //     window.open(
    //         'https://chrome.google.com/webstore/detail/dify-chatbot/ceehdapohffmjmkdcifjofadiaoeggaf',
    //         '_blank'
    //     );
    // };

    return <DemoMain />;
};

export default Demo;
