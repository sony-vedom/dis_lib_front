import React from "react";
import {List, useDataGrid,} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {IResourceComponentsProps, useTranslate} from "@refinedev/core";
import {getServerSidePropsHandler} from "../../src/shared/lib";
import {Box} from "@mui/material";
import {dataGridHookConfig, paramCableFactory} from "src/features/lib";
import {MuiDataGrid} from "src/shared/ui";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "../../src/shared/api";

export const ParamCableList: React.FC<IResourceComponentsProps> = (props, context) => {
    const translate = useTranslate();
    const {dataGridProps} = useDataGrid(dataGridHookConfig);
    const columns = React.useMemo<GridColDef[]>(
        paramCableFactory(translate),
        [translate],
    );

    return (
        <List>
            <Box sx={{maxWidth: "1000px"}}>
                <MuiDataGrid {...dataGridProps} columns={columns} autoHeight/>
            </Box>
        </List>
    );
};

export default ParamCableList

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_cable"})
}
