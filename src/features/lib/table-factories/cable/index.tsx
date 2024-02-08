import {ShowButton} from "@refinedev/mui";
import React from "react";
import {TTableFactory} from "../types";

export const paramCableFactory: TTableFactory = (translate) => () => [
    {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
        renderCell: function render({row}: {row: {id: number}}) {
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
        field: "typ_e",
        flex: 1,
        headerName: translate(`param_cable.fields.typ_e`),
        minWidth: 250,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "diameter",
        flex: 1,
        headerName: translate("param_cable.fields.diameter"),
        type: "number",

        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "length_cut",
        flex: 1,
        headerName: translate("param_cable.fields.length_cut"),
        type: "number",
        maxWidth: 350,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
]
