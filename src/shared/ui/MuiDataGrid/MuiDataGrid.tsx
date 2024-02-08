import React, {type FC} from "react";
import {
    DataGrid,
    type DataGridProps, type GridColDef,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarFilterButton,
    ruRU
} from "@mui/x-data-grid";

interface MuiDataGridProps extends DataGridProps {
    columns: GridColDef<any, any, any>[]
}

const CustomToolbar: FC = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarFilterButton/>
        </GridToolbarContainer>
    );
}

export const MuiDataGrid: FC<MuiDataGridProps> = (props) => {
    const {columns, ...dataGridProps} = props
    return <DataGrid{...dataGridProps}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    pageSizeOptions={[10, 25, 50]}
                    columns={columns} slots={{
        toolbar: CustomToolbar
    }} autoHeight/>

}
