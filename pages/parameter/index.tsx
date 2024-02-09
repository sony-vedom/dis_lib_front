import React, {useState} from "react";
import {List, useDataGrid} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {CrudFilters, IResourceComponentsProps, useTranslate,} from "@refinedev/core";
import {MuiDataGrid} from "src/shared/ui";
import {dataGridHookConfig, parameterFactory} from "src/features/lib";
import {getServerSidePropsHandler} from "src/shared/lib"
import {authProvider} from "../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Checkbox, DialogTitle, FormControlLabel, Modal} from "@mui/material";
import {useForm} from "@refinedev/react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import {string, object, number, lazy} from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import {type CrudOperators} from "@refinedev/core/src/contexts/data/IDataContext";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

let yup;
const schema = object({
    nominal_pipe_diameter: string().test(
        'is-decimal',
        'Введите число в формате 0.1',
        value => !!value?.match(/^\d*\.{1}\d*$/) || !isNaN(Number(value)),
    ).notRequired(),
    pipe_inner_diameter: string().test(
        'is-decimal',
        'Введите число в формате 0.0',
        value => !!value?.match(/^\d*\.{1}\d*$/) || !isNaN(Number(value)),
    ).notRequired(),
    weight: string().test(
        'is-decimal',
        'Введите число в формате 0.0',
        value => !!value?.match(/^\d*\.{1}\d*$/) || !isNaN(Number(value)),
    ).notRequired(),
    reinforcement: lazy((value) => (value === '' ? string().notRequired() : number().notRequired())),
    internal_coating: lazy((value) => (value === '' ? string().notRequired() : number().notRequired())),
})

const ParameterList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps, setFilters} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        parameterFactory(translate),
        [translate],
    );

    const [open, setOpen] = useState<boolean>(false)

    const [selectState, setSelectState] = useState<number | string>("")
    const [selectState2, setSelectState2] = useState<number | string>("")

    const {register, handleSubmit, formState} = useForm<{
        nominal_pipe_diameter?: string
        weight?: string
        reinforcement?: number | string
        internal_coating?: number | string
        pipe_inner_diameter?: string
    }>({
        resolver: yupResolver(schema),
    });

    return (
        <>

       </>
    );
};

export default ParameterList
