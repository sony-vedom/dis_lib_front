// pages/api/[...all].ts
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const isDevelopment = process.env.NODE_ENV !== "production";

export const config = {
    api: {
        // Enable `externalResolver` option in Next.js
        externalResolver: true,
    },
}

export default (req: NextApiRequest, res: NextApiResponse) => (
    isDevelopment
        ? httpProxyMiddleware(req, res, {
            changeOrigin: true,
            target: "http://127.0.0.1:3000/additional-api",
            // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
            // pathRewrite: [{
            //     patternStr: "^/api/new",
            //     replaceStr: "/v2"
            // }, {
            //     patternStr: "^/api/dis",
            //     replaceStr: ""
            // }],
        })
        : res.status(404).send(null)
);