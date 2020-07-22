import React, {useEffect, useState} from 'react';
import {ICellProps} from "../../../../data-table/data-table";
import _get from 'lodash/get';
import {TextField} from "@material-ui/core";

export const PlainTextCell = (props: ICellProps) => {
    const cellData = props.cellData || {};
    const editCell = _get(props, `metaData.productsEditState.${cellData.productId}.editing`);

    const [cellValue, setCellValue] = useState(cellData[props.columnCell.columnKey] || '');

    useEffect(() => {
        if(!editCell) {
            setCellValue(cellData[props.columnCell.columnKey]);
        }
    }, [editCell])

    const handleChange = (ev: any) => {
        const value = ev.target.value;
        setCellValue(value);

        const handleProductPropertyChange = _get(props, 'handlers.handleProductPropertyChange');

        handleProductPropertyChange && handleProductPropertyChange(cellData.productId, props.columnCell.columnKey, value);
    }

    if (editCell) {
        return (
            <div>
                <TextField label={props.columnCell.label} onChange={handleChange} value={cellValue}/>
            </div>
        );
    }

    return (
        <div>
            {cellData[props.columnCell.columnKey]}
        </div>
    );
}