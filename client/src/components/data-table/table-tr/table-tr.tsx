import React from "react";
import {ColumnCell} from "../table-head/table-head";

interface IRowProps {
    columns: Array<ColumnCell>
    cellData: any,
    metaData?: any,
    handlers? : Record<any, any>
}

export const TableRow = (props: IRowProps) => {
    const getCustomRenderer = (colKey: ColumnCell) => {
        return colKey && colKey['renderer'];
    }

    return (
        <tr className={'data-table-row'}>
            {props.columns.map((column, index) => {
                const CustomRenderer = getCustomRenderer(column);

                if (CustomRenderer) {
                    return (<td key={column.columnKey} >
                        <CustomRenderer cellData={props.cellData} columnCell={column} metaData={props.metaData}
                                        handlers={props.handlers} />
                    </td>);
                }

                return (
                    <td key={index}>
                        {props.cellData[column.columnKey]}
                    </td>
                );
            })}
        </tr>
    );
}