import {
    ThemedLayoutV2,
    ThemedSiderV2,
    useNotificationProvider,
} from "@refinedev/antd";
import {GitHubBanner, Refine} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";
import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type {NextPage} from "next";
import {AppProps} from "next/app";
import {Header} from "@components/header";
import {ColorModeContextProvider} from "@contexts";
import "@refinedev/antd/dist/reset.css";
import {App as AntdApp} from "antd";
import {authProvider} from "src/authProvider";
import {dataProvider} from "src/dataProvider";
import {appWithTranslation, useTranslation} from "next-i18next";


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
                Sider={(props) => <ThemedSiderV2 {...props} fixed/>}
            >
                <Component {...pageProps} />
            </ThemedLayoutV2>
        );
    };


    return (
        <>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>
                        <DevtoolsProvider>
                            <Refine
                                routerProvider={routerProvider}
                                dataProvider={dataProvider(process.env.NEXT_PUBLIC_LIB_API_URL ?? "")}
                                notificationProvider={useNotificationProvider}
                                authProvider={authProvider}
                                i18nProvider={i18nProvider}
                                resources={[
                                    {
                                        name: "event",
                                        list: "/event",
                                        // create: "/blog-posts/create",
                                        // edit: "/blog-posts/edit/:id",
                                        // show: "/blog-posts/show/:id",
                                        // meta: {
                                        //   canDelete: true,
                                        // },
                                    },
                                    {
                                        name: "blog_posts",
                                        list: "/blog-posts",
                                        create: "/blog-posts/create",
                                        edit: "/blog-posts/edit/:id",
                                        show: "/blog-posts/show/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                    {
                                        name: "categories",
                                        list: "/categories",
                                        create: "/categories/create",
                                        edit: "/categories/edit/:id",
                                        show: "/categories/show/:id",
                                        meta: {
                                            canDelete: true,
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
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </>
    );
}

export default appWithTranslation(MyApp);

