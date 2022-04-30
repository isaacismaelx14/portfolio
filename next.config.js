/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'i.imgur.com',
            'github-readme-streak-stats.herokuapp.com',
            'github-readme-stats.vercel.app',
        ],
    },
};

module.exports = nextConfig
