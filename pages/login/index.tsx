import {AuthPage, ThemedTitleV2} from "@refinedev/mui";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import {AppIcon} from "src/components/app-icon";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {titleStyles} from "@refinedev/mui/src/components/pages/auth/components/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {BaseRecord, HttpError, LoginFormTypes, useActiveAuthProvider, useLogin, useTranslate} from "@refinedev/core";
import {Card, CardContent} from "@mui/material";
import * as React from "react";

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
})
    .required()
export default function Login() {
    const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
        defaultValues: {email: "", password: ""},
        reValidateMode: undefined,
        shouldUseNativeValidation: false,
    });
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = methods;

    const authProvider = useActiveAuthProvider();
    const {mutate: login, isLoading} = useLogin<LoginFormTypes>({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const translate = useTranslate();
    return (
        <AuthPage
            type="login"
            formProps={{
                defaultValues: {email: "", password: ""},
                reValidateMode: undefined,
                shouldUseNativeValidation: false,
            }}
            rememberMe={false}
            forgotPasswordLink={false}
            registerLink={false}
            renderContent={() => <>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        marginBottom: "20px",
                        overflowWrap: "break-word",
                        hyphens: "manual",
                        textOverflow: "unset",
                        whiteSpace: "pre-wrap",
                    }}
                    color="primary"
                    fontWeight={700}
                >
                    <ThemedTitleV2
                        collapsed={false}
                        text="Библиотека бурильных труб и дополнительного оборудования предназначеного для бурения"
                        icon={<AppIcon/>}
                    />
                </Typography>
                <Card>
                    <CardContent sx={{p: "32px", "&:last-child": {pb: "32px"}}}>
                        <Typography
                            component="h1"
                            variant="h5"
                            align="center"
                            sx={{
                                textAlign: "center",
                                fontSize: "24px",
                                marginBottom: "24px",
                                overflowWrap: "break-word",
                                hyphens: "manual",
                                textOverflow: "unset",
                                whiteSpace: "pre-wrap",
                            }}
                            color="primary"
                            fontWeight={700}
                        >
                            {translate("pages.login.title", "Sign in to your account")}
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit((data) => {
                                return login(data);
                            })}
                        >
                            <TextField
                                {...register("email", {
                                    required: true,
                                })}
                                id="email"
                                margin="normal"
                                fullWidth
                                label={translate(
                                    "pages.login.fields.email",
                                    "Email",
                                )}
                                error={!!errors.email}
                                name="email"
                                autoComplete="email"
                                sx={{
                                    mt: 0,
                                }}
                            />
                            <TextField
                                {...register("password", {
                                    required: true,
                                })}
                                id="password"
                                margin="normal"
                                fullWidth
                                name="password"
                                label={translate(
                                    "pages.login.fields.password",
                                    "Password",
                                )}
                                // helperText={errors?.password?.message}
                                error={!!errors.password}
                                type="password"
                                placeholder="●●●●●●●●"
                                autoComplete="current-password"
                                sx={{
                                    mb: 0,
                                }}
                            />
                            <Box
                                component="div"
                                sx={{
                                    mt: "24px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isLoading}
                                sx={{mt: "24px"}}
                            >
                                {translate("pages.login.signin", "Sign in")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </>
            }
            title={
                <ThemedTitleV2
                    collapsed={false}
                    text="Библиотека параметров"
                    icon={<AppIcon/>}
                />
            }
        />
    );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const {authenticated, redirectTo} = await authProvider.check(context);

    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);
    if (authenticated) {
        return {
            props: {
                ...translateProps,
            },
            redirect: {
                destination: redirectTo ?? "/",
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
