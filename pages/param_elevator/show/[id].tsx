import {MuiShowInferencer} from "@refinedev/inferencer/mui";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
} from "@refinedev/mui";
import {Typography, Stack} from "@mui/material";

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
                destination: `${redirectTo}?to=${encodeURIComponent("/param_elevator")}`,
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
