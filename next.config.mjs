/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            if (Array.isArray(config.resolve.alias))
                // server일시 browser를 제외 시킨다
                config.resolve.alias.push({ name: "msw/browser", alias: false });
            else config.resolve.alias["msw/browser"] = false;
        } else {
            if (Array.isArray(config.resolve.alias))
                config.resolve.alias.push({ name: "msw/node", alias: false });
            else config.resolve.alias["msw/node"] = false;
        }
        return config;
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: 'crabit-bucket-dev.s3.ap-northeast-2.amazonaws.com',
                port: "",
                pathname: "/**",
            },

        ],
    },
};

export default nextConfig;
