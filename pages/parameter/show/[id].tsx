import {FC} from "react";
import {BaseRecord, IResourceComponentsProps, useNotification, useShow, useTranslate,} from "@refinedev/core";
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
import {getServerSidePropsHandler} from "../../../src/shared/lib";
import {authProvider} from "../../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

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

export const ParameterShow: FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;
    const {open, close} = useNotification();

    const record = data?.data;
    const clickHandler = () => {
       if (record) {
           fetchAddParam2({
               body: {
                   "nominal_pipe_diameter": record.nominal_pipe_diameter,
                   "weight_foot": record.weight,
                   "reinforcement": record.reinforcement,
                   "internal_coating": record.internal_coating,
                   "pipe_inner_diameter": record.pipe_inner_diameter,
                   "lock_outside_diameter": record.lock_outside_diameter,
                   "lock_inner_diameter": record.lock_inner_diameter,
                   "strength_group": record.strength,
                   "size_range": record.size,
                   "lock_thread": record.lock_th,
                   "lock_type": record.lock_ty,
                   "wall_thickness": record.wall_thickness,
                   "length": record.length,
                   "pipe_type":  record.pipe_t,
                   "side_square": record.side_square,
                   "sub_pipe_type":  record.sub_pipe_t,
                   "name": record.name,
               },
               query: "parameter"
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

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "parameter"})
}
