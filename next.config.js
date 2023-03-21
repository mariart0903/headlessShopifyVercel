/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    webpack: (config, { dev }) => {
        config.experiments = { topLevelAwait: true };
        return config;
    },
    images: {
        domains: ['cdn.shopify.com'],
    },
}

module.exports = nextConfig
