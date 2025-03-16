'use client';

import { Typography } from '@mui/joy';
import Head from 'next/head';
import Footer from '../Footer';
import Header from '../Header';

const NewsPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>新闻与博客 - 科技公司官网</title>
                <meta name="description" content="获取科技公司的最新动态、行业新闻和技术文章" />
            </Head>
            {/* 使用独立的 Header 组件 */}
            <Header />
            <div className="w-full flex justify-center text-center py-10">
                <div className="max-w-7xl">
                    <div className="w-full mx-auto py-16 px-4">
                        <div className="w-full text-center">
                            <Typography level="h3" className="mb-4 sm:text-base md:text-lg">
                                最新消息
                            </Typography>
                            <Typography className="mb-4 sm:text-base md:text-lg">
                                了解協會的最新動態與資訊
                            </Typography>
                        </div>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-4">
                            <div className="rounded-lg text-left transform transition-all duration-300 hover:scale-105 space-y-4">
                                <img
                                    src="https://www.hkjsse.org/_next/image?url=%2Fassets%2Fblog%2Fhku-principal-summit%2Fcover.jpg&w=3840&q=75&dpl=dpl_CeyNzWBVywSzJcxQzS7MouXLZhDp"
                                    className="rounded-md w-full object-contain"
                                    alt=""
                                />
                                <Typography
                                    level="h4"
                                    className=" sm:text-sm md:text-base hover:underline cursor-pointer"
                                >
                                    港大成功舉辦港澳校長高峰午宴 共譜教育合作新篇章
                                </Typography>
                                <Typography level="title-md" className=" sm:text-sm md:text-base">
                                    March 12, 2025
                                </Typography>
                                <Typography level="title-md" className=" sm:text-sm md:text-base">
                                    由香港大學入學事務部、香港聯校科學展覽交流協會主辦，香港津貼中學議會、澳門聯校科學展覽青年協會協辦的「香港大學港澳校長高峰午宴」今日假香港大學順利舉行。活動促進港大與港澳中學教育界建立更緊密的聯繫，共同探討最新的招生資訊與學術發展。
                                </Typography>
                            </div>
                            <div className="rounded-lg text-left transform transition-all duration-300 hover:scale-105 space-y-4">
                                <img
                                    src="https://www.hkjsse.org/_next/image?url=%2Fassets%2Fblog%2Faild-competition-2024%2Fcover.png&w=3840&q=75&dpl=dpl_CeyNzWBVywSzJcxQzS7MouXLZhDp"
                                    className="rounded-md w-full object-contain"
                                    alt=""
                                />
                                <Typography
                                    level="h4"
                                    className=" sm:text-sm md:text-base hover:underline cursor-pointer"
                                >
                                    港大成功舉辦港澳校長高峰午宴 共譜教育合作新篇章
                                </Typography>
                                <Typography level="title-md" className=" sm:text-sm md:text-base">
                                    March 12, 2025
                                </Typography>
                                <Typography level="title-md" className=" sm:text-sm md:text-base">
                                    由香港大學入學事務部、香港聯校科學展覽交流協會主辦，香港津貼中學議會、澳門聯校科學展覽青年協會協辦的「香港大學港澳校長高峰午宴」今日假香港大學順利舉行。活動促進港大與港澳中學教育界建立更緊密的聯繫，共同探討最新的招生資訊與學術發展。
                                </Typography>
                            </div>
                            <div className="rounded-lg text-left transform transition-all duration-300 hover:scale-105 space-y-4">
                                <img
                                    src="https://www.hkjsse.org/_next/image?url=%2Fassets%2Fblog%2Fhku-macau-info-day%2Fcover.jpg&w=3840&q=75&dpl=dpl_CeyNzWBVywSzJcxQzS7MouXLZhDp"
                                    className="rounded-md w-full object-contain"
                                    alt=""
                                />
                                <Typography
                                    level="h4"
                                    className=" sm:text-sm md:text-base hover:underline cursor-pointer"
                                >
                                    港大成功舉辦港澳校長高峰午宴 共譜教育合作新篇章
                                </Typography>
                                <Typography level="title-md" className=" sm:text-sm md:text-base">
                                    March 12, 2025
                                </Typography>
                                <Typography level="title-md" className=" sm:text-sm md:text-base">
                                    由香港大學入學事務部、香港聯校科學展覽交流協會主辦，香港津貼中學議會、澳門聯校科學展覽青年協會協辦的「香港大學港澳校長高峰午宴」今日假香港大學順利舉行。活動促進港大與港澳中學教育界建立更緊密的聯繫，共同探討最新的招生資訊與學術發展。
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 使用独立的 Footer 组件 */}
            <Footer />
        </div>
    );
};

export default NewsPage;
