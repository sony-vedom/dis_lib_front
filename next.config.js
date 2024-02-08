const {i18n} = require("./next-i18next.config");

const nextConfig = {
    i18n,
    transpilePackages: ["@refinedev/nextjs-router"],
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/additional-api/:path*',

            },
        ]
    },
};

module.exports = nextConfig
