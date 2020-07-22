import React from 'react';
import {ICellProps} from "../../../../data-table/data-table";
import Checkbox from '@material-ui/core/Checkbox';

export const SelectCell = (props: ICellProps) => {
    const cellData = props.cellData || {};

    return (
        <div>
            <Checkbox value={true} onChange={(ev)=> {}}/>
        </div>
    );
}