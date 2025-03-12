// pages/index.tsx
"use client"
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const sections = [
    { id: 'home', name: '首页' },
    { id: 'news', name: '新闻' },
    { id: 'about', name: '关于我们' },
    { id: 'contact', name: '联系我们' },
]

const newsItems = [
    {
        title: "华为发布新一代AI手机，搭载最新鸿蒙系统",
        content: "华为今日发布新一代旗舰手机，采用自研芯片，搭载最新鸿蒙操作系统，在AI性能方面有显著提升。新机型在影像系统和续航能力上都有重大突破。",
        image: "https://inews.gtimg.com/om_bt/OI3LImU5YxrF3pt2ofq3oPeWPRbEbt9kptUky4H0RXjTEAA/641",
        date: "2024-03-20"
    },
    {
        title: "特斯拉推出全新电动汽车平台，成本降低50%",
        content: "特斯拉公司宣布推出革命性的新一代电动汽车平台，预计将使生产成本降低50%，有望推动电动汽车更快普及。",
        image: "https://inews.gtimg.com/om_bt/OI3LImU5YxrF3pt2ofq3oPeWPRbEbt9kptUky4H0RXjTEAA/641",
        date: "2024-03-18"
    },
    {
        title: "OpenAI发布GPT-5，理解能力接近人类",
        content: "OpenAI正式发布GPT-5模型，在多个领域的表现已接近人类水平，特别是在逻辑推理和创造性任务方面取得重大突破。",
        image: "https://inews.gtimg.com/om_bt/OI3LImU5YxrF3pt2ofq3oPeWPRbEbt9kptUky4H0RXjTEAA/641",
        date: "2024-03-15"
    }
];

export default function Home() {
    const [activeSection, setActiveSection] = useState('home')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100
            document.querySelectorAll('section').forEach((section) => {
                const sectionTop = section.offsetTop
                const sectionHeight = section.offsetHeight
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(section.id)
                }
            })
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
            <Head>
                <title>科技公司官网</title>
            </Head>

            {/* Header */}
            <header className="fixed w-full bg-black/60 backdrop-blur-md z-50">
                <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <Image
                            src="/logo/docai.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* 移动端汉堡菜单按钮 */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* 桌面端导航 */}
                    <div className="hidden md:flex space-x-8">
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`text-lg font-medium transition-all duration-300 ${activeSection === section.id
                                    ? 'text-blue-400 border-b-2 border-blue-400'
                                    : 'text-white hover:text-blue-300 hover:translate-y-[-2px]'
                                    }`}
                            >
                                {section.name}
                            </a>
                        ))}
                    </div>

                    {/* 移动端导航菜单 */}
                    <div className={`
                        md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-transform duration-300
                        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    `}>
                        <div className="flex flex-col items-center justify-center h-full space-y-8">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-xl font-medium ${activeSection === section.id
                                        ? 'text-blue-400'
                                        : 'text-white hover:text-blue-300'
                                        }`}
                                >
                                    {section.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="pt-16">
                {/* Hero Section */}
                <section
                    id="home"
                    className="min-h-screen flex items-center justify-center px-4 md:px-6"
                >
                    <div className="container mx-auto text-center">
                        <div className="space-y-6 animate-fade-in-up">
                            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                创新驱动未来
                            </h1>
                            <p className="text-lg md:text-2xl text-gray-300 mb-8">
                                引领科技新时代，创造智能新体验
                            </p>
                        </div>
                        <div className="relative h-64 md:h-96 w-full mt-12 rounded-2xl overflow-hidden group">
                            <img
                                src="https://inews.gtimg.com/news_ls/OfgzxVYvpIKbbCHguEo8RwA34gS_JpEADdShly54jXehkAA_870492/0"
                                alt="科技背景"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>
                </section>

                {/* News Section */}
                <section
                    id="news"
                    className="py-20 bg-gray-900/50 backdrop-blur-lg"
                >
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">最新动态</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {newsItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-blue-500/20"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="object-fill h-[200px] w-full"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 line-clamp-3">
                                            {item.content}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-blue-400 text-sm">
                                                {item.date}
                                            </span>
                                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                                                阅读更多 →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    className="min-h-screen py-20 relative"
                >
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-white mb-12">关于我们</h2>
                        {/* About content */}
                        <div>
                            公开信息显示，王树国出生于1958年10月，2002年任哈尔滨工业大学校长；2014年4月任西安交通大学党委常委、校长，2017年5月任西安交通大学党委副书记、校长，2024年3月卸任。

                            官网介绍，福耀科技大学是由福耀集团董事局主席曹德旺发起，河仁慈善基金会捐资100亿创办的民办公助、非营利、公益性大学。学校位于福建省福州市高新区南屿镇流洲岛。大学定位为以理工科为主的综合性高水平研究型大学，办学层次为本科和研究生教育，目前设立材料科学与工程学院、计算机科学与工程学院、机械工程与自动化学院、车辆与交通工程学院、健康科学学院、数字经济与管理学院、马克思主义学院，以及基础教学部。
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className="min-h-screen py-20 bg-gray-800/30 backdrop-blur-lg"
                >
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-white mb-12">联系我们</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <p className="text-gray-300 text-lg">地址：XX市XX区科技大厦</p>
                                <p className="text-gray-300 text-lg">电话：400-123-4567</p>
                                <p className="text-gray-300 text-lg">邮箱：contact@tech.com</p>
                            </div>
                            <form className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="姓名"
                                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                                />
                                <input
                                    type="email"
                                    placeholder="邮箱"
                                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                                />
                                <textarea
                                    rows={4}
                                    placeholder="留言"
                                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400"
                                ></textarea>
                                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                    发送消息
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black/80 py-8">
                <div className="container mx-auto px-4 md:px-6 text-center text-gray-400">
                    <p>© 2024 科技公司 版权所有</p>
                </div>
            </footer>
        </div>
    )
}