import {IResourceComponentsProps, useNotification, useShow, useTranslate,} from "@refinedev/core";
import {
    BooleanField,
    ListButton,
    NumberField,
    RefreshButton,
    Show,
    TextFieldComponent as TextField,
} from "@refinedev/mui";
import {Modal, Stack, Typography} from "@mui/material";
import {getServerSidePropsHandler} from "src/shared/lib";
import {authProvider} from "../../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import axios, {AxiosError} from "axios";
import {useState} from "react";

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

export const ParamPerevodnikShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;

    const {open, close} = useNotification();

    const record = data?.data;
    const clickHandler = () => {
        if (record) {
            fetchAddParam2({
                body: {
                    addition: record.addition,
                    class_perev: record.class_perev,
                    coupling_end: record?.first?.name,
                    destiny: record?.destiny,
                    inner_diameter: record?.inner_diameter,
                    nipple_end: record?.second?.name,
                    outer_diameter: record.outer_diameter,
                    subclass_perev: record.subclass_perev,
                },
                query: "param_perevodnik"
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
        <Show
            title={
                <Typography role={"h1"} variant="h5">
                    Показать переводник
                </Typography>
            }
            isLoading={isLoading} headerButtons={({listButtonProps, refreshButtonProps}) => <>
            <ListButton {...listButtonProps}/><RefreshButton {...refreshButtonProps}/>
            <Button onClick={clickHandler}>
                <AddIcon/>Добавить параметры в Paradigma
            </Button>
        </>}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Тип переводника
                </Typography>
                <TextField value={record?.class_perev}/>
                <Typography variant="body1" fontWeight="bold">
                    Подтип переводника
                </Typography>
                <TextField value={record?.subclass_perev}/>
                <Typography variant="body1" fontWeight="bold">
                    Верх
                </Typography>
                <TextField value={record?.first?.name}/>
                <Typography variant="body1" fontWeight="bold">
                    Низ
                </Typography>
                <TextField value={record?.second?.name}/>
                <Typography variant="body1" fontWeight="bold">
                    Наружный диаметр
                </Typography>
                <NumberField value={record?.outer_diameter ?? ""}/>
                <Typography variant="body1" fontWeight="bold">
                    Внутренний диаметр
                </Typography>
                <NumberField value={record?.inner_diameter ?? ""}/>
                <Typography variant="body1" fontWeight="bold">
                    Наличие лавильной шейки
                </Typography>
                <BooleanField value={record?.addition}/>
            </Stack>
        </Show>
    );
};

export default ParamPerevodnikShow

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_perevodmik"})
}
