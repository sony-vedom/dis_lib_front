import type {NextApiRequest, NextApiResponse} from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

const isDevelopment = process.env.NODE_ENV !== "production";

export const config = {
    api: {
        externalResolver: true,
    },
}

export default (req: NextApiRequest, res: NextApiResponse) => (
    isDevelopment
        ? httpProxyMiddleware(req, res, {
            changeOrigin: true,
            target: "http://127.0.0.1:3000/additional-api",
        })
        : res.status(404).send(null)
);
