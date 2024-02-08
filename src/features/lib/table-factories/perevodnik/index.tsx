import {BooleanField, ShowButton} from "@refinedev/mui";
import Box from "@mui/material/Box";
import React from "react";
import {TTableFactory} from "../types";

export const perevodnikFactory: TTableFactory = (translate) => () => [
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
        minWidth: 150,
        maxWidth: 150,
        disableColumnMenu: true,

    },
    {
        field: "class_perev",
        flex: 1,
        headerName: "Тип переводника",
        minWidth: 190,
        maxWidth: 190,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "subclass_perev",
        flex: 1,
        headerName: "Подтип переводника",
        minWidth: 210,
        maxWidth: 210,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "first",
        flex: 1,
        headerName: "Верх",
        valueGetter: ({row}) => {
            const value = row?.first?.name;
            return value;
        },
        minWidth: 180,
        maxWidth: 180,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "second",
        flex: 1,
        headerName: "Низ",
        valueGetter: ({row}) => {
            const value = row?.second?.name;

            return value;
        },
        minWidth: 180,
        maxWidth: 180,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "outer_diameter",
        flex: 1,
        headerName: "Наружный диаметр",
        type: "number",
        minWidth: 200,
        maxWidth: 200,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "inner_diameter",
        flex: 1,
        headerName: "Внутренний диаметр",
        type: "number",
        minWidth: 210,
        maxWidth: 210,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "addition",
        headerName: "Наличие лавильной шейки",
        minWidth: 270,
        maxWidth: 270,
        renderCell: function render({value}) {
            return <Box><BooleanField value={!!value}/></Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
]