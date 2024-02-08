import React from "react";
import {List, useDataGrid,} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {IResourceComponentsProps, useTranslate} from "@refinedev/core";
import {getServerSidePropsHandler} from "src/shared/lib";
import {dataGridHookConfig, perevodnikFactory} from "src/features/lib";
import {MuiDataGrid} from "src/shared/ui";
import {authProvider} from "../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const ParamPerevodnikList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        perevodnikFactory(translate),
        [translate],
    );

    return (
        <List>
            <MuiDataGrid {...dataGridProps} columns={columns}/>
        </List>
    );
};

export default ParamPerevodnikList

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_perevodmik"})
}
