import React, {useState} from "react";
import {List, useAutocomplete, useDataGrid} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {CrudFilters, type HttpError, IResourceComponentsProps, useTranslate, type CrudOperators} from "@refinedev/core";
import {getServerSidePropsHandler} from "../../src/shared/lib";
import {Autocomplete, Box} from "@mui/material";
import {dataGridHookConfig, paramCableFactory} from "src/features/lib";
import {ModalFilterForm, MuiDataGrid} from "src/shared/ui";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "../../src/shared/api";
import Button from "@mui/material/Button";
import {useForm} from "@refinedev/react-hook-form";
import TextField from "@mui/material/TextField";
import {Controller, FormProvider} from "react-hook-form";


export const ParamCableList: React.FC<IResourceComponentsProps> = (props, context) => {
    const translate = useTranslate();
    const {dataGridProps, setFilters} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        paramCableFactory(translate),
        [translate],
    );

    const [open, setOpen] = useState<boolean>(false)

    const {register, handleSubmit, formState, control, ...rest} = useForm<{
        type_dr?: ISelectData | null
        diameter_cable?: ISelectData | null
        length_cut_cable?: ISelectData | null
    }>({
        defaultValues: {
            type_dr: null,
            diameter_cable: null,
            length_cut_cable: null,
        }
    })

    interface ISelectData {
        id: number;
        name: string;
    }

    const {autocompleteProps: diameter_cable} = useAutocomplete<ISelectData, HttpError>({
        resource: "diameter_cable"
    })


    const {autocompleteProps: length_cut_cable} = useAutocomplete<ISelectData, HttpError>({
        resource: "length_cut_cable"
    })

    const {autocompleteProps: type_dr} = useAutocomplete<ISelectData, HttpError>({
        resource: "type_dr"
    })

    return (
        <>
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
                                name="length_cut_cable"
                                render={({field}) => (
                                    <Autocomplete
                                        defaultValue={null}
                                        {...length_cut_cable}
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
                                                label={`${translate(`param_cable.fields.length_cut`)}`}
                                                placeholder={`${translate(`param_cable.fields.length_cut`)}`}
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
                                name="diameter_cable"
                                render={({field}) => (
                                    <Autocomplete
                                        {...diameter_cable}
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
                                                label={`${translate(`param_cable.fields.diameter`)}`}
                                                placeholder={`${translate(`param_cable.fields.diameter`)}`}
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
                                name="type_dr"
                                render={({field}) => (
                                    <Autocomplete
                                        defaultValue={null}
                                        {...type_dr}
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
                                                label={`${translate(`param_cable.fields.typ_e`)}`}
                                                placeholder={`${translate(`param_cable.fields.typ_e`)}`}
                                                variant="outlined"
                                                size="small"
                                                margin={"none"}
                                                helperText={" "}

                                            />
                                        )}
                                    />
                                )}
                            />
                        </Box>
                    </ModalFilterForm>
                </FormProvider>
                <Box sx={{maxWidth: "1000px"}}>
                    <MuiDataGrid {...dataGridProps} columns={columns} autoHeight/>
                </Box>
            </List>
        </>
    );
};

export default ParamCableList

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);

    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({
        authenticated,
        redirectTo,
        translateProps,
        routeName: "param_cable"
    })
}
