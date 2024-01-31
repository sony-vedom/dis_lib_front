import nookies from "nookies";
import axios, {AxiosError, AxiosResponse} from "axios";
import {AuthBindingsCustom, ILoginData, ILoginVar} from "./type";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {COOKIE_AUTH_ACCESS, COOKIE_AUTH_REFRESH} from "src/utils/Cookies";

export const authProvider: AuthBindingsCustom = {
    login: async ({email, password}) => {
        try {
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
                nookies.set(null, COOKIE_AUTH_REFRESH, refresh);
                nookies.set(null, COOKIE_AUTH_ACCESS, access);
                return {
                    success: true,
                    redirectTo: "/",
                };
            }

            return {
                success: false,
                error: {
                    name: "Ошибка ввода",
                    message: "Некорректное имя пользовательвателя или пароль",
                },
            };
        } catch (e) {
            return {
                success: false,
                error: {
                    name: "Ошибка ввода",
                    message: "Некорректное имя пользовательвателя или пароль",
                },
            };
        }
    },
    refresh: async (responseUrl) => {
        console.log(nookies.get(null))
        const {
            data: {
                access
            },
        } = await axios.post<ILoginData>(`${process.env.NEXT_PUBLIC_LIB_API_URL}/token/refresh/`, {
            "refresh": nookies.get(null)?.[COOKIE_AUTH_REFRESH]
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (access) {
            nookies.set(null, COOKIE_AUTH_REFRESH, access);
        }
    },
    logout: async () => {
        nookies.destroy(null, COOKIE_AUTH_ACCESS);
        nookies.destroy(null, COOKIE_AUTH_REFRESH);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async (ctx: any) => {
        const cookies = nookies.get(ctx);
        if (cookies[COOKIE_AUTH_ACCESS]) {
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
        return {error};
    },
};
