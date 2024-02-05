import type {NextApiRequest, NextApiResponse} from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req: NextApiRequest, res: NextApiResponse) => (
    httpProxyMiddleware(req, res, {
        changeOrigin: true,
        target: "http://127.0.0.1:3000/additional-api",
        // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
        // pathRewrite: [{
        //     patternStr: "^/api/new",
        //     replaceStr: "/v2"
        // }, {
        //     patternStr: "^/api",
        //     replaceStr: ""
        // }],
    })
);
