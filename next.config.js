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
            // {
            //     source: '/ua/api/:path*',
            //     destination: 'http://localhost:82/ua/api/:path*',
            // },
        ]
    },
};

module.exports = nextConfig


// module.exports = () => {
//   const rewrites = () => {
//     return {
//       source: "/:path",
//       destination: "http://127.0.0.1:3000"
//     }
//   }
//   return {
//     i18n,
//     transpilePackages: ["@refinedev/nextjs-router"],
//     rewrites
//   }
// }