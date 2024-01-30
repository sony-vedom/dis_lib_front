import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import {IResourceComponentsProps, useShow, useTranslate,} from "@refinedev/core";
import {BooleanField, DateField, NumberField, Show, TextFieldComponent as TextField,} from "@refinedev/mui";
import {Stack, Typography} from "@mui/material";

export const ParameterShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;

    const record = data?.data;
    console.log(record?.side_square)
    return (
        <Show isLoading={isLoading}>
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
