/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['inews.gtimg.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    webpack: (config) => {
        // load worker files as a urls with `file-loader`
        config.module.rules.unshift({
            test: /pdf.worker\.(min\.)?js/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        publicPath: '_next/static/worker',
                        outputPath: 'static/worker'
                    }
                }
            ]
        });

        return config;
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/calendar',
                permanent: false,
            },
        ]
    },
};

export default nextConfig;
