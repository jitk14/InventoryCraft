import React from 'react';
import {SortTypes} from "../../../constants/app-constants";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import styles from './table-head.module.scss';

export type ColumnCell = {
    label: string;
    columnKey: string; //unique column identifier
    isSortable?: boolean;
    sortedType?: SortTypes;
    sortable?: boolean;
    asNumber?: boolean
    renderer?: typeof React.Component | React.JSXElementConstructor<any>
};

interface ITableHeadProps {
    seqLabel?: string;
    columns: Array<ColumnCell>;
    sortHandler: (columnKey: string, sortType: SortTypes) => void;
}

export const TableHead = (props: ITableHeadProps) => {
    const columns = props.columns || [];

    const getActiveSortClass = (elementSortType: SortTypes, sortedType?: SortTypes) => {
        if (sortedType === undefined || sortedType !== elementSortType) {
            return '';
        }

        return 'sort-active';
    };

    const getSortingBox = (column: ColumnCell) => {
        if (column.sortable === false) {
            return null;
        }

        return (
            <span className={`${styles.sortBox} flex-container flex-col inline-flex`} >
                <ArrowDropUpIcon className={`${styles.sortAsc} sort-asc ${styles[getActiveSortClass(SortTypes.ASC, column.sortedType)]}`}
                    onClick={() => {props.sortHandler(column.columnKey, SortTypes.ASC)}}/>
                <ArrowDropDownIcon className={`${styles.sortDsc} sort-dsc ${styles[getActiveSortClass(SortTypes.DSC, column.sortedType)]}`}
                    onClick={() => {props.sortHandler(column.columnKey, SortTypes.DSC)}}/>
            </span>
        );
    }

    const getColumnCell = (column: ColumnCell) => {
        return (
            <td className={`${styles.thCell} data-table-th-cell`} key={column.columnKey}>
                <span className={`nvt-table-head-cell`}>{column.label}</span>
                {getSortingBox(column)}
            </td>
        );
    }

    return (
        <thead className={`${styles.thead} data-table-thead`}>
        <tr>
            {props.seqLabel ? <td> {props.seqLabel} </td> : null}
            {
                columns.map((column) => {
                    return getColumnCell(column);
                })
            }
        </tr>
        </thead>
    );
}