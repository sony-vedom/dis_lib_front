import {MuiListInferencer} from "@refinedev/inferencer/mui";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "src/authProvider";
import React from "react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List, BooleanField,
} from "@refinedev/mui";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IResourceComponentsProps, useTranslate} from "@refinedev/core";
import {Box, Checkbox} from "@mui/material";

const ParamPerevodnikList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps} = useDataGrid();

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "class_perev",
                flex: 1,
                headerName: "Тип переводника",
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: "subclass_perev",
                flex: 1,
                headerName: "Подтип переводника",
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: "first",
                flex: 1,
                headerName: translate("Верх"),
                valueGetter: ({row}) => {
                    const value = row?.first?.name;

                    return value;
                },
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: "second",
                flex: 1,
                headerName: translate("Низ"),
                valueGetter: ({row}) => {
                    const value = row?.second?.name;

                    return value;
                },
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: "outer_diameter",
                flex: 1,
                headerName: translate("Наружный диаметр"),
                type: "number",
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: "inner_diameter",
                flex: 1,
                headerName: "Внутренний диаметр",
                type: "number",
                minWidth: 200,
                maxWidth: 200,
            },
            {
                field: "addition",
                headerName: "Наличие лавильной шейки",
                minWidth: 200,
                maxWidth: 200,
                renderCell: function render({value}) {
                    return <Box sx={{margin: "0 auto"}}><BooleanField value={!!value}/></Box>
                },
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

export default ParamPerevodnikList

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
                destination: `${redirectTo}?to=${encodeURIComponent("/blog-posts")}`,
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
