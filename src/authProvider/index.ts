import nookies from "nookies";
import axios, {AxiosResponse} from "axios";
import {AuthBindingsCustom, ILoginData, ILoginVar} from "./type";


export const COOKIE_AUTH = 'auth'
export const COOKIE_AUTH_REFRESH = 'auth_refresh'

export const authProvider: AuthBindingsCustom = {
    login: async ({email, password}) => {

        const {
            data: {
                refresh,
                access
            },
        } = await axios.post<ILoginData, AxiosResponse<ILoginData>, ILoginVar>(`${process.env.NEXT_PUBLIC_LIB_API_URL}/token/`, {
            username: email,
            password,
        })

        if (refresh && access) {
            nookies.set(null, COOKIE_AUTH, refresh);
            nookies.set(null, COOKIE_AUTH_REFRESH, access);
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: {
                name: "LoginError",
                message: "Invalid username or password",
            },
        };
    },
    refresh: async () => {
        const {
            data: {
                refresh,
                access
            },
        }= await axios.post<ILoginData>(`${process.env.NEXT_PUBLIC_LIB_API_URL}/refresh`, null, {
            headers: {
                'refresh-token': nookies.get(null)?.[COOKIE_AUTH_REFRESH],
            },
        })

        if (access && refresh) {
            nookies.set(null, COOKIE_AUTH, access);
            nookies.set(null, COOKIE_AUTH_REFRESH, access);
        }
    },
    logout: async () => {
        nookies.destroy(null, COOKIE_AUTH);
        nookies.destroy(null, COOKIE_AUTH_REFRESH);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async (ctx: any) => {
        const cookies = nookies.get(ctx);
        if (cookies[COOKIE_AUTH]) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            logout: true,
            redirectTo: "/login",
        };
    },
    getIdentity: async () => {
        // const auth = nookies.get()[COOKIE_AUTH];
        //
        // if (auth) {
        //     const adminId = jwtDecode<IJwt>(auth)?.sub
        //
        //     const admin = await dataProvider(env.API_URL as string).getOne({
        //         resource: DBEntities.ADMINS,
        //         id: adminId,
        //     });
        //
        //     return admin.data;
        // }
        // return null;
    },
    onError: async (error) => {
        console.error(error);
        return {error};
    },
};
