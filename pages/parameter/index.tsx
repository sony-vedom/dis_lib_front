import React, {useState} from "react";
import {List, useDataGrid} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {CrudFilters, IResourceComponentsProps, useTranslate, type CrudOperators} from "@refinedev/core";
import {ModalFilterForm, MuiDataGrid} from "src/shared/ui";
import {dataGridHookConfig, parameterFactory} from "src/features/lib";
import {getServerSidePropsHandler} from "src/shared/lib"
import {authProvider} from "../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useForm} from "@refinedev/react-hook-form";
import {FormProvider} from "react-hook-form"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import {lazy, number, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup"


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

export const ParameterList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps, setFilters} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        parameterFactory(translate),
        [translate],
    );

    const [open, setOpen] = useState<boolean>(false)

    const [selectState, setSelectState] = useState<number | string>("")
    const [selectState2, setSelectState2] = useState<number | string>("")

    const {register, handleSubmit, formState, ...rest} = useForm<{
        nominal_pipe_diameter?: string
        weight?: string
        reinforcement?: number | string
        internal_coating?: number | string
        pipe_inner_diameter?: string
    }>({
        resolver: yupResolver(schema),
    });

    return (
        <List headerButtons={({ defaultButtons }) => (
            <>
                {defaultButtons}
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }}>Фильтры</Button>
            </>
        )}>
            <FormProvider register={register} handleSubmit={handleSubmit} formState={formState} {...rest}>
                <ModalFilterForm onClose={() => setOpen(false)} open={open} handleResetAdditional={() => {
                    setSelectState("")
                    setSelectState2("")
                    setFilters([])

                }}>
                    <Box
                        id="filterForm"
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px"
                        }}
                        autoComplete="off"
                        onSubmit={handleSubmit((data) => {
                            const filters = Object.entries(data).map(([el, value]) => {
                                if (el === "internal_coating" || el ==="reinforcement") {
                                    return {
                                        field: el,
                                        value: value !== "" ? !!value : value,
                                        operator: "eq" as CrudOperators,
                                    }
                                }
                                return {
                                    field: el,
                                    value: value,
                                    operator: "eq" as CrudOperators,
                                }
                            })
                            setFilters(filters as CrudFilters)
                            setOpen(false)
                        })}
                    >
                        <TextField
                            {...register("nominal_pipe_diameter")}
                            label={`${translate(`parameter.fields.nominal_pipe_diameter`)}`}
                            placeholder={`${translate(`parameter.fields.nominal_pipe_diameter`)}`}
                            variant="outlined"
                            size="small"
                            margin={"none"}
                            error={!!formState.errors.nominal_pipe_diameter?.message}
                            helperText={!!formState.errors.nominal_pipe_diameter?.message ? formState.errors.nominal_pipe_diameter?.message as string : ' '}
                        />
                        <TextField
                            {...register("weight")}
                            label={`${translate(`parameter.fields.weight`)}`}
                            placeholder={`${translate(`parameter.fields.weight`)}`}
                            variant="outlined"
                            size="small"
                            margin={"none"}
                            error={!!formState.errors.weight?.message}
                            helperText={!!formState.errors.weight?.message ? formState.errors.weight?.message as string : ' '}
                        />
                        <TextField
                            {...register("reinforcement")}
                            value={selectState}
                            label={`${translate(`parameter.fields.reinforcement`)}`}
                            variant="outlined"
                            size="small"
                            margin={"none"}
                            select
                            helperText={" "}
                            onChange={(e) => setSelectState(Number(e.target.value))}
                        >
                            <MenuItem value={1}>Есть</MenuItem>
                            <MenuItem value={0}>Нет</MenuItem>
                        </TextField>
                        <TextField
                            {...register("internal_coating")}
                            value={selectState2}
                            select
                            label={`${translate("parameter.fields.internal_coating")}`}
                            variant="outlined"
                            size="small"
                            margin={"none"}
                            helperText={' '}
                            onChange={(e) => setSelectState2(Number(e.target.value))}

                        >
                            <MenuItem value={1}>Есть</MenuItem>
                            <MenuItem value={0}>Нет</MenuItem>
                        </TextField>
                        <TextField
                            {...register("pipe_inner_diameter")}
                            error={!!formState.errors.pipe_inner_diameter?.message}
                            helperText={!!formState.errors.pipe_inner_diameter?.message ? formState.errors.pipe_inner_diameter?.message as string : ' '}
                            label={`${translate(`parameter.fields.pipe_inner_diameter`)}`}
                            placeholder={`${translate(`parameter.fields.pipe_inner_diameter`)}`}
                            variant="outlined"
                            size="small"
                            margin={"none"}
                        />
                    </Box>
                </ModalFilterForm>
            </FormProvider>
            <MuiDataGrid {...dataGridProps} columns={columns}/>
        </List>
    );
};

export default ParameterList

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "parameter"})
}