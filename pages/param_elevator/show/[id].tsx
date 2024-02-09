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

export const ParamElevatorShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;

    const {open, close} = useNotification();

    const record = data?.data;
    const clickHandler = () => {
        if (record) {
            fetchAddParam2({
                body: {
                    bore_diameter: record.bore_diameter,
                    elevator_mark: record.mark,
                    nominal_diameter: record.nominal_diameter,
                    through_diameter: record.diameter,
                    tonnage: record.tonn,
                    type_pipe: record.type,
                },
                query: "param_elevator"
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
                    {translate("param_elevator.fields.mark")}
                </Typography>
                <TextField value={record?.mark}/>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_elevator.fields.diameter")}
                </Typography>
                <NumberField value={record?.diameter ?? ""}/>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_elevator.fields.type")}
                </Typography>
                <TextField value={record?.type}/>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_elevator.fields.tonn")}
                </Typography>
                <NumberField value={record?.tonn ?? ""}/>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_elevator.fields.nominal_diameter")}
                </Typography>
                <NumberField value={record?.nominal_diameter ?? ""}/>
                <Typography variant="body1" fontWeight="bold">
                    {translate("param_elevator.fields.bore_diameter")}
                </Typography>
                <TextField value={record?.bore_diameter}/>
            </Stack>
        </Show>
    );
};
export default ParamElevatorShow

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_elevator"})
}

