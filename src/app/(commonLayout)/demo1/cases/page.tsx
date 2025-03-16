import { Typography } from '@mui/material';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';

const CasesPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>案例展示 - 科技公司官网</title>
                <meta name="description" content="查看科技公司的成功案例" />
            </Head>
            {/* 使用独立的 Header 组件 */}
            <Header />
            <div className="container mx-auto py-16 px-4">
                <Typography variant="h2" className="text-center mb-8">
                    案例展示
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            案例 1
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            案例 1 的详细介绍
                        </Typography>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            案例 2
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            案例 2 的详细介绍
                        </Typography>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            案例 3
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            案例 3 的详细介绍
                        </Typography>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            案例 4
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            案例 4 的详细介绍
                        </Typography>
                    </div>
                </div>
            </div>
            {/* 使用独立的 Footer 组件 */}
            <Footer />
        </div>
    );
};

export default CasesPage;