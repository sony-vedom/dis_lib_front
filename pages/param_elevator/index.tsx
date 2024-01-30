import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import React from "react";
import {List, ShowButton, useDataGrid,} from "@refinedev/mui";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IResourceComponentsProps, useTranslate} from "@refinedev/core";

export const ParamElevatorList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps} = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "mark",
                flex: 1,
                headerName: translate("param_elevator.fields.mark"),
                minWidth: 200,
                align: "left",
            },
            {
                field: "diameter",
                flex: 1,
                headerName: translate("param_elevator.fields.diameter"),
                type: "number",
                minWidth: 200,
                align: "left",
            },
            {
                field: "type",
                flex: 1,
                headerName: translate("param_elevator.fields.type"),
                minWidth: 200,
                align: "left",
            },
            {
                field: "tonn",
                flex: 1,
                headerName: translate("param_elevator.fields.tonn"),
                type: "number",
                minWidth: 200,
                align: "left",
            },
            {
                field: "nominal_diameter",
                flex: 1,
                headerName: translate("param_elevator.fields.nominal_diameter"),
                type: "number",
                minWidth: 200,
                align: "left",
            },
            {
                field: "bore_diameter",
                flex: 1,
                headerName: translate("param_elevator.fields.bore_diameter"),
                minWidth: 200,
                align: "left",
            },
            {
                field: "actions",
                headerName: translate("table.actions"),
                sortable: false,
                renderCell: function render({row}) {
                    return (
                        <>
                            <ShowButton hideText recordItemId={row.id}/>
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};

export default ParamElevatorList

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const {authenticated, redirectTo} = await authProvider.check(context);

    const translateProps = await serverSideTranslations(context.locale ?? "ru", [
        "common",
    ]);

    if (!authenticated) {
        return {
            props: {
                ...translateProps,
            },
            redirect: {
                destination: `${redirectTo}?to=${encodeURIComponent("/param_elevator")}`,
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
