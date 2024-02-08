import {BooleanField, ShowButton} from "@refinedev/mui";
import Box from "@mui/material/Box";
import React from "react";
import {TTableFactory} from "../types";

export const parameterFactory: TTableFactory = (translate) => () => [
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
        minWidth: 120,
        maxWidth: 120,
        disableColumnMenu: true,
    },
    {
        field: "nominal_pipe_diameter",
        flex: 1,
        headerName: translate("parameter.fields.nominal_pipe_diameter"),
        type: "number",
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Номинальный<br/>диаметр трубы</Box>
        },
        minWidth: 135,
        maxWidth: 135,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "reinforcement",
        headerName: translate("parameter.fields.reinforcement"),
        minWidth: 125,
        maxWidth: 125,
        renderCell: function render({value}) {
            return <BooleanField sx={{justifySelf: "end"}} value={!!value}/>;
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "internal_coating",
        headerName: translate("parameter.fields.internal_coating"),
        minWidth: 130,
        maxWidth: 130,
        renderCell: function render({value}) {
            return <BooleanField sx={{justifySelf: "end"}} value={!!value}/>;
        },
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Внутреннее<br/>покрытие</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "weight",
        flex: 1,
        headerName: translate("parameter.fields.weight"),
        type: "number",
        minWidth: 100,
        maxWidth: 100,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "pipe_inner_diameter",
        flex: 1,
        headerName: translate("parameter.fields.pipe_inner_diameter"),
        type: "number",
        minWidth: 140,
        maxWidth: 140,
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Внутренний<br/>диаметр трубы</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "lock_outside_diameter",
        flex: 1,
        headerName: translate("parameter.fields.lock_outside_diameter"),
        type: "number",
        minWidth: 140,
        maxWidth: 140,
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Наружний<br/>диаметр замка</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "lock_inner_diameter",
        flex: 1,
        headerName: translate("parameter.fields.lock_inner_diameter"),
        type: "number",
        minWidth: 140,
        maxWidth: 140,
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Внутренний<br/>диаметр замка</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "strength",
        flex: 1,
        headerName: translate("parameter.fields.strength"),
        minWidth: 140,
        maxWidth: 140,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "size",
        flex: 1,
        headerName: translate("parameter.fields.size"),
        minWidth: 140,
        maxWidth: 140,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "lock_th",
        flex: 1,
        headerName: translate("parameter.fields.lock_th"),
        minWidth: 140,
        maxWidth: 140,
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Резьба<br/>замкового<br/>соединения</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "lock_ty",
        flex: 1,
        headerName: translate("parameter.fields.lock_ty"),
        minWidth: 140,
        maxWidth: 140,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "wall_thickness",
        flex: 1,
        headerName: translate("parameter.fields.wall_thickness"),
        type: "number",
        minWidth: 120,
        maxWidth: 120,
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Толщина стенки<br/>(мм)</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: "length",
        flex: 1,
        headerName: translate("parameter.fields.length"),
        type: "number",
        minWidth: 140,
        maxWidth: 140,
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Длина одного<br/>элемента<br/>(м)</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "pipe_t",
        flex: 1,
        headerName: translate("parameter.fields.pipe_t"),
        minWidth: 120,
        maxWidth: 120,
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "side_square",
        flex: 1,
        headerName: translate("parameter.fields.side_square"),
        type: "number",
        minWidth: 120,
        maxWidth: 120,
        renderCell: function render({value}) {
            return (
                <div>
                    {(!value || value === ".") && Number(value) !== 0 ? "" : value}
                </div>
            );
        },
        renderHeader: function render() {
            return <Box sx={{lineHeight: "17px"}}>Сторона<br/>квадрата<br/>(м)</Box>
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
    {
        field: "sub_pipe_t",
        flex: 1,
        headerName: translate("parameter.fields.sub_pipe_t"),
        minWidth: 120,
        maxWidth: 120,
        renderCell: function render({value}) {
            return (
                <div>
                    {!value || value === "." ? "" : value}
                </div>
            );
        },
        align: "right",
        headerAlign: "right",
        sortable: false,
        disableColumnMenu: true,

    },
]