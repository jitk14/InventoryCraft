import React from 'react';
import {ICellProps} from "../../../../data-table/data-table";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const ActionCell = (props: ICellProps) => {
    const cellData = props.cellData || {};

    return (
        <div>
            <EditIcon onClick={() => {alert("Edit: " + cellData.productId)}}/>
            <DeleteIcon onClick={() => {alert("Delete: " + cellData.productId)}}/>
        </div>
    );
}