import React, {useContext} from 'react';
import {ICellProps} from "../../../../data-table/data-table";
import {AvailabilityColorContext} from "../../../../../AppContexts";


export const QuantityTextCell = (props: ICellProps) => {
    const cellData = props.cellData || {};
    const getColorCode:any = useContext(AvailabilityColorContext);
    const cellValue = cellData[props.columnCell.columnKey];

    return (
        <div style={{backgroundColor: `${getColorCode(parseInt(cellValue, 10))}aa`, padding: '8px 0'}}>
            {cellValue}
        </div>
    );
}