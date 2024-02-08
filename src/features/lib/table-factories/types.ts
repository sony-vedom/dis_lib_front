import {GridColDef} from "@mui/x-data-grid";

interface Translate {
    (key: string, options?: any, defaultMessage?: (string | undefined)): string,
    (key: string, defaultMessage?: (string | undefined)): string
}

export type TTableFactory = (translate: Translate) => () => GridColDef<any, any, any>[]
