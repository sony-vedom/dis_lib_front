import React, {useState} from "react";
import {List, useAutocomplete, useDataGrid,} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {ModalFilterForm, MuiDataGrid} from "src/shared/ui";
import {CrudFilters, type HttpError, IResourceComponentsProps, useTranslate} from "@refinedev/core";
import {getServerSidePropsHandler} from "../../src/shared/lib";
import {dataGridHookConfig, elevatorFactory} from "src/features/lib";
import {authProvider} from "../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Button from "@mui/material/Button";
import {useForm} from "@refinedev/react-hook-form";
import {Autocomplete, Box} from "@mui/material";
import {CrudOperators} from "@refinedev/core/src/contexts/data/IDataContext";
import {Controller, FormProvider} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {string} from "yup";

export const ParamElevatorList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps, setFilters} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        elevatorFactory(translate),
        [translate],
    );
    const [open, setOpen] = useState<boolean>(false)

    interface ISelectData {
        id: number;
        name: string | number;
    }

    const {register, handleSubmit, formState, control, ...rest} = useForm<{
        elevator_mark?: ISelectData | null
        through_diameter?: ISelectData | null
        type_pipe?: ISelectData | null
        tonnage?: ISelectData | null
        nominal_diameter?: string
    }>({
        defaultValues: {
            elevator_mark: null,
            through_diameter: null,
            type_pipe: null,
            tonnage: null,
            nominal_diameter: ""
        }
    })

    const {autocompleteProps: elevator_mark} = useAutocomplete<ISelectData, HttpError>({
        resource: "elevator_mark"
    })


    const {autocompleteProps: through_diameter} = useAutocomplete<ISelectData, HttpError>({
        resource: "through_diameter"
    })

    const {autocompleteProps: type_pipe} = useAutocomplete<ISelectData, HttpError>({
        resource: "type_pipe"
    })

    const {autocompleteProps: tonnage} = useAutocomplete<ISelectData, HttpError>({
        resource: "tonnage"
    })

    return (
        <List headerButtons={({defaultButtons}) => (
            <>
                {defaultButtons}
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }}>Фильтры</Button>
            </>
        )}>
            <FormProvider control={control} register={register} handleSubmit={handleSubmit}
                          formState={formState} {...rest}>
                <ModalFilterForm onClose={() => setOpen(false)} open={open} handleResetAdditional={() => {
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
                            const filters = Object.entries(data).flatMap(([el, data]) => {
                                return data && data?.id ? {
                                    field: el,
                                    value: data.id,
                                    operator: "eq" as CrudOperators,
                                } : []
                            })
                            setFilters(filters as CrudFilters)
                            setOpen(false)
                        }, (errors) => {
                        })}
                    >

                        <Controller
                            control={control}
                            name="elevator_mark"
                            render={({field}) => (
                                <Autocomplete
                                    defaultValue={null}
                                    {...elevator_mark}
                                    {...field}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                    getOptionLabel={({name}) => `${name}`}
                                    isOptionEqualToValue={(option, value) =>
                                        value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={`${translate(`param_elevator.fields.mark`)}`}
                                            placeholder={`${translate(`param_elevator.fields.mark`)}`}
                                            variant="outlined"
                                            size="small"
                                            margin={"none"}
                                            helperText={" "}
                                        />
                                    )}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="through_diameter"
                            render={({field}) => (
                                <Autocomplete
                                    defaultValue={null}
                                    {...through_diameter}
                                    {...field}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                    getOptionLabel={({name}) => `${name}`}
                                    isOptionEqualToValue={(option, value) =>
                                        value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={`${translate(`param_elevator.fields.diameter`)}`}
                                            placeholder={`${translate(`param_elevator.fields.diameter`)}`}
                                            variant="outlined"
                                            size="small"
                                            margin={"none"}
                                            helperText={" "}
                                        />
                                    )}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="type_pipe"
                            render={({field}) => (
                                <Autocomplete
                                    {...type_pipe}
                                    {...field}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                    getOptionLabel={({name}) => `${name}`}
                                    isOptionEqualToValue={(option, value) =>
                                        value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={`${translate(`param_elevator.fields.type`)}`}
                                            placeholder={`${translate(`param_elevator.fields.type`)}`}
                                            variant="outlined"
                                            size="small"
                                            margin={"none"}
                                            helperText={" "}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="tonnage"
                            render={({field}) => (
                                <Autocomplete
                                    defaultValue={null}
                                    {...tonnage}
                                    {...field}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                    getOptionLabel={({name}) => `${name}`}
                                    isOptionEqualToValue={(option, value) =>
                                        value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={`${translate(`param_elevator.fields.tonn`)}`}
                                            placeholder={`${translate(`param_elevator.fields.tonn`)}`}
                                            variant="outlined"
                                            size="small"
                                            margin={"none"}
                                            helperText={" "}

                                        />
                                    )}
                                />
                            )}
                        />
                        <TextField
                            {...register("nominal_diameter")}
                            label={`${translate(`param_elevator.fields.nominal_diameter`)}`}
                            placeholder={`${translate(`param_elevator.fields.nominal_diameter`)}`}
                            variant="outlined"
                            size="small"
                            margin={"none"}
                            error={!!formState.errors.nominal_pipe_diameter?.message}
                            helperText={!!formState.errors.nominal_pipe_diameter?.message ? formState.errors.nominal_diameter?.message as string : ' '}
                        />
                    </Box>
                </ModalFilterForm>
            </FormProvider>

            <MuiDataGrid {...dataGridProps} columns={columns} autoHeight/>
        </List>
    );
};

export default ParamElevatorList


export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_elevator"})
}

