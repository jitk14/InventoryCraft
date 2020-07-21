import React from 'react';
import {ICellProps} from "../../../../data-table/data-table";

export const PlainTextCell = (props: ICellProps) => {
    const cellData = props.cellData || {};

    return (
        <div>
            {cellData[props.columnCell.columnKey]}
        </div>
    );
}