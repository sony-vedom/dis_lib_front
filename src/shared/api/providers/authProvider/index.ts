import nookies from "nookies";
import axios, {AxiosResponse} from "axios";
import {AuthBindingsCustom, IJwt, ILoginData, ILoginVar} from "./type";
import {COOKIE_AUTH_ACCESS, COOKIE_AUTH_REFRESH} from "../../lib";
import {dataProvider} from "../dataProvider";
import {DBEntities} from "../dataProvider/types";

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
        // const auth = nookies.get()[COOKIE_AUTH_ACCESS];
        // if (auth) {
        //     const adminId = jwtDecode<IJwt>(auth)?.sub
        //
        //
        //     const admin = await dataProvider(process.env.API_URL as string).getOne({
        //         resource: DBEntities.ADMINS,
        //         id: adminId.id,
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
