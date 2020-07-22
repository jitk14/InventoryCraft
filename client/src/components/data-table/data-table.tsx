import React from "react";
import {MenuItem, Select, TextField} from "@material-ui/core";
import {ColumnCell, TableHead} from "./table-head/table-head";
import {TableRow} from './table-tr/table-tr';
import {Pagination} from "./pagination/pagination";
import _sortBy from 'lodash/sortBy';
import _isEqual from 'lodash/isEqual';
import _orderBy from 'lodash/orderBy';
import styles from './data-table.module.scss';
import {NUMBER_TYPE, PER_PAGE_VIEW_LENGTHS, SortTypes} from "../../constants/app-constants";
import FuzzySearch from 'fuzzy-search';

interface IDataTableProps {
    columns:Array<ColumnCell>;
    data: Array<any>;
    identifierKey: string;
    perPageViewLengths: Array<number>,
    sortFunctions?: Record<string, (a:any, b:any) => number>,
    metaData?: Record<any, any>;
    handlers?: Record<any, any>;
}

type SortOrder = {
    sortBy: string,
    order: SortTypes
}

interface IDataTableState {
    tableData: Array<any>;
    viewData: any;
    currentPageIndex: number;
    perPageEntries: number;
    searchKey: string;
    sortOrder?: SortOrder
}

export interface ICellProps {
    cellData: any;
    identifierKey: string;
    columnCell: ColumnCell;
    columnKey: string;
    metaData: any;
    enableEntryEdit: (entryId: string, columnData: any) => void;
};


export class DataTable extends React.Component<IDataTableProps, IDataTableState>{
    private searcher: any;

    constructor(props: IDataTableProps) {
        super(props);

        this.state = {
            tableData: [...this.props.data],
            viewData: [...this.props.data],
            perPageEntries: this.props.perPageViewLengths && this.props.perPageViewLengths[0] || 10,
            currentPageIndex:  0,
            searchKey: ''
        }
    }

    componentDidUpdate(prevProps: Readonly<IDataTableProps>, prevState: Readonly<IDataTableState>, snapshot?: any) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                tableData : this.props.data
            })
        }

        if (prevState.searchKey !== this.state.searchKey || prevState.sortOrder !== this.state.sortOrder ||
                prevState.tableData != this.state.tableData) {
            this.setState(() => {
                return {
                    viewData : this.generateViewData()
                }
            });
        }
    }


    generateViewData () {
        const data = this.extractSearch();

        return this.sortViewData(data);
    }

    sortViewData(data:any) {
        const sortKey: string  = this.state.sortOrder && this.state.sortOrder.sortBy || '';
        const order: any = ((this.state.sortOrder && this.state.sortOrder.order) === SortTypes.ASC) ? 'asc' : 'desc';
        const column: ColumnCell | undefined = this.props.columns.find((column) => {if (column.columnKey === sortKey) return true});
        const isNumberKey = column && column.asNumber;

        if (isNumberKey) {
            return data.sort((a: any, b:any) => {
                const aValue = parseInt(a[sortKey],10);
                const bValue = parseInt(b[sortKey], 10);

                if (aValue - bValue == 0) return 0;

                if (aValue > bValue) { return order === SortTypes.ASC ? 1 : -1};

                if (aValue < bValue) { return order === SortTypes.ASC ? -1 : 1};
            });
        }
        else if ( sortKey ) {
            return _orderBy(data, [sortKey], [order]);
        }

        return data;
    }

    extractSearch(): Array<any> {
        this.searcher = new FuzzySearch(this.state.tableData, ['productName'], {
            caseSensitive: false,
        });

        return this.searcher.search(this.getSearchKey());
    }

    getSearchKey(): string {
        return (this.state.searchKey || '').trim();
    }

    handleSearchKeyChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = (ev.target && ev.target.value || '').trim();

        if (this.state.searchKey !== value) {
            this.setState({
                searchKey: value
            });
        }
    }

    getDataForPageIndex(pageIndex: number, rowLength: number) {
        const startIndex = pageIndex * rowLength;
        const result = this.state.viewData ||[];

        return result.slice(startIndex, startIndex+rowLength);
    }

    perPageLengthHandler = (ev: React.ChangeEvent<any>) => {
        const value = parseInt(ev.target.value);

        if (this.state.perPageEntries !== value) {
            this.setState({
                perPageEntries: value,
                currentPageIndex: 0, // reset the table on per page entry change, pagination re-calculation
            });
        }
    }

    sortChangeHandler = (columnKey: string, order: SortTypes ) => {
        const sortOrder: SortOrder = {
            sortBy: columnKey,
            order,
        };

        if (_isEqual(this.state.sortOrder, sortOrder)) {
            return;
        }

        this.setState({
            sortOrder,
            currentPageIndex: 0
        })
    }

    getPagePerItemSelectBox() {
        const perPageViewLengths = _sortBy(this.props.perPageViewLengths ||  PER_PAGE_VIEW_LENGTHS);
        return (<div className={`${styles.itemsInViewSelect}`}>
            <Select labelId="label" onChange={this.perPageLengthHandler} value={this.state.perPageEntries}>
                {
                    perPageViewLengths.map((length) => {
                        return <MenuItem value={length} key={length}>{length}</MenuItem>
                    })
                }
            </Select>
        </div>);
    }

    setCurrentPageIndex = (pageIndex: number) => {
        if (this.state.currentPageIndex !== pageIndex && typeof pageIndex === NUMBER_TYPE) {
            this.setState({
                currentPageIndex: pageIndex
            });
        }
    }

    getPaginationBox() {
        const length = this.state.viewData && this.state.viewData.length || 0;
        return (
            <div className={`${styles.paginationBox} pagination-box flex-container`}>
                <Pagination totalLength={length} itemsPerPage={this.state.perPageEntries} currentIndex={this.state.currentPageIndex} pageIndexHandler={this.setCurrentPageIndex} />
            </div>
        );
    }

    getSearchBox() {
        return (
            <div className={`${styles.searchBox} data-table-search-box flex-child`}>
                <TextField label={'Search'} onChange={this.handleSearchKeyChange}/>
            </div>
        );
    }

    getTableBody() {
        return (
            <tbody>
            {
                this.getDataForPageIndex(this.state.currentPageIndex, this.state.perPageEntries).map((rowData: any) => {
                    return (
                        <TableRow key={rowData[this.props.identifierKey]} cellData={rowData} columns={this.props.columns}
                                  metaData={this.props.metaData} handlers={this.props.handlers}/>
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
                        <TableHead columns={this.props.columns} sortHandler={this.sortChangeHandler}/>
                        {this.getTableBody()}
                    </table>
                </main>
            </section>
    )}
}