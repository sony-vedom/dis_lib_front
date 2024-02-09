import axios, {AxiosError} from "axios";
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await axios.post("http://127.0.0.1:3000/additional-api/redirect", {...req.body}).then((r) => {
            res.status(200).send({
                message: r.data.message,
            })
        }).catch((e: AxiosError) => {
            if (e.response?.status === 409) {
                res.status(e.response?.status).send({
                    message: "response" in e ? (e.response?.data as {message: string}).message : "Ошибка",
                })
            }
            // @ts-ignore
            res.status(e.status).send({
                message: "response" in e ? (e.response?.data as { message: string })?.message : "Ошибка",
            })
        })
    } else {
        res.status(404).send({
            message: "Request failed with status code 404"
        })
    }
}
