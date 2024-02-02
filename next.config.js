const { i18n } = require("./next-i18next.config");
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  i18n,
  transpilePackages: ["@refinedev/nextjs-router"],
};

//
//
// const remotes = (isServer) => {
//   const location = isServer ? 'ssr' : 'chunks';
//   return {
//     // specify remotes
//     remote: `remote@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
//   };
// }
//
// const nextConfig = {
//   reactStrictMode: true,
//   webpack(config, { isServer }) {
//     config.plugins.push(
//         new NextFederationPlugin({
//           name: 'host',
//           filename: 'static/chunks/remoteEntry.js',
//           remotes: remotes(isServer),
//           exposes: {
//             // Host app also can expose modules
//           }
//         })
//     );
//
//     return config;
//   },
// }
