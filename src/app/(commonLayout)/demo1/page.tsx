'use client';

import { Button, Fade } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Header from './Header';
// 引入 Footer 组件
import { Typography } from '@mui/joy';
import { useEffect, useRef } from 'react';
import Footer from './Footer';

const HomePage = () => {
    const textRef = useRef<HTMLSpanElement>(null);
    const text = '创新科技，引领未来';

    useEffect(() => {
        if (textRef.current) {
            let index = 0;
            const intervalId = setInterval(() => {
                if (textRef.current && index < text.length) {
                    textRef.current.textContent += text[index];
                    index++;
                } else {
                    clearInterval(intervalId);
                }
            }, 200); // 每个字显示的间隔时间，单位为毫秒
            return () => clearInterval(intervalId);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>科技公司官网</title>
                <meta name="description" content="科技公司宣传网站" />
            </Head>
            {/* 使用独立的 Header 组件 */}
            <Header />
            <div className="relative h-[80vh] overflow-hidden pt-16">
                {' '}
                {/* 添加 pt-16 以避免内容被 AppBar 遮挡 */}
                <img
                    src="https://www.hkjsse.org/_next/image?url=%2Fassets%2Fimages%2Fcover.jpg&w=3840&q=75&dpl=dpl_CeyNzWBVywSzJcxQzS7MouXLZhDp"
                    alt="科技背景"
                    className=" object-contain"
                />
                <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                    <Fade in={true} timeout={1000}>
                        <div
                            style={{
                                transform: 'scale(0.5)',
                                opacity: 0,
                                animation: 'scaleIn 1s forwards'
                            }}
                        >
                            {/* 在手机端减小标题字体大小 */}
                            <Typography
                                level="h2"
                                sx={{ color: 'white', fontWeight: 'bold', marginBottom: 4 }}
                            >
                                创新科技，引领未来
                            </Typography>
                            {/* 在手机端减小副标题字体大小 */}
                            <Typography
                                level="body-md"
                                sx={{ color: 'white', fontWeight: 'bold', marginBottom: 4 }}
                            >
                                我们致力于为客户提供最优质的科技产品和服务
                            </Typography>
                            {/* 在手机端减小按钮大小 */}
                            <Button variant="contained" color="primary" size="small">
                                了解更多
                            </Button>
                        </div>
                    </Fade>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 100"
                        preserveAspectRatio="none"
                        className="w-full h-16 md:h-24"
                    >
                        <path
                            fill="#f3f4f6"
                            fill-opacity="1"
                            d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,53.3C672,64,768,96,864,106.7C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
                <style jsx>{`
                    @keyframes scaleIn {
                        from {
                            transform: scale(0.5);
                            opacity: 0;
                        }
                        to {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                `}</style>
            </div>
            <div className="w-full flex justify-center text-center">
                <div className="max-w-7xl">
                    <div className="w-full mx-auto py-16 px-4">
                        <div className="w-full text-center">
                            <Typography level="h3" className="mb-4 sm:text-base md:text-lg">
                                关于我们
                            </Typography>
                        </div>
                        <div className="flex flex-row mt-8 flex-wrap items-center">
                            <div className="flex-1">
                                <img
                                    src="https://www.hkjsse.org/_next/image?url=%2Fassets%2Fimages%2Fcover.jpg&w=3840&q=75&dpl=dpl_CeyNzWBVywSzJcxQzS7MouXLZhDp"
                                    className="rounded-md w-full object-contain"
                                    alt=""
                                />
                            </div>
                            <div className="  ml-4 flex flex-row flex-wrap  flex-0 sm:flex-1    ">
                                <span className="text-xl text-left">
                                    香港聯校科學展覽交流協會（HKJSSE）是一個由歷屆香港聯校科學展覽的學生領袖組成的平台，致力推動香港的
                                    STEAM 教育發展，並促進校際及跨地區的科學交流。
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto py-16 px-4">
                        <div className="w-full text-center">
                            <Typography level="h3" className="mb-4 sm:text-base md:text-lg">
                                最新消息
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

export default HomePage;
