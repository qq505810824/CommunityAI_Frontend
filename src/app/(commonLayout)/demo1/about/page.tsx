import { Card, Typography } from '@mui/joy';
import Head from 'next/head';
import Footer from '../Footer';
import Header from '../Header';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>关于我们 - 科技公司官网</title>
                <meta name="description" content="了解科技公司的发展历程、团队成员和企业文化" />
            </Head>
            {/* 使用独立的 Header 组件 */}
            <Header />
            <div className="w-full flex justify-center mx-auto py-16 px-4">
                <div className=" max-w-4xl">
                    <div className="w-full text-center">
                        <Typography level="h3" className="mb-4 sm:text-base md:text-lg">
                            关于我们
                        </Typography>
                        <Typography className="mb-4 sm:text-base md:text-lg">
                            推動創新教育•促進科學交流
                        </Typography>
                    </div>
                    <div className="flex flex-row mt-8 flex-wrap items-center">
                        <div className="flex-0">
                            <img
                                src="https://www.hkjsse.org/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=828&q=75&dpl=dpl_CeyNzWBVywSzJcxQzS7MouXLZhDp"
                                className="rounded-md w-[300px] object-contain"
                                alt=""
                            />
                        </div>
                        <div className="  ml-4 flex flex-row flex-wrap  flex-1 sm:flex-1 space-y-4    ">
                            <p className="text-2xl font-semibold">
                                香港聯校科學展覽交流協會（HKJSSE）
                            </p>
                            <span className="text-left">
                                香港聯校科學展覽交流協會（HKJSSE）是一個由歷屆香港聯校科學展覽（Joint
                                School Science
                                Exhibition，JSSE）的學生領袖組成的平台，致力推動香港的 STEAM
                                （科學、技術、工程、藝術、數學）教育發展，並促進校際及跨地區的科學交流。
                                我們希望透過創新思維與科研實踐，讓年輕人探索科技的可能性，並培養他們以科學知
                                識解決社會問題的能力。我們不僅支援本地中學生在科技創新上的成長，也積極促進
                                與國際及大灣區的科研合作與交流。
                            </span>
                        </div>
                    </div>
                    <div className="my-8">
                        <Card variant="soft" color="primary" size="md">
                            <Typography level="title-lg" sx={{ fontSize: 22, color: '#2196f3' }}>
                                我們的使命
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                                🔬 推動香港的 STEAM 教育發展
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                                🌐 促進校際及跨地區的科學交流
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                                💡 培養年輕人以科學知識解決社會問題的能力
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                                🤝 促進與國際及大灣區的科研合作
                            </Typography>
                        </Card>
                    </div>
                    <div className="my-8 text-center">
                        <Typography level="h2">主要合作領域</Typography>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card
                                sx={{
                                    textAlign: 'left',
                                    '&:hover': { boxShadow: 'md' }
                                }}
                            >
                                <Typography level="title-lg" sx={{ fontSize: 22 }}>
                                    🇲🇴 澳門聯校科學展覽合作
                                </Typography>

                                <Typography level="body-md">
                                    我們與澳門聯校科學展覽保持緊密合作，透過學生代表團互訪、科技交流營、創新項目分享會及聯合競賽，讓兩地學生交流學習、拓展視野。HKJSSE
                                    鼓勵港澳學生組隊參與 STEAM
                                    創新比賽，共同研發科創項目，提供技術指導及專業支援，提升團隊的研發能力及競爭力。
                                </Typography>
                            </Card>
                            <Card
                                sx={{
                                    textAlign: 'left',
                                    '&:hover': { boxShadow: 'md' }
                                }}
                            >
                                <Typography level="title-lg" sx={{ fontSize: 22 }}>
                                    🔗 大灣區科研合作
                                </Typography>

                                <Typography level="body-md">
                                    HKJSSE
                                    積極拓展與大灣區科研機構、高等院校及科技企業的合作，舉辦參訪學習計劃，讓學生親身體驗先進技術，了解行業應用趨勢。我們亦籌辦區域創新比賽與學術研討會，搭建跨地域協作平台，推動來自不同城市的青年共同探索創新技術。
                                </Typography>
                            </Card>
                        </div>
                    </div>
                    <div className="my-8">
                        <Card
                            variant="soft"
                            size="md"
                            sx={{
                                backgroundColor: '#eee'
                            }}
                        >
                            <Typography level="title-lg" sx={{ fontSize: 22 }}>
                                未来展望
                            </Typography>
                            <Typography sx={{ fontSize: 18 }}>
                                未來，HKJSSE
                                將進一步深化港澳及大灣區科研合作，拓展更多跨區域創新平台與學
                                術交流機會，促使本地學生與區內科技精英協作，共同探索前沿科技。
                                <br />
                                <br />
                                我們相信，透過區域間的緊密合作，能夠加快人才培養，推動整個區域科技創新發展，
                                為未來科技發展作出貢獻。
                            </Typography>
                        </Card>
                    </div>
                </div>
            </div>
            {/* 使用独立的 Footer 组件 */}
            <Footer />
        </div>
    );
};

export default AboutPage;
