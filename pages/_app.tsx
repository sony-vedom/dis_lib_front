import {Refine} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";
import routerProvider, {DocumentTitleHandler, UnsavedChangesNotifier,} from "@refinedev/nextjs-router";
import type {NextPage} from "next";
import {AppProps} from "next/app";
import {Header} from "@components/header";
import {ColorModeContextProvider} from "@contexts";
import "@refinedev/antd/dist/reset.css";
import {App as AntdApp} from "antd";
import {authProvider} from "src/authProvider";
import {dataProvider} from "src/dataProvider";
import {appWithTranslation, useTranslation} from "next-i18next";
import {notificationProvider, RefineSnackbarProvider, ThemedLayoutV2, ThemedTitleV2} from "@refinedev/mui";
import {AppIcon} from "@components/app-icon";
import {CssBaseline, GlobalStyles} from "@mui/material";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({Component, pageProps}: AppPropsWithLayout): JSX.Element {
    const {t, i18n} = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: string) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

        return (
            <ThemedLayoutV2
                Header={() => <Header sticky/>}
                Title={({collapsed}) => (
                    <ThemedTitleV2
                        collapsed={collapsed}
                        text="Библиотека параметров"
                        icon={<AppIcon/>}
                    />
                )}
            >
                <Component {...pageProps} />
            </ThemedLayoutV2>
        );
    };
    return (
        <>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <CssBaseline/>
                    <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
                    <RefineSnackbarProvider>
                        <DevtoolsProvider>
                            <Refine
                                routerProvider={routerProvider}
                                dataProvider={dataProvider(process.env.NEXT_PUBLIC_LIB_API_URL ?? "")}
                                notificationProvider={notificationProvider}
                                authProvider={authProvider}
                                i18nProvider={i18nProvider}
                                resources={[
                                    {
                                        name: "parameter",
                                        list: "/parameter",
                                        show: "/parameter/show/:id",
                                        meta: {
                                            canCreate: false,
                                            canEdit: false,
                                            canDelete: false,
                                        },
                                    },
                                    {
                                        name: "param_elevator",
                                        list: "/param_elevator",
                                        show: "/param_elevator/show/:id",
                                        meta: {
                                            canCreate: false,
                                            canEdit: false,
                                            canDelete: false,
                                        },
                                    },
                                    {
                                        name: "param_perevodnik",
                                        list: "/param_perevodnik",
                                        show: "/param_perevodnik/show/:id",
                                        meta: {
                                            canCreate: false,
                                            canEdit: false,
                                            canDelete: false,
                                        },
                                    },
                                    {
                                        name: "param_cable",
                                        list: "/param_cable",
                                        show: "/param_cable/show/:id",
                                        meta: {
                                            canCreate: false,
                                            canEdit: false,
                                            canDelete: false,
                                        },
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: "4n5vJN-ShqQK4-sLCN57",
                                }}
                            >
                                {renderComponent()}
                                <RefineKbar/>
                                <UnsavedChangesNotifier/>
                                <DocumentTitleHandler/>
                            </Refine>
                            <DevtoolsPanel/>

                        </DevtoolsProvider>
                    </RefineSnackbarProvider>

                </ColorModeContextProvider>
            </RefineKbarProvider>
        </>
    );
}

export default appWithTranslation(MyApp);

