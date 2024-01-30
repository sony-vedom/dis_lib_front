import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import React from "react";
import {List, ShowButton, useDataGrid,} from "@refinedev/mui";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IResourceComponentsProps, useTranslate} from "@refinedev/core";

export const ParamCableList: React.FC<IResourceComponentsProps> = (props, context) => {
    const translate = useTranslate();
    const {dataGridProps} = useDataGrid();
    console.log(translate(`param_cable.fields.typ_e`))
    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "typ_e",
                flex: 1,
                headerName: translate(`param_cable.fields.typ_e`),
                minWidth: 300,
                maxWidth: 300,
            },
            {
                field: "diameter",
                flex: 1,
                headerName: translate("param_cable.fields.diameter"),
                type: "number",
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: "length_cut",
                flex: 1,
                headerName: translate("param_cable.fields.length_cut"),
                type: "number",
                minWidth: 300,
                maxWidth: 300,
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
                minWidth: 200,
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

export default ParamCableList

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
                destination: `${redirectTo}?to=${encodeURIComponent("/param_cable")}`,
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
