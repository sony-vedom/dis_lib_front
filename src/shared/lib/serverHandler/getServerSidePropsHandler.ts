import {SSRConfig} from "next-i18next";
interface getServerSidePropsHandlerParams {
    routeName: string,
    authenticated: boolean,
    redirectTo: string | undefined,
    translateProps: SSRConfig
}

export const getServerSidePropsHandler = (params: getServerSidePropsHandlerParams) => {
    const {redirectTo, translateProps, authenticated, routeName} = params
    if (!authenticated) {
        return {
            props: {
                ...translateProps,
            },
            redirect: {
                destination: `${redirectTo}?to=${encodeURIComponent(`${routeName}`)}`,
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

