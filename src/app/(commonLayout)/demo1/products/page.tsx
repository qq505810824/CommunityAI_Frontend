import { Typography } from '@mui/material';
import Head from 'next/head';
import Header from '../Header';
import Footer from '../Footer';

const ProductsPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>产品与服务 - 科技公司官网</title>
                <meta name="description" content="科技公司的产品与服务介绍" />
            </Head>
            {/* 使用独立的 Header 组件 */}
            <Header />
            <div className="container mx-auto py-16 px-4">
                <Typography variant="h2" className="text-center mb-8">
                    产品与服务
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            产品 1
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            产品 1 的详细介绍
                        </Typography>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            产品 2
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            产品 2 的详细介绍
                        </Typography>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            服务 1
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            服务 1 的详细介绍
                        </Typography>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <Typography variant="h5" className="mb-4">
                            服务 2
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            服务 2 的详细介绍
                        </Typography>
                    </div>
                </div>
            </div>
            {/* 使用独立的 Footer 组件 */}
            <Footer />
        </div>
    );
};

export default ProductsPage;
