import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import {IResourceComponentsProps, useNotification, useShow, useTranslate,} from "@refinedev/core";
import {
    BooleanField,
    ListButton,
    NumberField,
    RefreshButton,
    Show,
    TextFieldComponent as TextField,
} from "@refinedev/mui";
import {Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import axios, {AxiosError} from "axios";


//use axios as you normally would, but specify httpsAgent in the config
// const fetchAddParam = async (data: any) => {
//     // const httpsAgent = new HttpsProxyAgent("http://127.0.0.1:3000")
//     // const ax = axios.create({httpsAgent});
//     const res = await axios.post(`${process.env.NEXT_PUBLIC_FRONT_PARADIGMA_API_URL}/redirect`, {...data}, {
//         headers: {
//             "Content-Type": "application/json",
//             "Accepts":"application/json"
//         }
//     }).then((res) => {
//         return res
//     })
//     return res
// }

const fetchAddParam2 = async (data: any) => {
    return await axios.post(`/api/new`, {
        ...data,
    }, {
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        }
    }).then((res) => {
        return res
    })
}

//     const res = fetch('http://127.0.0.1:5000/api/new', {
//         headers: {
//             "Content-Type": "application/json",
//             "Accepts": "application/json"
//         }
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             return data
//         })
//     return res
// }
export const ParameterShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;
    const {open, close} = useNotification();

    const record = data?.data;
    const clickHandler = () => {
        // const asd = "weight_foot" in record ?
        fetchAddParam2({
            ...record,
            lock_thread: record?.lock_th,
            lock_type: record?.lock_ty,
            weight_foot: record?.weight
        }).then((res) => {
            open?.({
                type: "success",
                message: "Параметры трубы добавлены в Paradigma",
                description: res?.data?.message,
            })
        }).catch((e: AxiosError) => {
            const data = JSON.parse(e.config?.data)
            open?.({
                type: "success",
                // @ts-ignore
                message: `${e?.data?.message}`,
                description: "Ошибка добавления",
            })
        })
    }

    return (
        <Show isLoading={isLoading} headerButtons={({listButtonProps, refreshButtonProps}) => <>
            <ListButton {...listButtonProps}/><RefreshButton {...refreshButtonProps}/>
            <Button onClick={clickHandler}>
                <AddIcon/>Добавить трубу в Paradigma
            </Button>
        </>}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.nominal_pipe_diameter")}
                </Typography>
                <NumberField value={record?.nominal_pipe_diameter ?? ""}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.reinforcement")}
                </Typography>
                <BooleanField value={record?.reinforcement}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.internal_coating")}
                </Typography>
                <BooleanField value={record?.internal_coating}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.weight")}
                </Typography>
                <NumberField value={record?.weight ?? ""}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.pipe_inner_diameter")}
                </Typography>
                <NumberField value={record?.pipe_inner_diameter ?? ""}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.lock_outside_diameter")}
                </Typography>
                <NumberField value={record?.lock_outside_diameter ?? ""}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.lock_inner_diameter")}
                </Typography>
                <NumberField value={record?.lock_inner_diameter ?? ""}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.strength")}
                </Typography>
                <TextField value={record?.strength}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.size")}
                </Typography>
                <TextField value={record?.size}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.lock_th")}
                </Typography>
                <TextField value={record?.lock_th}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.lock_ty")}
                </Typography>
                <TextField value={record?.lock_ty}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.wall_thickness")}
                </Typography>
                <NumberField value={record?.wall_thickness ?? ""}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.length")}
                </Typography>
                <NumberField value={record?.length ?? ""}/>

                <Typography variant="body1" fontWeight="bold">
                    {translate("parameter.fields.pipe_t")}
                </Typography>
                <TextField value={record?.pipe_t}/>

                <>
                    {record?.side_square != null && record?.side_square !== "."
                        && <>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("parameter.fields.side_square")}
                            </Typography>
                            <NumberField value={record?.side_square}/>
                        </>
                    }
                </>
                <>
                    {record?.sub_pipe_t && record?.sub_pipe_t !== "."
                        && <>
                            <Typography variant="body1" fontWeight="bold">
                                {translate("parameter.fields.sub_pipe_t")}
                            </Typography>
                            <NumberField value={record?.sub_pipe_t}/>
                        </>
                    }
                </>

            </Stack>
        </Show>
    );
};

export default ParameterShow

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const {authenticated, redirectTo} = await authProvider.check(context);

    const translateProps = await serverSideTranslations(context.locale ?? "ru", [
        "common",
    ]);

    if (!authenticated) {
        return {
            props: {
                ...translateProps,
            },
            redirect: {
                destination: `${redirectTo}?to=${encodeURIComponent("/categories")}`,
                permanent: false,
            },
        };
    }

    return {
        props: {
            ...translateProps,
        },
    };
};
