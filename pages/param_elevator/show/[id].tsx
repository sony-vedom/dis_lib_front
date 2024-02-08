import {IResourceComponentsProps, useShow, useTranslate,} from "@refinedev/core";
import {NumberField, Show, TextFieldComponent as TextField,} from "@refinedev/mui";
import {Stack, Typography} from "@mui/material";
import {getServerSidePropsHandler} from "../../../src/shared/lib";
import {authProvider} from "../../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export const ParamElevatorShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
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

