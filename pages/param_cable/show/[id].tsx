import {IResourceComponentsProps, useNotification, useShow, useTranslate,} from "@refinedev/core";
import {ListButton, NumberField, RefreshButton, Show, TextFieldComponent as TextField,} from "@refinedev/mui";
import {Stack, Typography} from "@mui/material";
import {getServerSidePropsHandler} from "../../../src/shared/lib";
import {authProvider} from "../../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios, {AxiosError} from "axios";

const fetchAddParam2 = async (data: any) => {
    return await axios.post(`/api/parameters`, {
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

export const ParamCableShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;
    const {open, close} = useNotification();

    const record = data?.data;
    const clickHandler = () => {
        if (record) {
            fetchAddParam2({
                body: {
                    diameter_cable: record.diameter,
                    length_cut_cable: record.length_cut,
                    type_dr: record.typ_e
                },
                query: "param_cable"
            }).then((res) => {
                open?.({
                    type: "success",
                    message: "Параметры добавлены в Paradigma",
                    description: res?.data?.message,
                })
            }).catch((e: AxiosError) => {
                console.log(e)
                const message = (e.response?.data as { message: string }).message
                if (message === "Request failed with status code 500") {
                    open?.({
                        type: "error",
                        message: "Обратитесь к сотрудникам организации DIS",
                        description: "Ошибка сервера",
                    })
                    return
                }
                open?.({
                    type: "error",
                    message,
                    description: "Ошибка добавления",
                })
            })
        }
    }
    return (
        <Show isLoading={isLoading} headerButtons={({listButtonProps, refreshButtonProps}) => <>
            <ListButton {...listButtonProps}/><RefreshButton {...refreshButtonProps}/>
            <Button onClick={clickHandler}>
                <AddIcon/>Добавить параметры в Paradigma
            </Button>
        </>}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_cable.fields.typ_e")}
                </Typography>
                <TextField value={record?.typ_e}/>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_cable.fields.diameter")}
                </Typography>
                <NumberField value={record?.diameter ?? ""}/>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_cable.fields.length_cut")}
                </Typography>
                <NumberField value={record?.length_cut ?? ""}/>
            </Stack>
        </Show>
    );
}
export default ParamCableShow


export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_cable"})
}


