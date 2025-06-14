'use client';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/joy';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import './style.css';

interface ViewProps {
    title: string;
    section: string;
    setSection: any;
    links: any[];
}

export default function HeaderView(props: ViewProps) {
    const { title, section, setSection, links } = props;

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 移動端選單狀態
    const pathname = usePathname(); // 獲取當前路徑
    const showSection = (section: string) => {
        setSection(section);
    };
    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-800 border-b border-gold-400/20 px-4 md:px-8 py-4`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden flex items-center p-2 rounded-md text-gold-400 hover:text-gold-500 transition-colors focus:outline-none"
                            aria-expanded={isMenuOpen}
                            aria-label="打開選單"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                        <div className="text-2xl font-luxury font-bold text-gold-400">{title}</div>
                        <nav className="hidden md:flex space-x-6 ml-8">
                            {links.map((link) => {
                                return (
                                    <button
                                        key={link.href}
                                        onClick={() => {
                                            showSection(link.href);
                                        }}
                                        className="nav-link text-white hover:text-gold-400 transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex items-center space- x-4">
                        <div className="relative">
                            <FontAwesomeIcon icon={faBell} className="text-gold-400 text-2xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br ml-4 from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                            <span className="text-gray-900 font-semibold">JD</span>
                        </div>{' '}
                    </div>
                </div>

                {/* 移動端下拉選單 */}
                <div
                    className={` md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="px-4 pt-4 pb-3 space-y-1 shadow-inner">
                        {links.map((link) => {
                            const isActive = section == link.href;
                            //   const isActive =
                            // pathname === link.href ||
                            // (pathname.startsWith(link.href) && link.href !== '/');

                            return (
                                <Link
                                    key={link.href}
                                    // href={link.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors 
                              ${isActive ? 'text-white bg-gold-500' : 'text-gold-400'} `}
                                    onClick={() => {
                                        showSection(link.href);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </header>
        </>
    );
}
