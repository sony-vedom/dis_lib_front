import React from "react";
import {List, useDataGrid,} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {MuiDataGrid} from "src/shared/ui";
import {IResourceComponentsProps, useTranslate} from "@refinedev/core";
import {getServerSidePropsHandler} from "../../src/shared/lib";
import {dataGridHookConfig, elevatorFactory} from "src/features/lib";
import {authProvider} from "../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export const ParamElevatorList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        elevatorFactory(translate),
        [translate],
    );

    return (
        <List>
            <MuiDataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};

export default ParamElevatorList


export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_elevator"})
}

