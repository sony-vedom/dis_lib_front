import React, {useState} from "react";
import {List, useAutocomplete, useDataGrid,} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {CrudFilters, type HttpError, IResourceComponentsProps, useTranslate, type CrudOperators} from "@refinedev/core";
import {getServerSidePropsHandler} from "src/shared/lib";
import {dataGridHookConfig, perevodnikFactory} from "src/features/lib";
import {ModalFilterForm, MuiDataGrid} from "src/shared/ui";
import {authProvider} from "../../src/shared/api";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useForm} from "@refinedev/react-hook-form";
import {Autocomplete, Box} from "@mui/material";
import {Controller, FormProvider} from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";



const ParamPerevodnikList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {dataGridProps, setFilters} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        perevodnikFactory(translate),
        [translate],
    );

    const [open, setOpen] = useState<boolean>(false)


    const {register, handleSubmit, formState, control, ...rest} = useForm<{
        class_perev?: ISelectData | null
        subclass_perev?: string
        first_end?: ISelectData | null
        second_end?: ISelectData | null
    }>({
        defaultValues: {
            class_perev: null,
            subclass_perev: "",
            first_end: null,
            second_end: null,
        }
    })

    interface ISelectData {
        id: number;
        name: string;
    }

    const {autocompleteProps: class_perev} = useAutocomplete<ISelectData, HttpError>({
        resource: "perevodnik_class"
    })


    const {autocompleteProps: kind_and_type_thread} = useAutocomplete<ISelectData, HttpError>({
        resource: "kind_and_type_thread"
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
                            name="class_perev"
                            render={({field}) => (
                                <Autocomplete
                                    defaultValue={null}
                                    {...class_perev}
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
                                            label={`${translate(`param_perevodnik.fields.class_perev`)}`}
                                            placeholder={`${translate(`param_perevodnik.fields.class_perev`)}`}
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
                            {...register("subclass_perev")}
                            label={`${translate(`param_perevodnik.fields.subclass_perev`)}`}
                            placeholder={`${translate(`param_perevodnik.fields.subclass_perev`)}`}
                            variant="outlined"
                            size="small"
                            margin={"none"}
                            error={!!formState.errors.subclass_perev?.message}
                            helperText={!!formState.errors.subclass_perev?.message ? formState.errors.subclass_perev?.message as string : ' '}
                        />

                        <Controller
                            control={control}
                            name="first_end"
                            render={({field}) => (
                                <Autocomplete
                                    defaultValue={null}
                                    {...kind_and_type_thread}
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
                                            label={`${translate(`param_perevodnik.fields.first`)}`}
                                            placeholder={`${translate(`param_perevodnik.fields.first`)}`}
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
                            name="second_end"
                            render={({field}) => (
                                <Autocomplete
                                    defaultValue={null}
                                    {...kind_and_type_thread}
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
                                            label={`${translate(`param_perevodnik.fields.second`)}`}
                                            placeholder={`${translate(`param_perevodnik.fields.second`)}`}
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
            <MuiDataGrid {...dataGridProps} columns={columns}/>
        </List>
    );
};

export default ParamPerevodnikList

export const getServerSideProps = async function (context: any) {
    const {authenticated, redirectTo} = await authProvider.check(context);
    const translateProps = await serverSideTranslations("ru", [
        "common",
    ]);

    return getServerSidePropsHandler({authenticated, redirectTo, translateProps, routeName: "param_perevodmik"})
}
