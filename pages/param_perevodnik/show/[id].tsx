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
    BooleanField,
} from "@refinedev/mui";
import {Typography, Stack, TableContainer, Paper, TableBody, TableRow, TableCell} from "@mui/material";
import Box from "@mui/material/Box";
import {Table} from "antd";

export const ParamPerevodnikShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;

    const record = data?.data;

    return (
        <Show title={<Typography role={"h1"} variant="h5">
            Показать переводник
        </Typography>
        } isLoading={isLoading}>
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
                destination: `${redirectTo}?to=${encodeURIComponent("/param_perevodnik")}`,
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
