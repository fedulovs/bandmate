/** @type {import('next').NextConfig} */

export default {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: false,
                    },
                },
            ],
        });

        return config;
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};
