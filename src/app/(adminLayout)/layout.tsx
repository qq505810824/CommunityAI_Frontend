import { AlertProvider } from '@/context/AlertContext';
import { LoadProvider } from '@/context/LoadContext';
import { AppContextProvider } from '@/context/app-context';
import { EventEmitterContextProvider } from '@/context/event-emitter';
import { ModalContextProvider } from '@/context/modal-context';
import type { ReactNode } from 'react';
import AlertModel from '../components/common/Widget/AlertModel';
import LoadModel from '../components/common/Widget/LoadModel';
import SwrInitor from './swr-initor';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SwrInitor>
                <AppContextProvider>
                    <EventEmitterContextProvider>
                        <AlertProvider>
                            <LoadProvider>
                                <ModalContextProvider>{children}</ModalContextProvider>
                                <LoadModel />
                            </LoadProvider>
                            <AlertModel />
                        </AlertProvider>
                    </EventEmitterContextProvider>
                </AppContextProvider>
            </SwrInitor>
        </>
    );
};

export const metadata = {
    title: '管理后台',
    keywords:
        'Aig123,AI工具,AI工具箱,AI工具导航,AI网址大全,AI网站导航,AIGC工具,AI聊天工具,AI写作工具,AI绘画工具,AI视频工具,AI音乐工具,AI游戏工具,AI编程工具,AI生成工具',
    description:
        'AI工具导航（Aig123.com）是一个AI工具网址导航站，为您收集国内外AI工具、网站、软件、APP，涵盖AI写作、AI绘画、AI聊天、AI视频、AI音乐、AI游戏、AI办公、AI编程等领域，同时为您分享各类AI热点资讯、AI市场信息、AI软件教程、AI学习研究、AI行业应用等等……'
};

export default Layout;
