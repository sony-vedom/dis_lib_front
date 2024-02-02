import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import React from "react";
import {DateField, List, ShowButton, useDataGrid,BooleanField} from "@refinedev/mui";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IResourceComponentsProps, useTranslate} from "@refinedev/core";
import {Checkbox} from "@mui/material";

export const ParameterList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps} = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
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
            {
                field: "nominal_pipe_diameter",
                flex: 1,
                headerName: translate("parameter.fields.nominal_pipe_diameter"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "reinforcement",
                headerName: translate("parameter.fields.reinforcement"),
                minWidth: 200,
                // @ts-ignore
                renderCell: function render({value}) {
                    // @ts-ignore
                    return <BooleanField sx={{justifySelf: "end"}} value={!!value}/>;
                },
            },
            {
                field: "internal_coating",
                headerName: translate("parameter.fields.internal_coating"),
                minWidth: 100,
                // @ts-ignore
                renderCell: function render({value}) {
                    // @ts-ignore
                    return  <BooleanField sx={{justifySelf: "end"}} value={!!value}/>;
                },
            },
            {
                field: "weight",
                flex: 1,
                headerName: translate("parameter.fields.weight"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "pipe_inner_diameter",
                flex: 1,
                headerName: translate("parameter.fields.pipe_inner_diameter"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "lock_outside_diameter",
                flex: 1,
                headerName: translate("parameter.fields.lock_outside_diameter"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "lock_inner_diameter",
                flex: 1,
                headerName: translate("parameter.fields.lock_inner_diameter"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "strength",
                flex: 1,
                headerName: translate("parameter.fields.strength"),
                minWidth: 250,
            },
            {
                field: "size",
                flex: 1,
                headerName: translate("parameter.fields.size"),
                minWidth: 200,
            },
            {
                field: "lock_th",
                flex: 1,
                headerName: translate("parameter.fields.lock_th"),
                minWidth: 200,
            },
            {
                field: "lock_ty",
                flex: 1,
                headerName: translate("parameter.fields.lock_ty"),
                minWidth: 200,
            },
            {
                field: "wall_thickness",
                flex: 1,
                headerName: translate("parameter.fields.wall_thickness"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "length",
                flex: 1,
                headerName: translate("parameter.fields.length"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "pipe_t",
                flex: 1,
                headerName: translate("parameter.fields.pipe_t"),
                minWidth: 200,
            },
            {
                field: "side_square",
                flex: 1,
                headerName: translate("parameter.fields.side_square"),
                type: "number",
                minWidth: 200,
                renderCell: function render({value}) {
                    return (
                        <div>
                            {(!value || value === ".") && Number(value) !== 0 ? "" : value }
                        </div>
                    );
                },
            },
            {
                field: "sub_pipe_t",
                flex: 1,
                headerName: translate("parameter.fields.sub_pipe_t"),
                minWidth: 200,
                renderCell: function render({value}) {
                    return (
                        <div>
                            {!value || value === "." ? "" : value }
                        </div>
                    );
                },
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid checkboxSelection {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};

export default ParameterList

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
                destination: `${redirectTo}?to=${encodeURIComponent("/parameter")}`,
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
