import {IResourceComponentsProps, useShow, useTranslate,} from "@refinedev/core";
import {BooleanField, NumberField, Show, TextFieldComponent as TextField,} from "@refinedev/mui";
import {Stack, Typography} from "@mui/material";
import {getServerSidePropsHandler} from "src/shared/lib";
import {authProvider} from "../../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export const ParamPerevodnikShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;

    const record = data?.data;

    return (
        <Show
            title={
                <Typography role={"h1"} variant="h5">
                    Показать переводник
                </Typography>
            }
            isLoading={isLoading}>
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
