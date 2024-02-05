import axios, {AxiosError} from "axios";
import type {NextApiRequest, NextApiResponse} from "next";


// export default function (req: NextApiRequest, res: NextApiResponse) {
//     axios.get("http://127.0.0.1:3000/additional-api/redirect").then(r => {
//         console.log(r.data)
//     })
//     res.status(200).send({
//         message: "приветик"
//     })
//
//
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await axios.post("http://127.0.0.1:3000/additional-api/redirect", {...req.body}).then((r) => {
            res.status(200).send({
                message: r.data.message,
            })
        }).catch((e: AxiosError) => {
            res.status(Number(e.status)).send({
                // @ts-ignore
                message: e.data.message,
            })
        })
        // res.status(200).send({
        //     message: "приветик"
        // })
    } else {
        res.status(200).send({
            message: "приветик"
        })
    }
}
