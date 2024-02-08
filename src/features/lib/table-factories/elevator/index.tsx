import {BooleanField, ShowButton} from "@refinedev/mui";
import Box from "@mui/material/Box";
import React from "react";
import {TTableFactory} from "../types";

export const elevatorFactory: TTableFactory = (translate) => () => [
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
        field: "mark",
        flex: 1,
        headerName: translate("param_elevator.fields.mark"),
        minWidth: 200,
        maxWidth: 200,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "diameter",
        flex: 1,
        headerName: translate("param_elevator.fields.diameter"),
        type: "number",
        minWidth: 220,
        maxWidth: 220,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "type",
        flex: 1,
        headerName: translate("param_elevator.fields.type"),
        minWidth: 220,
        maxWidth: 220,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "tonn",
        flex: 1,
        headerName: translate("param_elevator.fields.tonn"),
        type: "number",
        minWidth: 210,
        maxWidth: 210,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "nominal_diameter",
        flex: 1,
        headerName: translate("param_elevator.fields.nominal_diameter"),
        type: "number",
        minWidth: 350,
        maxWidth: 350,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "bore_diameter",
        flex: 1,
        headerName: translate("param_elevator.fields.bore_diameter"),
        minWidth: 200,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
]