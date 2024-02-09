import React, {useState} from "react";
import {List, useDataGrid,} from "@refinedev/mui";
import {GridColDef} from "@mui/x-data-grid";
import {CrudFilters, type HttpError, IResourceComponentsProps, useList, useMany, useTranslate} from "@refinedev/core";
import {getServerSidePropsHandler} from "../../src/shared/lib";
import {Box} from "@mui/material";
import {dataGridHookConfig, paramCableFactory} from "src/features/lib";
import {ModalFilterForm, MuiDataGrid} from "src/shared/ui";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {authProvider} from "../../src/shared/api";
import {axiosInstance} from "../../src/shared/api/providers/dataProvider/utils";
import Button from "@mui/material/Button";
import {useForm} from "@refinedev/react-hook-form";
import {lazy, number, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {CrudOperators} from "@refinedev/core/src/contexts/data/IDataContext";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {FormProvider} from "react-hook-form";
import nookies from "nookies";
import {COOKIE_AUTH_ACCESS} from "../../src/shared/api/lib";

const schema = object({
    type_dr: lazy((value) => (value === '' ? string().notRequired() : number().notRequired())),
    diameter_cable: lazy((value) => (value === '' ? string().notRequired() : number().notRequired())),
    length_cut_cable: lazy((value) => (value === '' ? string().notRequired() : number().notRequired())),
})

export const ParamCableList: React.FC<IResourceComponentsProps> = (props, context) => {
    const translate = useTranslate();
    const {dataGridProps, setFilters} = useDataGrid(dataGridHookConfig);

    const columns = React.useMemo<GridColDef[]>(
        paramCableFactory(translate),
        [translate],
    );

    const [open, setOpen] = useState<boolean>(false)

    const {register, handleSubmit, formState, ...rest} = useForm<{
        type_dr?: number | string
        diameter_cable?: number | string
        length_cut_cable?: number | string
    }>({
        resolver: yupResolver(schema),
    });

    const [selectState, setSelectState] = useState<number | string>("")
    const [selectState2, setSelectState2] = useState<number | string>("")
    const [selectState3, setSelectState3] = useState<number | string>("")

    interface ISelectData {
        id: number;
        name: string;
    }

    const {data: diameter_cable} = useMany<ISelectData[], HttpError>({
        ids: [1],
        resource: "diameter_cable"
    })
    const {data: length_cut_cable} = useMany<ISelectData[], HttpError>({
        ids: [1],
        resource: "length_cut_cable"
    })

    const {data: type_dr} = useMany<ISelectData[], HttpError>({
        ids: [1],
        resource: "type_dr"
    })


    const optionMapHandler = (obj?: ISelectData[]) => {
        return obj?.map(({id, name}: { id: number, name: string }) => {
            return <MenuItem key={id} value={id}>{name}</MenuItem>
        })
    }
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
                <FormProvider register={register} handleSubmit={handleSubmit} formState={formState} {...rest}>
                    <ModalFilterForm onClose={() => setOpen(false)} open={open} handleResetAdditional={() => {
                        setSelectState("")
                        setSelectState2("")
                        setSelectState3("")
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
                                    return {
                                        field: el,
                                        value: value,
                                        operator: "eq" as CrudOperators,
                                    }

                                })
                                console.log(data)
                                setFilters(filters as CrudFilters)
                                setOpen(false)
                            }, (errors) => {
                                console.log(errors)
                            })}
                        >
                            <TextField
                                {...register("diameter_cable")}
                                value={selectState}
                                label={`${translate(`param_cable.fields.diameter`)}`}
                                variant="outlined"
                                size="small"
                                margin={"none"}
                                select
                                helperText={" "}
                                onChange={(e) => setSelectState(Number(e.target.value))}
                            >
                                {
                                    diameter_cable
                                        ? optionMapHandler(diameter_cable as unknown as ISelectData[] | undefined)
                                        : <MenuItem value={"epmty"}>Данных нет</MenuItem>
                                }
                            </TextField>
                            <TextField
                                {...register("length_cut_cable")}
                                value={selectState2}
                                label={`${translate(`param_cable.fields.length_cut`)}`}
                                variant="outlined"
                                size="small"
                                margin={"none"}
                                select
                                helperText={" "}
                                onChange={(e) => setSelectState2(Number(e.target.value))}
                            >
                                {
                                    length_cut_cable
                                        ? optionMapHandler(length_cut_cable as unknown as ISelectData[] | undefined)
                                        : <MenuItem value={"epmty"}>Данных нет</MenuItem>

                                }
                            </TextField>
                            <TextField
                                {...register("type_dr")}
                                value={selectState3}
                                label={`${translate(`param_cable.fields.typ_e`)}`}
                                variant="outlined"
                                size="small"
                                margin={"none"}
                                select
                                helperText={" "}
                                onChange={(e) => setSelectState3(Number(e.target.value))}
                            >
                                {
                                    type_dr ?
                                        optionMapHandler(type_dr as unknown as ISelectData[] | undefined)
                                        : <MenuItem value={"epmty"}>Данных нет</MenuItem>
                                }
                            </TextField>
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
