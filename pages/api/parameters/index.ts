import axios, {AxiosError} from "axios";
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await axios.post("http://127.0.0.1:3000/additional-api/redirect", {...req.body}).then((r) => {
            res.status(200).send({
                message: r.data.message,
            })
        }).catch((e: AxiosError) => {
            res.status(Number(e.status)).send({
                message: "data" in e ? (e.data as { message: string }).message : "Ошибка",
            })
        })
    } else {
        res.status(404).send({
            message: "Request failed with status code 404"
        })
    }
}
