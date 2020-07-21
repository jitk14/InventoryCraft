import React from "react";
import { TextField, Select, InputLabel, MenuItem } from "@material-ui/core";
import { ColumnCell, TableHead } from "./table-head/table-head";
import { TableRow } from './table-tr/table-tr';
import { Pagination } from "./pagination/pagination";
import  _sortBy from 'lodash/sortBy';
import styles from './data-table.module.scss';
import {PER_PAGE_VIEW_LENGTHS} from "../../constants/app-constants";

interface IDataTableProps {
    columns:Array<ColumnCell>;
    data: Array<any>;
    identifierKey: string;
    perPageViewLengths: Array<number>
}

interface IDataTableState {
    tableData: Array<any>;
    currentPageIndex: number;
    perPageEntries: number;
}

export interface ICellProps {
    cellData: any;
    identifierKey: string;
    columnCell: ColumnCell;
    columnKey: string;
    editing: boolean;
};


export class DataTable extends React.Component<IDataTableProps, IDataTableState>{

    constructor(props: IDataTableProps) {
        super(props);

        this.state = {
            tableData: this.sortTableData(),
            perPageEntries: 1,
            currentPageIndex:  0
        }
    }

    sortTableData(): Array<any> {
        return this.props.data;
    }

    getDataForPageIndex(pageIndex: number, rowLength: number) {
        const startIndex = pageIndex * rowLength;
        return this.state.tableData.slice(startIndex, rowLength);
    }

    perPageLengthHandler = (ev: React.ChangeEvent<any>) => {
        const value = parseInt(ev.target.value);

        if (this.state.perPageEntries !== value) {
            this.setState({
                perPageEntries: value
            });
        }
    }

    getPagePerItemSelectBox() {
        const perPageViewLengths = _sortBy(this.props.perPageViewLengths ||  PER_PAGE_VIEW_LENGTHS);
        return (<div className={`${styles.itemsInViewSelect}`}>
            <Select labelId="label" onChange={this.perPageLengthHandler} value={this.state.perPageEntries}>
                {
                    perPageViewLengths.map((length) => {
                        return <MenuItem value={length}>{length}</MenuItem>
                    })
                }
            </Select>
        </div>);
    }

    getPaginationBox() {
        return (
            <div className={`${styles.paginationBox} pagination-box flex-container`}>
                <Pagination totalLength={100} itemsPerPage={10} currentIndex={5} pageIndexHandler={(page) => {alert(page)} }/>
            </div>
        );
    }

    getSearchBox() {
        return (
            <div className={`${styles.searchBox} data-table-search-box flex-child`}>
                <TextField label={'Search'}/>
            </div>
        );
    }

    getTableBody() {
        return (
            <tbody>
            {
                this.getDataForPageIndex(this.state.currentPageIndex, this.state.perPageEntries).map((rowData) => {
                    return (
                        <TableRow key={rowData[this.props.identifierKey]} cellData={rowData} columns={this.props.columns}/>
                    );
                })
            }

            </tbody>
        );
    }


    render () {
        return (
            <section>
                <header className={` flex-container text-align-initial`}>
                    {this.getSearchBox()}
                    {this.getPaginationBox()}
                    {this.getPagePerItemSelectBox()}
                </header>
                <main className={`inv-data-table`}>
                    <table style={{width: '100%'}}>
                        <TableHead columns={this.props.columns} sortHandler={() => {alert("called")}}/>
                        {this.getTableBody()}
                    </table>
                </main>
            </section>
    )}
}