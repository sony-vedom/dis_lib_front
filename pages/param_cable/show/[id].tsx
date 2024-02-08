import {IResourceComponentsProps, useShow, useTranslate,} from "@refinedev/core";
import {NumberField, Show, TextFieldComponent as TextField,} from "@refinedev/mui";
import {Stack, Typography} from "@mui/material";
import {getServerSidePropsHandler} from "../../../src/shared/lib";
import {authProvider} from "../../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export const ParamCableShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
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


