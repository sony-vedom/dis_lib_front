import { AuthBindings } from "@refinedev/core";

export interface AuthBindingsCustom extends AuthBindings {
  refresh: () => void;
}

export interface ILoginVar {
  username: string;
  password: string;
}

export interface ILoginData {
    access: string;
    refresh: string;
}

export interface IJwt {
  sub: number;
  iat: number;
  exp: number;
}